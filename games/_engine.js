/* Life Skills Arcade: the game engine.
   Reads one normalized game object (PLAN SCHEMA NORMALIZED.md, schema 1.0) and
   plays it. Three engines live here: choice, order and scene. Grid and cart
   are hand built games on the same skeleton; a step of one of those kinds is
   skipped and named on the end panel so nobody thinks it played.

   House rules this file keeps: plain ES5 in one IIFE, no framework, no build
   step, no network, no storage. The score goes out through LSA.report in
   arcade.js, which owns the local write and the backend flag.
   Written to ENGINE CONTRACT - what the game engine must do.md.

   The clock and the scoring (D66, 2026-09-21). Every card gets its own clock:
   10 seconds plus one second for every three words on the card and its
   options, never under 12 and never over 35. A right answer always scores the
   full 10. A tap inside the first third of the clock earns up to 5 more. A
   wrong tap costs the streak and never costs time. Seconds left are never
   banked as points. */
(function () {
  "use strict";

  /*  setup */

  var DEF = {
    advance_ms: 1100,   /* pause after a tap before the next item */
    tick_ms: 1000,      /* one second of clock */
    feed_ms: 2500,      /* how long a feedback line stays up */
    wide_at: 45,        /* a label this long gets a full width button */
    /* the clock rule, D66 */
    base_seconds: 10,   /* every card starts here */
    words_per_second: 3,/* and gets one more second for every three words */
    min_seconds: 12,    /* floor */
    max_seconds: 35,    /* cap */
    order_card_seconds: 5,   /* an order step adds this for every card after the first */
    order_max_seconds: 120,  /* and never runs longer than this */
    /* the speed bonus, D66 */
    speed_bonus: 5,     /* up to this many extra points */
    speed_window: 1 / 3 /* for a tap inside this share of the clock */
  };

  /* The How to play paragraph. One rule for every game in the arcade, so the
     start panel says the same true thing everywhere. Student facing. */
  /* Step kinds the engine does not play itself (grid, cart, and any hand
     built round) register here: LSAEngine.register(kind, function (ctx, step, done)).
     The plugin draws into ctx.box, uses ctx.award, ctx.miss, ctx.say and
     ctx.startClock, and calls done(ok) when the step is over. The chrome,
     the clock rule, the score and the report stay with the engine. */
  var PLUGINS = {};

  var HOW_TO_PLAY = "Every card gets its own clock: 10 seconds, plus one more second for "
    + "every three words on the card and its choices. No card is shorter than 12 seconds "
    + "or longer than 35. A right answer is always worth 10 points, however long you take. "
    + "Answer in the first third of the clock and you earn up to 5 more. A wrong tap ends "
    + "your streak and costs no time. When the clock runs out, the card shows the right "
    + "answer and moves on.";

  /* small helpers */

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function isArr(v) { return Object.prototype.toString.call(v) === "[object Array]"; }
  function list(v) { return v == null ? [] : (isArr(v) ? v : [v]); }
  function norm(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim().toLowerCase(); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text != null) { e.textContent = text; }
    return e;
  }
  function pick(root, name) { return root.querySelector('[data-lsa="' + name + '"]'); }
  function hudBox(root, name) { return root.querySelector('[data-hud="' + name + '"]'); }
  function words(text) {
    if (text == null) { return 0; }
    var parts = String(text).split(/\s+/), n = 0;
    for (var i = 0; i < parts.length; i++) { if (/[A-Za-z0-9]/.test(parts[i])) { n += 1; } }
    return n;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /*  the score hook lives in arcade.js. The engine only calls LSA.report. */

  /*  option kit */

  function optObj(o, i) {
    if (o && typeof o === "object") {
      var lab = o.label != null ? o.label : o.id;
      return {
        id: String(o.id != null ? o.id : (lab != null ? lab : i)),
        label: String(lab != null ? lab : i),
        sub: o.sub ? String(o.sub) : "",
        picture: o.picture ? String(o.picture) : "",
        letter: o.letter ? String(o.letter) : ""
      };
    }
    var s = String(o);
    return {id: s, label: s, sub: "", picture: "", letter: ""};
  }
  function optList(arr) {
    return list(arr).map(function (o, i) { return optObj(o, i); });
  }
  function hits(opt, answer) {
    var a = norm(answer);
    if (norm(opt.id) === a || norm(opt.label) === a) { return true; }
    /* Some answer keys are written as the option's letter: six-letters answers
       R and I, myth-or-fact answers H, B and E. Only a one or two character
       answer is read this way, so a real label is never matched by accident. */
    if (opt.letter && a.length <= 2 && norm(opt.letter) === a) { return true; }
    return false;
  }
  /* which entry of item.answer this option matches, or -1 */
  function answerIndex(item, opt) {
    var ans = list(item.answer);
    for (var i = 0; i < ans.length; i++) { if (hits(opt, ans[i])) { return i; } }
    return -1;
  }
  function hasAnswer(opts, item) {
    for (var i = 0; i < opts.length; i++) { if (answerIndex(item, opts[i]) >= 0) { return true; } }
    return false;
  }

  /* every distinct main answer in this step, for a pool draw */
  function poolDraw(step, item, count) {
    var mine = {}, i;
    list(item.answer).forEach(function (a) { mine[norm(a)] = 1; });
    var same = [], other = [], seen = {};
    list(step.items).forEach(function (it) {
      var a = list(it.answer)[0];
      if (a == null) { return; }
      var k = norm(a);
      if (mine[k] || seen[k]) { return; }
      seen[k] = 1;
      if (item.item_kind && it.item_kind && it.item_kind === item.item_kind) { same.push(String(a)); }
      else { other.push(String(a)); }
    });
    shuffle(same); shuffle(other);
    var want = Math.max(0, (count || 4) - 1);
    var picks = same.slice(0, want);
    for (i = 0; picks.length < want && i < other.length; i++) { picks.push(other[i]); }
    picks.push(String(list(item.answer)[0]));
    return optList(shuffle(picks));
  }

  /* A bank can be longer than the step asks for. risk-ladder's word bank holds
     six answers and the step shows four, so cut it down to the right answer
     plus enough wrong ones, shuffled. A fixed bin set is never cut: bins stay. */
  function trim(opts, item, count) {
    if (!count || opts.length <= count) { return opts; }
    var keep = [], rest = [];
    opts.forEach(function (o) {
      if (answerIndex(item, o) >= 0) { keep.push(o); } else { rest.push(o); }
    });
    shuffle(rest);
    while (keep.length < count && rest.length) { keep.push(rest.shift()); }
    return shuffle(keep.slice(0, count));
  }

  /* a shared word bank or a named option set */
  function bankNamed(step, round, name) {
    var opts = step.options || {};
    if (!name || norm(name) === "word_bank") { return optList(opts.word_bank); }
    var sets = list(round.option_sets).concat(list(round.extra_option_sets));
    for (var i = 0; i < sets.length; i++) {
      if (norm(sets[i].label) === norm(name)) { return optList(sets[i].list); }
    }
    return optList(opts.word_bank);
  }

  /* The heart of the choice engine: where this item's options come from.
     Item level first, step level second. The contract is firm about that
     order, because four games change their option set partway through a step. */
  function optionsFor(step, round, item) {
    var spec = (item && item.options) || step.options || {};
    var source = spec.source || "fixed";
    var count = spec.count || 4;
    var out = null;

    if (item && item.option_set) { out = trim(bankNamed(step, round, item.option_set), item, count); }
    if (!out && item && item.choices && item.choices.length) { out = optList(item.choices); }
    if (!out && item && item.choices_from) { out = trim(bankNamed(step, round, item.choices_from), item, count); }

    if (!out) {
      if (source === "fixed") { out = optList(spec.list); }
      else if (source === "per_item") { out = optList(spec.list); }
      else if (source === "pool") { out = poolDraw(step, item, count); }
      else if (source === "mixed") {
        out = spec.fallback === "pool" ? poolDraw(step, item, count) : optList(spec.list);
      } else { out = optList(spec.list); }
    }

    /* The item level override the data does not carry yet. eight-jobs round 2
       switches to four readiness buttons after the seventh card, but the
       normalized file puts that second set in extra_option_sets and marks no
       item. So when the drawn set cannot contain this item's answer, look for
       a set in the round that can. An explicit item.options or item.option_set
       still wins, because it is read first. */
    if (out.length && item && list(item.answer).length && !hasAnswer(out, item)) {
      var sets = list(round.extra_option_sets).concat(list(round.option_sets));
      for (var i = 0; i < sets.length; i++) {
        var cand = optList(sets[i].list);
        if (hasAnswer(cand, item)) { out = cand; break; }
      }
    }
    return out;
  }

  /*  the run */

  function start(cfg) {
    cfg = cfg || {};
    var data = cfg.data;
    if (!data) { throw new Error("LSAEngine.start needs a normalized game object"); }
    var root = cfg.root || document.querySelector(".game") || document.body;
    var o = {};
    var k;
    for (k in DEF) { if (DEF.hasOwnProperty(k)) { o[k] = cfg[k] != null ? cfg[k] : DEF[k]; } }

    /*  the pieces of the chrome  */
    var startP = pick(root, "start"), playP = pick(root, "play"), endP = pick(root, "end");
    var artBank = pick(root, "art");
    var live = pick(root, "live");
    var elRound = hudBox(root, "round"), elSecs = hudBox(root, "secs");
    var elStreak = hudBox(root, "streak"), elScore = hudBox(root, "score");
    var boxSecs = root.querySelector('[data-hud-box="secs"]');
    var lab = pick(root, "tasklab"), promptEl = pick(root, "prompt");
    var feed = pick(root, "feed"), optsEl = pick(root, "options");
    var slotsEl = pick(root, "slots"), cardsEl = pick(root, "cards");
    var sceneEl = pick(root, "scene");

    /*  the static text the data carries, filled only when the slot is empty  */
    /* The start panel shows the arcade wide rule, not the plan's old prose. */
    var noteEl = pick(root, "scoringnote");
    if (noteEl) { noteEl.textContent = HOW_TO_PLAY; }
    fillList(pick(root, "rules"), data.rule_lines, pick(root, "ruleswrap"));
    fillList(pick(root, "study"), data.study, pick(root, "studywrap"));

    function fillOnce(node, text) {
      if (node && text && !node.textContent.replace(/\s/g, "")) { node.textContent = text; }
    }
    function fillList(node, items, wrap) {
      if (!node) { return; }
      var rows = list(items);
      if (node.children.length === 0) {
        rows.forEach(function (t) { node.appendChild(el("li", null, String(t))); });
      }
      if (wrap) { wrap.hidden = node.children.length === 0; }
    }

    /*  the art bank  */
    /* One image per key. build_site.py writes the img in only when the file
       exists, so a missing picture leaves an empty span and the card is text. */
    function artFor(key) {
      if (!artBank || !key) { return null; }
      var base = String(key).replace(/\.(png|webp|jpg|jpeg|svg)$/i, "");
      var span = artBank.querySelector('[data-key="' + base.replace(/"/g, "") + '"]');
      var im = span ? span.querySelector("img") : null;
      return im ? im.cloneNode(true) : null;
    }
    function artForItem(it) {
      return artFor(it.picture) || artFor(data.slug + "-" + it.id);
    }

    /*  the queue: every step of every round, in order  */
    var scoring = data.scoring || {};
    var perCorrect = scoring.per_correct != null ? scoring.per_correct : 10;
    var streakBonus = scoring.streak_bonus;
    var streakEvery = scoring.streak_every;
    /* scoring.bank_seconds is read by nothing since D66: seconds left never turn into points */
    var exclude = {};
    list(cfg.exclude_tags).forEach(function (t) { exclude[t] = 1; });
    /* a game with grade 8 only cards offers the choice on the start panel:
       the box is ticked, so the full set plays unless the student unticks it */
    var hasG8 = false;
    list(data.rounds).forEach(function (r) { list(r.steps).forEach(function (s) {
      list(s.items).forEach(function (it) { if (it.tags && it.tags.grade_8_only) { hasG8 = true; } });
    }); });
    var g8Box = null;
    if (hasG8 && startP) {
      var wrap = el("p", "lsa-g8");
      var labl = el("label");
      g8Box = el("input"); g8Box.type = "checkbox"; g8Box.checked = true;
      labl.appendChild(g8Box);
      labl.appendChild(document.createTextNode(" " + (data.g8_label || "Include the grade 7 and 8 cards")));
      wrap.appendChild(labl);
      var goBtnP = startP.querySelector('[data-lsa="go"]');
      startP.insertBefore(wrap, goBtnP ? goBtnP.parentNode : null);
    }

    function keepItem(it) {
      var tags = it.tags || {};
      for (var t in exclude) { if (exclude.hasOwnProperty(t) && tags[t]) { return false; } }
      if (typeof cfg.filter === "function") { return cfg.filter(it) !== false; }
      return true;
    }

    var rounds = list(data.rounds);
    var plan = [], skipped = [];
    rounds.forEach(function (r, ri) {
      var steps = list(r.steps);
      steps.forEach(function (s, si) {
        if (s.kind === "choice" || s.kind === "order" || s.kind === "scene" || PLUGINS[s.kind]) {
          plan.push({round: r, step: s, ri: ri, last: si === steps.length - 1});
        } else {
          skipped.push(s.kind);
        }
      });
    });

    /* max points, right taps only, no streak or speed bonus in the number */
    var maxPoints = 0;
    function countMax() {
      maxPoints = 0;
      plan.forEach(function (p) {
        var n = p.step.kind === "order" ? list(p.step.cards).length
              : p.step.kind === "scene" ? list(p.step.targets).length
              : PLUGINS[p.step.kind] ? (p.step.max_taps != null ? p.step.max_taps
                  : list(p.step.items || p.step.pieces).length)
              : list(p.step.items).filter(keepItem).length;
        if (p.step.take && p.step.take > 0 && p.step.take < n) { n = p.step.take; }
        maxPoints += n * perCorrect;
      });
    }
    countMax();

    /*  state  */
    var score, streak, secs, tick, pi, deck, qi, missed, locked, feedTimer;
    var rightBy, totalBy, curOpts, optNodes, nextRank, advTimer;
    var clockLen = null, clockT0 = 0;  /* the running card's clock and when it started */
    var twoTap = null;                 /* fact-or-hype: {phase, firstOk, first, second} */

    function styleFor(step, it) {
      var own = it && it.options && it.options.style;
      return own || (step.options || {}).style || "buttons";
    }
    /* the second option set of a two tap card (fact-or-hype, CONTENT FIXES 3) */
    function secondTap(step) { return (step.options || {}).second_tap || null; }
    function partAnswer(it, key) {
      var parts = it.answer_parts || {};
      return parts[key] != null ? String(parts[key]) : "";
    }

    /*  the clock rule (D66)  */
    /* the seconds for one choice item: the words on the card and its options */
    function clockForItem(it, opts) {
      var n = words(it.prompt);
      list(it.prompt_extra).forEach(function (x) { n += words(x); });
      list(opts).forEach(function (op) { n += words(op.label) + words(op.sub); });
      return clamp(Math.round(o.base_seconds + n / o.words_per_second), o.min_seconds, o.max_seconds);
    }
    /* the seconds for one order step: the same rule on the prompt and every
       card, plus a few seconds for every card after the first, because the
       student has to find each next card among the ones left */
    function clockForOrder(step, cards) {
      var n = words(step.prompt);
      list(cards).forEach(function (c) { n += words(c.prompt); });
      var base = clamp(Math.round(o.base_seconds + n / o.words_per_second), o.min_seconds, o.max_seconds);
      return Math.min(o.order_max_seconds, base + o.order_card_seconds * Math.max(0, list(cards).length - 1));
    }
    /* up to speed_bonus points for a tap inside the first third of the clock */
    function speedBonus() {
      if (clockLen == null || !clockLen) { return 0; }
      var frac = (Date.now() - clockT0) / (clockLen * o.tick_ms);
      if (frac >= o.speed_window) { return 0; }
      return clamp(Math.round(o.speed_bonus * (1 - frac / o.speed_window)), 0, o.speed_bonus);
    }

    /*  clock and HUD  */
    function hud() {
      var p = plan[pi] || plan[plan.length - 1] || {};
      var rn = p.round ? p.round.n : 1;
      if (elRound) { elRound.textContent = rn + " of " + rounds.length; }
      if (elSecs) { elSecs.textContent = tick ? secs : (secs == null ? "" : secs); }
      if (elStreak) { elStreak.textContent = streak; }
      if (elScore) { elScore.textContent = score; }
      if (boxSecs) { boxSecs.className = "stat timer" + (tick && secs <= 2 ? " low" : ""); }
    }
    function stopClock() { if (tick) { clearInterval(tick); } tick = null; }
    function startClock(n, onOut) {
      stopClock();
      clockLen = n; clockT0 = Date.now();
      if (n == null) { secs = null; if (elSecs) { elSecs.textContent = "off"; } hud(); return; }
      secs = n; hud();
      tick = setInterval(function () {
        secs -= 1;
        if (secs <= 0) { secs = 0; hud(); stopClock(); onOut(); return; }
        hud();
      }, o.tick_ms);
    }
    function say(text, cls) {
      if (!feed) { return; }
      feed.textContent = text;
      feed.className = "feedback" + (cls ? " " + cls : "");
      clearTimeout(feedTimer);
      feedTimer = setTimeout(function () {
        feed.textContent = ""; feed.className = "feedback";
      }, o.feed_ms);
    }
    function announce(text) { if (live) { live.textContent = text; } }
    function award(points) {
      var fast = speedBonus();
      score += (points == null ? perCorrect : points) + fast;
      streak += 1;
      var tail = fast ? " Fast: bonus " + fast + "." : "";
      if (streakBonus && streakEvery && streak % streakEvery === 0) {
        score += streakBonus;
        tail += " " + streakEvery + " in a row: bonus " + streakBonus + ".";
      }
      return tail;
    }

    /*  drawing a card  */
    function drawPrompt(it, tail) {
      if (!promptEl) { return; }
      promptEl.textContent = "";
      var a = artForItem(it);
      if (a) {
        a.className = "piece";
        if (!a.getAttribute("alt") && it.picture_alt) { a.setAttribute("alt", it.picture_alt); }
        promptEl.appendChild(a);
      }
      if (it.swatch) {
        var sw = el("span", "lsa-swatch");
        sw.style.background = it.swatch;
        promptEl.appendChild(sw);
      }
      promptEl.appendChild(document.createTextNode(String(it.prompt || "") + (tail || "")));
      list(it.prompt_extra).forEach(function (line) {
        promptEl.appendChild(el("span", "lsa-sub", String(line)));
      });
      if (!a && it.picture_alt) {
        promptEl.appendChild(el("span", "lsa-sub", String(it.picture_alt)));
      }
    }

    function optButton(opt, onTap) {
      var b = el("button", "gbtn");
      b.type = "button";
      var pic = artFor(opt.picture) || artFor(data.slug + "-" + opt.id);
      if (pic) { pic.className = "piece"; b.appendChild(pic); }
      b.setAttribute("data-opt", opt.id);
      b.appendChild(document.createTextNode((opt.letter ? opt.letter + ". " : "") + opt.label));
      if (opt.sub) { b.appendChild(el("span", "lsa-sub", opt.sub)); }
      if (opt.label.length > o.wide_at) { b.className = "gbtn wide"; }
      b.addEventListener("click", function () { onTap(opt, b); });
      return b;
    }
    function drawOptions(opts, onTap) {
      if (!optsEl) { return; }
      optsEl.textContent = "";
      optNodes = [];
      opts.forEach(function (opt) {
        var b = optButton(opt, onTap);
        optNodes.push(b);
        optsEl.appendChild(b);
      });
    }
    function clearMarks() {
      list(optNodes).forEach(function (b) { b.classList.remove("right", "wrong"); });
    }

    /*  the choice engine */

    function startChoice(p) {
      var step = p.step, round = p.round;
      deck = shuffle(list(step.items).filter(keepItem).slice());
      /* take: play this many of the shuffled items and leave the rest out.
         green-flag-red-flag deals 12 cards from a bank of 22. This is the one
         field the engine reads that schema 1.0 does not define yet. */
      if (step.take && step.take > 0 && step.take < deck.length) { deck = deck.slice(0, step.take); }
      qi = 0;
      curOpts = null;
      if (optsEl) { optsEl.hidden = false; optsEl.className = "lsa-options " + ((step.options || {}).style || "buttons"); }
      if (slotsEl) { slotsEl.hidden = true; }
      if (cardsEl) { cardsEl.hidden = true; }
      if (sceneEl) { sceneEl.hidden = true; }
      if (customEl) { customEl.hidden = true; }
      if (!deck.length) { nextStep(false); return; }
      /* an item that carries its own option set or count comes first in the
         deal, so a step that switches sets partway plays its first set
         first: the seven supports, then the four readiness lines */
      deck.sort(function (a, b) {
        var ka = (a.option_set || "") + "|" + ((a.options || {}).count || "");
        var kb = (b.option_set || "") + "|" + ((b.options || {}).count || "");
        return ka < kb ? -1 : (ka > kb ? 1 : 0);
      });
      /* bins are drawn once and stay on screen for the whole step */
      if (styleFor(step, deck[0]) === "bins") {
        curOpts = optionsFor(step, round, deck[0]);
        drawOptions(curOpts, tapChoice);
      }
      showItem();
    }

    function stepLabel(p, n, of) {
      var step = p.step;
      var base = step.title || ("Round " + p.round.n);
      return base + (of ? ", " + n + " of " + of : "");
    }

    function showItem() {
      var p = plan[pi], step = p.step, round = p.round, it = deck[qi];
      locked = false;
      twoTap = null;
      if (lab) { lab.textContent = stepLabel(p, qi + 1, deck.length); }
      var style = styleFor(step, it);
      if (optsEl) { optsEl.className = "lsa-options " + style; }
      var second = secondTap(step);
      if (second && it.answer_parts) {
        /* two taps on one card: the first set is the step's fixed list and
           the first part of the answer is matched against it */
        var firstKey = (step.options || {}).answer_key || "venture";
        var probe = {answer: [partAnswer(it, firstKey)]};
        if (style !== "bins" || !curOpts || !hasAnswer(curOpts, probe)) {
          curOpts = optionsFor(step, round, probe);
          drawOptions(curOpts, tapChoice);
        }
        twoTap = {phase: 1, firstOk: false, firstKey: firstKey,
                  secondKey: second.answer_key || "direction",
                  secondOpts: optList(bankNamed(step, round, second.list))};
      } else if (style !== "bins") {
        curOpts = optionsFor(step, round, it);
        drawOptions(curOpts, tapChoice);
      } else if (!curOpts || !hasAnswer(curOpts, it)) {
        /* the option set changed partway through the step */
        curOpts = optionsFor(step, round, it);
        drawOptions(curOpts, tapChoice);
      }
      clearMarks();
      drawPrompt(it, "");
      announce(String(it.prompt || "") + ". " + curOpts.length + " choices.");
      /* null in the data means untimed; any number means the D66 rule. A two
         tap card counts both option sets in its clock. */
      var clockOpts = twoTap ? curOpts.concat(twoTap.secondOpts) : curOpts;
      startClock(round.seconds_per_item == null ? null : clockForItem(it, clockOpts),
                 function () { tapChoice(null, null); });
      hud();
    }

    /* the first tap of a two tap card: score the part, then show the second set */
    function tapFirstPart(opt, btn) {
      var it = deck[qi], step = plan[pi].step;
      var want = partAnswer(it, twoTap.firstKey);
      var ok = !!opt && hits(opt, want);
      list(optNodes).forEach(function (b, i) { if (hits(curOpts[i], want)) { b.classList.add("right"); } });
      if (!ok && btn) { btn.classList.add("wrong"); }
      twoTap.firstOk = ok;
      twoTap.phase = 2;
      var half = Math.floor(perCorrect / 2);
      if (ok) { score += half; }
      say((ok ? "Yes, " + want + ". " : "No. " + want + ". ") + String(secondTap(step).prompt || "Now the second part."), ok ? "good" : "bad");
      announce((ok ? "Right: " : "Wrong: ") + want + ". " + String(secondTap(step).prompt || "Now the second part."));
      hud();
      if (opt == null) { return; } /* a timeout falls through to the miss below */
      locked = true;
      setTimeout(function () {
        if (optsEl) { optsEl.className = "lsa-options " + (secondTap(step).style || "buttons"); }
        curOpts = twoTap.secondOpts;
        drawOptions(curOpts, tapChoice);
        locked = false;
      }, 650);
    }

    function tapChoice(opt, btn) {
      if (locked) { return; }
      var p = plan[pi], step = p.step, it = deck[qi];
      if (twoTap && twoTap.phase === 1 && opt) { tapFirstPart(opt, btn); return; }
      locked = true;
      stopClock();
      var ans = list(it.answer);
      var main = ans.length ? String(ans[0]) : "";
      var idx, ok, mainOpt = null, mainName;
      if (twoTap) {
        /* the second tap: the card is right only when both parts were */
        var want2 = partAnswer(it, twoTap.secondKey);
        var secondOk = !!opt && hits(opt, want2);
        if (twoTap.phase === 1) { tapFirstPart(null, null); }   /* timed out before the first tap */
        list(optNodes).forEach(function (b, i) { if (hits(curOpts[i], want2)) { b.classList.add("right"); } });
        ok = twoTap.firstOk && secondOk;
        idx = ok ? 0 : -1;
        if (secondOk && !twoTap.firstOk) { score += Math.floor(perCorrect / 2); }
        mainName = main;
        twoTap.secondOk = secondOk;
      } else {
        idx = opt ? answerIndex(it, opt) : -1;
        ok = idx >= 0;
        list(optNodes).forEach(function (b, i) {
          if (answerIndex(it, curOpts[i]) === 0) { b.classList.add("right"); mainOpt = curOpts[i]; }
        });
        mainName = mainOpt ? mainOpt.label + (mainOpt.sub ? " (" + mainOpt.sub + ")" : "") : main;
      }

      totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
      var line;
      if (ok) {
        rightBy[p.ri] = (rightBy[p.ri] || 0) + 1;
        var bonus = twoTap ? award(perCorrect - 2 * Math.floor(perCorrect / 2)) : award();
        line = "Yes. " + (it.feedback ? it.feedback : mainName + ".");
        if (idx > 0) { line = "Yes, that counts. The main answer is " + mainName + ". " + (it.feedback || ""); }
        line += bonus;
      } else if (twoTap && (twoTap.firstOk || twoTap.secondOk)) {
        /* half right: the half scored, the streak ends, the card is a miss */
        streak = 0;
        if (btn) { btn.classList.add("wrong"); }
        line = "Half right. " + mainName + ". " + (it.feedback || "");
        missed.push(String(it.prompt || "") + ": " + mainName);
      } else {
        streak = 0;
        if (btn) { btn.classList.add("wrong"); }
        line = (opt ? "No. " : "Time. ") + mainName + ". " + (it.feedback || "");
        missed.push(String(it.prompt || "") + ": " + mainName);
      }
      list(it.feedback_extra).forEach(function (x) { line += " " + String(x); });
      say(line, ok ? "good" : "bad");
      announce(line);
      hud();

      advTimer = setTimeout(function () {
        clearMarks();
        qi += 1;
        if (qi < deck.length) { showItem(); return; }
        nextStep(ok);
      }, o.advance_ms);
    }

    /*  the order engine */

    function startOrder(p) {
      var step = p.step, round = p.round;
      var cards = list(step.cards).slice().sort(function (a, b) { return (a.rank || 0) - (b.rank || 0); });
      deck = cards;
      nextRank = 0;
      locked = false;
      if (optsEl) { optsEl.hidden = true; }
      if (sceneEl) { sceneEl.hidden = true; }
      if (customEl) { customEl.hidden = true; }
      if (slotsEl) { slotsEl.hidden = false; slotsEl.textContent = ""; }
      if (cardsEl) { cardsEl.hidden = false; cardsEl.textContent = ""; }
      if (lab) { lab.textContent = step.title || ("Round " + round.n); }
      drawPrompt({prompt: step.prompt || "Tap the cards into order."}, "");
      if (!deck.length) { nextStep(false); return; }
      deck.forEach(function () { if (slotsEl) { slotsEl.appendChild(el("li", null, " ")); } });
      shuffle(deck.map(function (_, i) { return i; })).forEach(function (i) {
        var c = deck[i];
        var b = el("button", "sr-card");
        b.type = "button";
        var pic = artForItem(c);
        if (pic) { pic.className = "piece"; b.className = "sr-card has-art"; b.appendChild(pic); }
        b.appendChild(document.createTextNode(String(c.prompt || "")));
        b.setAttribute("data-rank", String(c.rank));
        b.addEventListener("click", function () { tapOrder(i, b); });
        if (cardsEl) { cardsEl.appendChild(b); }
      });
      announce(String(step.prompt || "Tap the cards into order.") + " " + deck.length + " cards.");
      startClock(round.seconds_per_item == null ? null : clockForOrder(step, deck),
                 function () { endOrder(false); });
      hud();
    }

    function fillSlot(i, cls) {
      if (!slotsEl || !slotsEl.children[i]) { return; }
      var li = slotsEl.children[i];
      li.textContent = String(deck[i].prompt || "");
      li.className = cls;
    }

    function tapOrder(i, b) {
      if (locked) { return; }
      var p = plan[pi], step = p.step, c = deck[i];
      totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
      if (i === nextRank) {
        b.hidden = true;
        fillSlot(i, "filled");
        nextRank += 1;
        rightBy[p.ri] = (rightBy[p.ri] || 0) + 1;
        var line = "Yes. " + nextRank + ": " + String(c.prompt || "") + ". " + (c.feedback || "");
        list(c.feedback_extra).forEach(function (x) { line += " " + String(x); });
        line += award();
        say(line, "good");
        announce(line);
        hud();
        if (nextRank === deck.length) { endOrder(true); }
      } else {
        /* a wrong tap does not lock a card. It costs the streak and nothing
           else: no time, no points (D66). */
        streak = 0;
        b.classList.add("wrong");
        setTimeout(function () { b.classList.remove("wrong"); }, 500);
        say("Not that one yet.", "bad");
        hud();
      }
    }

    function endOrder(done) {
      stopClock();
      locked = true;
      var p = plan[pi], step = p.step;
      if (done) {
        var line = "All " + deck.length + " in order. " + (step.feedback || "");
        say(line, "good");
        announce(line);
      } else {
        for (var i = nextRank; i < deck.length; i++) { fillSlot(i, "shown"); }
        if (cardsEl) {
          var bs = cardsEl.querySelectorAll(".sr-card");
          for (var k = 0; k < bs.length; k++) { bs[k].hidden = true; }
        }
        say("Time. Here is the order.", "");
        missed.push((step.prompt ? step.prompt + " " : "") + "In order: "
          + deck.map(function (c) { return String(c.prompt || ""); }).join(", ")
          + (step.feedback ? ". " + step.feedback : ""));
      }
      hud();
      advTimer = setTimeout(function () { nextStep(done); }, done ? o.advance_ms + 300 : o.advance_ms * 2);
    }

    /*  the scene engine */
    /* One baked picture with tap boxes measured on it, in the picture's own
       pixel space (scene.width by scene.height). find_all: tap every target
       before the clock runs out. tap_the_named: a prompt appears, tap the one
       thing it names. A decoy is safe: it costs nothing and says why it is not
       the answer. A tap on nothing says so and costs nothing. */
    var sc = null;   /* the running scene: {step, W, H, wrap, img, targets, found, qi} */

    function sceneImage(step) {
      var file = (step.scene || {}).file;
      return artFor(file);
    }
    function boxOf(t) {
      /* every box a target owns, as [x, y, w, h] in picture pixels */
      return list(t.boxes).filter(function (b) { return isArr(b) && b.length === 4; });
    }
    function placeBox(node, b) {
      node.style.left = (100 * b[0] / sc.W) + "%";
      node.style.top = (100 * b[1] / sc.H) + "%";
      node.style.width = (100 * b[2] / sc.W) + "%";
      node.style.height = (100 * b[3] / sc.H) + "%";
    }
    function hitTarget(px, py, pool) {
      /* A box is read at least 44 css pixels on each side, so a small thing
         can be tapped on a phone. Where two expanded boxes overlap, the one
         whose centre is nearest the tap wins; a tap inside a box's own drawn
         edge beats a neighbour's expanded edge. */
      var rect = sc.wrap.getBoundingClientRect();
      var minW = 44 * sc.W / Math.max(1, rect.width), minH = 44 * sc.H / Math.max(1, rect.height);
      var best = null, bestD = Infinity;
      pool.forEach(function (t) {
        boxOf(t).forEach(function (b) {
          var inside = px >= b[0] && px <= b[0] + b[2] && py >= b[1] && py <= b[1] + b[3];
          var w = Math.max(b[2], minW), h = Math.max(b[3], minH);
          var x = b[0] - (w - b[2]) / 2, y = b[1] - (h - b[3]) / 2;
          if (px >= x && px <= x + w && py >= y && py <= y + h) {
            var cx = b[0] + b[2] / 2, cy = b[1] + b[3] / 2;
            var d = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy)) - (inside ? 1e6 : 0);
            if (d < bestD) { best = t; bestD = d; }
          }
        });
      });
      return best;
    }
    function markBox(t, cls, label) {
      boxOf(t).forEach(function (b) {
        var m = el("span", "lsa-mark " + cls);
        placeBox(m, b);
        if (label) { m.setAttribute("title", label); }
        sc.wrap.appendChild(m);
      });
    }
    function clearMarks2(cls) {
      var ms = sc.wrap.querySelectorAll(".lsa-mark" + (cls ? "." + cls : ""));
      for (var i = 0; i < ms.length; i++) { ms[i].parentNode.removeChild(ms[i]); }
    }

    function startScene(p) {
      var step = p.step, round = p.round;
      var img = sceneImage(step);
      var targets = list(step.targets).filter(keepItem);
      if (optsEl) { optsEl.hidden = true; }
      if (slotsEl) { slotsEl.hidden = true; }
      if (cardsEl) { cardsEl.hidden = true; }
      if (customEl) { customEl.hidden = true; }
      if (!sceneEl || !img || !targets.length || !(step.scene || {}).width) {
        /* no picture on this device, or nothing measured: the step cannot be
           played by tapping. It is skipped and named on the end panel. */
        skipped.push("the picture round");
        nextStep(false);
        return;
      }
      sceneEl.hidden = false;
      sceneEl.textContent = "";
      var wrap = el("div", "lsa-scene-wrap");
      img.className = "lsa-scene-img";
      img.setAttribute("alt", (step.scene || {}).alt || "");
      img.setAttribute("draggable", "false");
      wrap.appendChild(img);
      sceneEl.appendChild(wrap);
      sc = {step: step, round: round, W: step.scene.width, H: step.scene.height, wrap: wrap,
            targets: targets, decoys: list(step.decoys), found: {}, qi: 0, mode: step.mode || "find_all",
            deck: shuffle(targets.slice())};
      /* keyboard and screen reader path: one real button per target */
      var keys = el("div", "lsa-scene-keys");
      keys.setAttribute("aria-label", "The things in the picture");
      targets.forEach(function (t) {
        var b = el("button", "sr-only-btn", String(t.prompt || t.id));
        b.type = "button";
        b.addEventListener("click", function () { sceneTap(t, null); });
        keys.appendChild(b);
      });
      sceneEl.appendChild(keys);
      wrap.addEventListener("click", function (ev) {
        if (locked) { return; }
        var rect = wrap.getBoundingClientRect();
        var px = (ev.clientX - rect.left) / rect.width * sc.W;
        var py = (ev.clientY - rect.top) / rect.height * sc.H;
        var t = hitTarget(px, py, sc.targets.concat(sc.decoys));
        sceneTap(t, {x: px, y: py});
      });
      locked = false;
      if (sc.mode === "tap_the_named") {
        showSceneItem();
      } else {
        if (lab) { lab.textContent = step.title || ("Round " + round.n + ", find every one"); }
        drawPrompt({prompt: step.prompt || ("Find all " + targets.length + ". Tap each one.")}, "");
        announce("Find all " + targets.length + " in the picture.");
        /* one clock for the whole search: ten seconds and eight for every target */
        var n = 10 + 8 * targets.length;
        startClock(round.seconds_per_item == null ? null : Math.min(o.order_max_seconds, n),
                   function () { endSceneFindAll(false); });
        hud();
      }
    }

    function showSceneItem() {
      var t = sc.deck[sc.qi];
      clearMarks2();
      locked = false;
      if (lab) { lab.textContent = stepLabel(plan[pi], sc.qi + 1, sc.deck.length); }
      drawPrompt({prompt: t.prompt || t.id}, "");
      announce(String(t.prompt || t.id) + ". Tap it in the picture.");
      startClock(sc.round.seconds_per_item == null ? null : clockForItem(t, []),
                 function () { sceneTap(null, null); });
      hud();
    }

    function sceneTap(t, at) {
      if (locked) { return; }
      var p = plan[pi];
      if (sc.mode === "tap_the_named") {
        var want = sc.deck[sc.qi];
        locked = true;
        stopClock();
        totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
        var line;
        if (t === want) {
          rightBy[p.ri] = (rightBy[p.ri] || 0) + 1;
          markBox(want, "right");
          line = "Yes. " + (want.feedback || String(want.prompt || want.id) + ".") + award();
          say(line, "good");
        } else {
          streak = 0;
          markBox(want, "right");
          if (t && t !== want) { markBox(t, "wrong"); }
          var isDecoy = t && sc.decoys.indexOf(t) >= 0;
          line = (at == null && !t ? "Time. " : (isDecoy ? "Not that one. " : (t ? "No. " : "Nothing there. ")))
               + (want.feedback || String(want.prompt || want.id) + ".");
          if (isDecoy && (t.feedback || t.prompt)) { line += " " + (t.feedback || t.prompt); }
          missed.push(String(want.prompt || want.id) + ": " + (want.feedback || want.id));
          say(line, "bad");
        }
        announce(line);
        hud();
        advTimer = setTimeout(function () {
          sc.qi += 1;
          if (sc.qi < sc.deck.length) { showSceneItem(); return; }
          nextStep(t === want);
        }, o.advance_ms);
        return;
      }
      /* find_all */
      if (!t) { say("Nothing there. Keep looking.", ""); return; }
      if (sc.decoys.indexOf(t) >= 0) {
        var why = t.feedback || t.prompt || "That one is fine.";
        say(why, "");
        announce(why);
        return;
      }
      if (sc.found[t.id]) { say("Already found.", ""); return; }
      sc.found[t.id] = 1;
      totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
      rightBy[p.ri] = (rightBy[p.ri] || 0) + 1;
      markBox(t, "right");
      var n = 0;
      for (var k in sc.found) { if (sc.found.hasOwnProperty(k)) { n += 1; } }
      var msg = "Found " + n + " of " + sc.targets.length + ". " + (t.feedback || String(t.prompt || t.id)) + award();
      say(msg, "good");
      announce(msg);
      hud();
      if (n === sc.targets.length) { endSceneFindAll(true); }
    }

    function endSceneFindAll(done) {
      stopClock();
      locked = true;
      var p = plan[pi];
      var left = sc.targets.filter(function (t) { return !sc.found[t.id]; });
      left.forEach(function (t) {
        markBox(t, "shown");
        totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
        missed.push(String(t.prompt || t.id) + ": " + (t.feedback || ""));
      });
      var line = done ? "All " + sc.targets.length + " found." : "Time. The ones you missed are circled.";
      say(line, done ? "good" : "");
      announce(line);
      hud();
      advTimer = setTimeout(function () { nextStep(done); }, done ? o.advance_ms + 300 : o.advance_ms * 3);
    }

    /*  a plugin step */
    var customEl = pick(root, "custom");
    function startPlugin(p) {
      var step = p.step, round = p.round;
      if (optsEl) { optsEl.hidden = true; }
      if (slotsEl) { slotsEl.hidden = true; }
      if (cardsEl) { cardsEl.hidden = true; }
      if (sceneEl) { sceneEl.hidden = true; }
      if (!customEl) { skipped.push(step.kind); nextStep(false); return; }
      customEl.hidden = false;
      customEl.textContent = "";
      customEl.className = "lsa-custom lsa-custom-" + step.kind;
      locked = false;
      if (lab) { lab.textContent = step.title || ("Round " + round.n); }
      drawPrompt({prompt: step.prompt || ""}, "");
      var finished = false;
      var ctx = {
        box: customEl, root: root, data: data, round: round, step: step, o: o,
        el: el, list: list, shuffle: shuffle, norm: norm, words: words, clamp: clamp,
        artFor: artFor, say: say, announce: announce, hud: hud,
        prompt: function (text) { drawPrompt({prompt: text}, ""); },
        label: function (text) { if (lab) { lab.textContent = text; } },
        /* a right tap: full points plus the speed bonus and the streak */
        award: function (points) {
          var tail = award(points);
          var ri = p.ri;
          rightBy[ri] = (rightBy[ri] || 0) + 1;
          totalBy[ri] = (totalBy[ri] || 0) + 1;
          hud();
          return tail;
        },
        /* a wrong tap: the streak ends, nothing else is lost; text goes to the study list */
        miss: function (text) {
          streak = 0;
          totalBy[p.ri] = (totalBy[p.ri] || 0) + 1;
          if (text) { missed.push(String(text)); }
          hud();
        },
        /* points with no bonus and no count, for a partial result like a cart total */
        add: function (points) { score += points || 0; hud(); },
        startClock: function (n, onOut) { startClock(n, onOut); },
        stopClock: stopClock,
        secs: function () { return secs; },
        clockFor: function (wordsOnScreen) {
          return clamp(Math.round(o.base_seconds + (wordsOnScreen || 0) / o.words_per_second),
                       o.min_seconds, o.max_seconds);
        },
        keepItem: keepItem,
        isLocked: function () { return locked; },
        lock: function (v) { locked = v !== false; },
        done: function (ok) {
          if (finished) { return; }
          finished = true;
          stopClock();
          advTimer = setTimeout(function () {
            customEl.hidden = true;
            nextStep(!!ok);
          }, o.advance_ms);
        }
      };
      try {
        PLUGINS[step.kind](ctx, step, ctx.done);
      } catch (e) {
        /* a broken plugin must not strand the game */
        say("This round could not load.", "bad");
        skipped.push(step.kind);
        ctx.done(false);
      }
    }

    /*  moving through */

    function nextStep(lastWasRight) {
      clearTimeout(advTimer);
      pi += 1;
      if (pi >= plan.length) { finish(); return; }
      runStep();
    }

    function runStep() {
      var p = plan[pi];
      if (playP) { playP.hidden = false; }
      if (p.step.kind === "order") { startOrder(p); }
      else if (p.step.kind === "scene") { startScene(p); }
      else if (PLUGINS[p.step.kind]) { startPlugin(p); }
      else { startChoice(p); }
      if (playP && playP.scrollIntoView) { playP.scrollIntoView({behavior: "smooth", block: "start"}); }
    }

    /*  the end */

    var reported = false;
    function finish() {
      stopClock();
      clearTimeout(advTimer);
      if (playP) { playP.hidden = true; }
      if (endP) { endP.hidden = false; }
      hud();   /* the banked seconds land on the HUD too, not only in the total */
      var finalEl = pick(root, "final");
      if (finalEl) { finalEl.textContent = score + " points"; }

      var bits = [];
      rounds.forEach(function (r, ri) {
        if (totalBy[ri]) { bits.push("Round " + r.n + ": " + (rightBy[ri] || 0) + " of " + totalBy[ri] + "."); }
      });
      if (skipped.length) { bits.push("Not played here: " + skipped.join(", ") + "."); }
      var sum = pick(root, "summary");
      if (sum) { sum.textContent = bits.join(" ") + (missed.length ? "" : " Every one right."); }

      var ul = pick(root, "missed"), wrap = pick(root, "misswrap");
      if (ul) {
        ul.textContent = "";
        missed.forEach(function (m) { ul.appendChild(el("li", null, m)); });
      }
      if (wrap) { wrap.hidden = !missed.length; }

      if (!reported && window.LSA && typeof LSA.report === "function") {
        reported = true;
        LSA.report({
          game: data.slug,
          lesson: list(data.lessons)[0] || "",
          score: score,
          max: maxPoints,
          rounds: rounds.length
        });
      }
      announce("Done. " + score + " points.");
      if (endP && endP.scrollIntoView) { endP.scrollIntoView({behavior: "smooth", block: "start"}); }
    }

    /*  start over */

    function begin() {
      stopClock();
      clearTimeout(advTimer);
      clearTimeout(feedTimer);
      if (g8Box) { if (g8Box.checked) { delete exclude.grade_8_only; } else { exclude.grade_8_only = 1; } }
      countMax();
      score = 0; streak = 0; missed = []; pi = 0; locked = false;
      rightBy = {}; totalBy = {}; reported = false;
      if (feed) { feed.textContent = ""; feed.className = "feedback"; }
      if (startP) { startP.hidden = true; }
      if (endP) { endP.hidden = true; }
      hud();
      runStep();
    }

    var goBtn = pick(root, "go"), againBtn = pick(root, "again");
    if (goBtn) { goBtn.addEventListener("click", begin); }
    if (againBtn) { againBtn.addEventListener("click", begin); }

    /* the resting state before the first tap on Start */
    score = 0; streak = 0; pi = 0; missed = []; rightBy = {}; totalBy = {};
    secs = 0;
    hud();

    /* a small handle, for a page that wants to drive the game itself */
    return {
      begin: begin,
      state: function () {
        var p = plan[pi] || {};
        return {
          score: score, streak: streak, secs: secs, step: pi, steps: plan.length,
          round: p.round ? p.round.n : null, kind: p.step ? p.step.kind : null,
          item: deck && deck[qi] ? deck[qi].id : null, missed: missed.slice(),
          part: twoTap ? twoTap.phase : 0, clock: clockLen,
          scene: (p.step && p.step.kind === "scene" && sc) ? {
            mode: sc.mode, target: sc.mode === "tap_the_named" && sc.deck[sc.qi] ? sc.deck[sc.qi].id : null,
            found: Object.keys(sc.found).length, of: sc.targets.length,
            targets: sc.targets.map(function (t) { return {id: t.id, boxes: boxOf(t)}; }),
            decoys: sc.decoys.map(function (t) { return {id: t.id, boxes: boxOf(t)}; }),
            W: sc.W, H: sc.H, has_picture: true } : null,
          options: list(curOpts).map(function (x) { return x.label; }),
          done: pi >= plan.length, max: maxPoints
        };
      }
    };
  }

  window.LSAEngine = {
    start: start, version: "1.2", howToPlay: HOW_TO_PLAY, words: words,
    register: function (kind, fn) { PLUGINS[kind] = fn; },
    plugins: PLUGINS
  };
}());

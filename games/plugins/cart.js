/* Life Skills Arcade plugin: the cart step (kind "cart").
   Built for twenty-dollar-dinner. The step carries a store name, a budget,
   a list of rules (each with a check line in prose) and a list of items with
   a price, a size and food tags. The student taps items into the cart, taps
   them again to take them out, watches the running total, and presses CHECK.
   Every rule that passes at a check is a right tap; only the best check
   counts, so a student can fix the cart and check again while the clock
   runs. Done, or the clock running out, ends the step.

   The four rule checks in the data and how they are read here:
     "total at or under 20.00"          the cart total is at or under step.budget
     "at least one item tagged protein" one item in the cart has "protein" in food_tags
     "at least one item tagged vegetable"   same, "vegetable"
     "at least one item tagged grain"       same, "grain"
   A check line the plugin cannot read counts as failed and is named on the
   feedback line, so a data mistake shows up in testing and never inflates a
   score. Done still works, so the round is never blocked.

   Plain ES5 in one IIFE. No network, no storage, no framework. */
(function () {
  "use strict";

  var CSS = ".lsa-custom-cart{margin:.4rem 0 .6rem}"
    + ".lsa-cart-store{font-family:var(--display);font-size:1.35rem;line-height:1.15;margin:0 0 .3rem;color:var(--ink)}"
    + ".lsa-cart-rules{list-style:none;margin:0 0 .6rem;padding:0}"
    + ".lsa-cart-rules li{position:relative;padding:.3rem .5rem .3rem 1.9rem;margin:.2rem 0;border:1.5px solid var(--outline);"
    + "border-radius:8px;background:#fff;font-size:.9rem;line-height:1.3}"
    + ".lsa-cart-rules li::before{content:\"\";position:absolute;left:.5rem;top:.42rem;width:1rem;height:1rem;border:2px solid var(--outline);"
    + "border-radius:50%;background:var(--surface-2)}"
    + ".lsa-cart-rules li.pass{background:var(--brand-green)}"
    + ".lsa-cart-rules li.pass::before{background:#1d7a2a}"
    + ".lsa-cart-rules li.fail{background:#FFD9D6}"
    + ".lsa-cart-rules li.fail::before{background:var(--brand-red)}"
    + ".lsa-cart-total{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.4rem .8rem;"
    + "background:#fff;border:2.5px solid var(--outline);border-radius:12px;padding:.6rem .8rem;margin:.5rem 0;box-shadow:3px 3px 0 var(--outline)}"
    + ".lsa-cart-total .lsa-cart-sum{font-family:var(--display);font-size:1.9rem;line-height:1;color:var(--ink)}"
    + ".lsa-cart-total.over .lsa-cart-sum{color:var(--brand-red)}"
    + ".lsa-cart-total .lsa-cart-of{font-size:.85rem;color:var(--ink-2)}"
    + ".lsa-cart-total.over .lsa-cart-of{color:var(--brand-red);font-weight:700}"
    + ".lsa-cart-count{font-size:.85rem;color:var(--ink-2);flex:1 1 100%}"
    + ".lsa-cart-grid{display:grid;gap:.5rem;grid-template-columns:repeat(2,minmax(0,1fr));margin:.5rem 0}"
    + "@media (min-width:700px){.lsa-cart-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}"
    + ".lsa-cart-item{display:flex;align-items:center;gap:.5rem;min-width:0;min-height:44px;text-align:left;"
    + "font:600 .92rem/1.25 var(--sans);padding:.55rem .6rem;border-radius:10px;border:2.5px solid var(--outline);"
    + "background:#fff;color:var(--ink);cursor:pointer;box-shadow:3px 3px 0 var(--outline)}"
    + ".lsa-cart-item:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--outline)}"
    + ".lsa-cart-item .piece{width:2.4rem;height:2.4rem;object-fit:contain;flex:none}"
    + ".lsa-cart-item .lsa-cart-body{min-width:0;flex:1 1 auto;overflow-wrap:anywhere}"
    + ".lsa-cart-item .lsa-cart-name{display:block}"
    + ".lsa-cart-item .lsa-cart-price{display:block;font-family:var(--display);font-size:1.1rem;line-height:1.1}"
    + ".lsa-cart-item .lsa-cart-size{display:block;font-weight:400;font-size:.78rem;color:var(--ink-2)}"
    + ".lsa-cart-item.in{background:var(--brand-yellow)}"
    + ".lsa-cart-item.in .lsa-cart-name::after{content:\" (in cart)\";font-weight:400;font-size:.78rem;color:var(--ink-2)}"
    + ".lsa-cart-item[disabled]{opacity:.6;cursor:default}"
    + ".lsa-cart-actions{display:flex;gap:.5rem;margin:.6rem 0 .2rem}"
    + ".lsa-cart-actions .gbtn{flex:1 1 0;text-align:center}";

  function injectStyle() {
    if (document.getElementById("lsa-cart-style")) { return; }
    var s = document.createElement("style");
    s.id = "lsa-cart-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function money(n) { return "$" + (Math.round(n * 100) / 100).toFixed(2); }

  var WORDS_TO_N = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6};

  /* reads one rule's check line against the cart. Returns true, false, or
     null when the line is not one this plugin knows. */
  function runCheck(rule, cart, total, budget) {
    var line = String(rule.check || "").toLowerCase();
    var m = line.match(/total\s+at\s+or\s+under\s+([0-9]+(?:\.[0-9]+)?)/);
    if (m) {
      var cap = parseFloat(m[1]);
      if (isNaN(cap)) { cap = budget; }
      return Math.round(total * 100) <= Math.round(cap * 100);
    }
    m = line.match(/at\s+least\s+(\d+|one|two|three|four|five|six)\s+items?\s+tagged\s+([a-z_ -]+)/);
    if (m) {
      var need = WORDS_TO_N[m[1]] || parseInt(m[1], 10) || 1;
      var tag = m[2].trim();
      var n = 0;
      for (var i = 0; i < cart.length; i++) {
        var tags = cart[i].food_tags || [];
        for (var k = 0; k < tags.length; k++) {
          if (String(tags[k]).toLowerCase() === tag) { n += 1; break; }
        }
      }
      return n >= need;
    }
    return null;
  }

  window.LSAEngine.register("cart", function (ctx, step, done) {
    injectStyle();
    var el = ctx.el, list = ctx.list;
    var budget = step.budget != null ? Number(step.budget) : 20;
    var rules = list(step.rules);
    var items = list(step.items).filter(ctx.keepItem);
    var inCart = {};
    var over = false;          /* the step is finished, taps do nothing */
    var checks = 0;            /* how many times CHECK was pressed */
    var best = -1;             /* the most rules passed at one check */
    var bestFails = [];        /* the rules that failed at that check */
    var awarded = 0;           /* right taps handed to the engine so far */
    var lastOk = false;

    /* the picture: item.picture first, then slug-id, then slug-id with a
       store prefix such as "cm-" taken off, because round 2 items share
       round 1's pictures under the plain name */
    function pic(it) {
      var a = it.picture ? ctx.artFor(it.picture) : null;
      if (!a) { a = ctx.artFor(ctx.data.slug + "-" + it.id); }
      if (!a) { a = ctx.artFor(ctx.data.slug + "-" + String(it.id).replace(/^[a-z]{1,3}-/, "")); }
      return a;
    }

    ctx.label("Round " + ctx.round.n + ": the cart");
    ctx.prompt(String(step.store || "The store") + ". Tap items into the cart, then press CHECK.");

    var box = ctx.box;
    var store = el("h3", "lsa-cart-store", "Budget: " + money(budget));
    box.appendChild(store);

    var ruleList = el("ul", "lsa-cart-rules");
    ruleList.setAttribute("aria-label", "The rules");
    var ruleNodes = [];
    rules.forEach(function (r) {
      var li = el("li", null, String(r.text || r.check || r.id));
      ruleNodes.push(li);
      ruleList.appendChild(li);
    });
    box.appendChild(ruleList);

    var totalBar = el("div", "lsa-cart-total");
    var sumEl = el("span", "lsa-cart-sum", money(0));
    var ofEl = el("span", "lsa-cart-of", "of " + money(budget));
    var countEl = el("span", "lsa-cart-count", "Cart: empty");
    totalBar.appendChild(sumEl);
    totalBar.appendChild(ofEl);
    totalBar.appendChild(countEl);
    box.appendChild(totalBar);

    var grid = el("div", "lsa-cart-grid");
    grid.setAttribute("aria-label", "The items for sale");
    var itemNodes = {};
    items.forEach(function (it) {
      var b = el("button", "lsa-cart-item");
      b.type = "button";
      b.setAttribute("data-id", String(it.id));
      b.setAttribute("aria-pressed", "false");
      var a = pic(it);
      if (a) { a.className = "piece"; if (!a.getAttribute("alt")) { a.setAttribute("alt", ""); } b.appendChild(a); }
      var body = el("span", "lsa-cart-body");
      body.appendChild(el("span", "lsa-cart-name", String(it.prompt || it.id)));
      body.appendChild(el("span", "lsa-cart-price", money(Number(it.price) || 0)));
      if (it.size) { body.appendChild(el("span", "lsa-cart-size", String(it.size))); }
      b.appendChild(body);
      b.addEventListener("click", function () { toggle(it, b); });
      itemNodes[it.id] = b;
      grid.appendChild(b);
    });
    box.appendChild(grid);

    var actions = el("div", "lsa-cart-actions");
    var checkBtn = el("button", "gbtn go", "CHECK");
    checkBtn.type = "button";
    checkBtn.setAttribute("data-cart", "check");
    var doneBtn = el("button", "gbtn alt", "Done");
    doneBtn.type = "button";
    doneBtn.setAttribute("data-cart", "done");
    doneBtn.disabled = true;
    actions.appendChild(checkBtn);
    actions.appendChild(doneBtn);
    box.appendChild(actions);

    function cartItems() {
      return items.filter(function (it) { return !!inCart[it.id]; });
    }
    function total() {
      var t = 0;
      cartItems().forEach(function (it) { t += Number(it.price) || 0; });
      return Math.round(t * 100) / 100;
    }
    function drawTotal() {
      var t = total(), n = cartItems().length;
      sumEl.textContent = money(t);
      totalBar.className = "lsa-cart-total" + (t > budget + 0.001 ? " over" : "");
      ofEl.textContent = (t > budget + 0.001 ? money(t - budget) + " over the " : "of ") + money(budget);
      countEl.textContent = n ? ("Cart: " + n + (n === 1 ? " item" : " items")) : "Cart: empty";
    }

    function toggle(it, b) {
      if (over) { return; }
      inCart[it.id] = !inCart[it.id];
      b.className = "lsa-cart-item" + (inCart[it.id] ? " in" : "");
      b.setAttribute("aria-pressed", inCart[it.id] ? "true" : "false");
      drawTotal();
      var t = total();
      ctx.announce((inCart[it.id] ? "Added " : "Took out ") + String(it.prompt || it.id) + ". Total " + money(t)
        + (t > budget ? ", over the budget." : "."));
    }

    /* one check: every rule against the cart and the total. Right taps go to
       the engine only when this check beats the best one so far. */
    function check(final) {
      if (over) { return; }
      var cart = cartItems(), t = total();
      if (!cart.length && !final) {
        ctx.say("Put something in the cart first.", "bad");
        ctx.announce("The cart is empty. Tap items to add them.");
        return;
      }
      checks += 1;
      var passed = 0, fails = [], unknown = [];
      rules.forEach(function (r, i) {
        var ok = runCheck(r, cart, t, budget);
        if (ok === null) { unknown.push(String(r.text || r.id)); ok = false; }
        if (ok) { passed += 1; ruleNodes[i].className = "pass"; }
        else { fails.push(String(r.text || r.check || r.id)); ruleNodes[i].className = "fail"; }
      });
      if (passed >= best) { best = passed; bestFails = fails; }
      while (awarded < best) { awarded += 1; ctx.award(); }
      lastOk = fails.length === 0;
      var line;
      if (lastOk) {
        line = "Your cart passes every rule. " + money(t) + " for the dinner.";
        if (rules.length) { line += " Press Done, or keep shopping and check again."; }
      } else {
        line = "Not yet. " + passed + " of " + rules.length + " rules pass. Fix this: " + fails.join(". ") + ".";
      }
      if (unknown.length) { line += " (Could not read the rule: " + unknown.join("; ") + ".)"; }
      ctx.say(line, lastOk ? "good" : "bad");
      ctx.announce(line);
      doneBtn.disabled = false;
    }

    function finishStep(why) {
      if (over) { return; }
      over = true;
      ctx.stopClock();
      checkBtn.disabled = true;
      doneBtn.disabled = true;
      for (var k in itemNodes) { if (itemNodes.hasOwnProperty(k)) { itemNodes[k].disabled = true; } }
      bestFails.forEach(function (text) { ctx.miss(String(step.store || "The cart") + ": " + text); });
      var ok = best === rules.length;
      if (why === "time") {
        ctx.say(ok ? "Time. Your cart passed every rule." : "Time. The rules your cart missed are in the list.", ok ? "good" : "bad");
      }
      done(ok);
    }

    checkBtn.addEventListener("click", function () { check(false); });
    doneBtn.addEventListener("click", function () {
      if (over || !checks) { return; }
      finishStep("done");
    });

    drawTotal();

    /* one clock for the whole step: the words on the rules and the item
       names, on the arcade rule, plus thirty seconds for the shopping */
    var n = 0;
    rules.forEach(function (r) { n += ctx.words(r.text); });
    items.forEach(function (it) { n += ctx.words(it.prompt); });
    ctx.startClock(ctx.round.seconds_per_item == null ? null : ctx.clockFor(n) + 30, function () {
      check(true);
      finishStep("time");
    });
    ctx.announce(String(step.store || "The store") + ". " + items.length + " items. Budget " + money(budget) + ".");
  });
}());

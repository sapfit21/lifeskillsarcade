/* Life Skills Arcade plugin: the month step (kind "month").
   Built for paycheck-puzzle, from the hand built fragment of 2026-09-15.
   Two paychecks come in, savings come out first at 20 percent, and the rest
   is the month's balance. Ten expense cards are dealt from the step's pool
   (four needs and six wants) and shown one at a time. The student sorts each
   one Need or Want. A right sort is a right tap. A need is paid for you. For
   a want the student chooses: buy it or skip it. A card that takes the
   balance under zero ends the month in the red. Finishing in the black banks
   one point for every 5 dollars left. One clock runs for the whole month.

   What the step carries: items (each with prompt, price, answer ["need"] or
   ["want"], feedback), stubs (each with net), and the settings rate,
   savings_share, needs, wants. Every card and every price is the fragment's.

   Plain ES5 in one IIFE. No network, no storage, no framework. */
(function () {
  "use strict";

  var CSS = ".lsa-custom-month{margin:.4rem 0 .6rem}"
    + ".lsa-month-intro{font-size:.95rem;line-height:1.45;margin:0 0 .5rem}"
    + ".lsa-month-card{background:#fff;border:2.5px solid var(--outline);border-radius:14px;padding:1rem 1rem 1.1rem;margin:.5rem 0;"
    + "box-shadow:5px 5px 0 var(--outline);display:flex;flex-direction:column;gap:.2rem}"
    + ".lsa-month-card.need{background:#E4F6D6}.lsa-month-card.want{background:#FFF1C2}"
    + ".lsa-month-price{font-family:var(--display);font-size:2.2rem;line-height:1;color:var(--brand-red);-webkit-text-stroke:1px var(--outline);paint-order:stroke fill}"
    + ".lsa-month-item{font-size:1.25rem;font-weight:700;line-height:1.3;overflow-wrap:anywhere}"
    + ".lsa-month-note{font-size:.9rem;color:var(--ink-2)}"
    + ".lsa-month-row{display:grid;gap:.5rem;grid-template-columns:repeat(2,minmax(0,1fr));margin:.6rem 0}"
    + ".lsa-month-row[hidden]{display:none}"
    + ".lsa-month-row .gbtn{min-height:3.2rem;text-align:center;white-space:normal;display:flex;align-items:center;justify-content:center;gap:.4rem}"
    + ".lsa-month-row .gbtn .piece{width:2.2rem;height:2.2rem;object-fit:contain;flex:none;margin:0}"
    + ".lsa-month-ledger{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.3rem .8rem;font-size:.9rem;color:var(--ink-2);margin:.5rem 0 0}"
    + ".lsa-month-ledger b{font-family:var(--display);font-size:1.3rem;color:var(--ink);font-weight:400}"
    + ".lsa-month-ledger.red b{color:var(--brand-red)}"
    + ".lsa-month-end{background:#fff;border:2.5px solid var(--outline);border-radius:14px;padding:1rem;margin:.5rem 0;box-shadow:5px 5px 0 var(--outline)}"
    + ".lsa-month-end h3{font-family:var(--display);font-weight:400;font-size:1.5rem;margin:0 0 .3rem}"
    + ".lsa-month-end p{margin:.3rem 0;line-height:1.45}"
    + ".lsa-month-end .gbtn{display:block;width:100%;text-align:center;margin-top:.6rem}";

  function injectStyle() {
    if (document.getElementById("lsa-month-style")) { return; }
    var s = document.createElement("style");
    s.id = "lsa-month-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function money(n) { return "$" + n.toFixed(2); }
  function money0(n) { return "$" + Math.round(n); }
  function isNeed(card) { return String((card.answer || [])[0] || "").toLowerCase() === "need"; }

  window.LSAEngine.register("month", function (ctx, step, done) {
    injectStyle();
    var el = ctx.el, list = ctx.list;
    var pool = list(step.items).filter(ctx.keepItem);
    var stubs = list(step.stubs);
    var share = step.savings_share != null ? Number(step.savings_share) : 0.2;
    var nNeeds = step.needs != null ? step.needs : 4;
    var nWants = step.wants != null ? step.wants : 6;

    /* the paycheck: one of the step's stubs, at random, twice */
    var stub = stubs.length ? stubs[Math.floor(Math.random() * stubs.length)] : {net: 0};
    var monthNet = Math.round(Number(stub.net) * 2 * 100) / 100;
    var savings = Math.round(monthNet * share);
    var balance = Math.round(monthNet - savings);

    /* the deck: needs and wants dealt from the pool, then shuffled together */
    var needs = ctx.shuffle(pool.filter(function (c) { return isNeed(c); })).slice(0, nNeeds);
    var wants = ctx.shuffle(pool.filter(function (c) { return !isNeed(c); })).slice(0, nWants);
    var deck = ctx.shuffle(needs.concat(wants));
    var di = 0, current = null, spent = [], sortRight = 0, locked = false, over = false, redCard = null;

    ctx.label(step.title || ("Round " + ctx.round.n + ": the month"));
    ctx.prompt("Two paychecks this month: " + money(monthNet) + " net. Savings first, "
      + Math.round(share * 100) + " percent: " + money0(savings) + " put away. "
      + money0(balance) + " left for the month. Sort each card, then decide.");

    var box = ctx.box;
    var card = el("div", "lsa-month-card");
    var priceEl = el("span", "lsa-month-price");
    var itemEl = el("span", "lsa-month-item");
    var noteEl = el("span", "lsa-month-note");
    card.appendChild(priceEl); card.appendChild(itemEl); card.appendChild(noteEl);
    box.appendChild(card);

    function optButton(opt, cls, onTap) {
      var b = el("button", "gbtn" + (cls ? " " + cls : ""));
      b.type = "button";
      b.setAttribute("data-opt", String(opt.id));
      var a = opt.picture ? ctx.artFor(opt.picture) : null;
      if (a) { a.className = "piece"; a.setAttribute("alt", ""); b.appendChild(a); }
      b.appendChild(el("span", null, String(opt.label || opt.id)));
      b.addEventListener("click", function () { onTap(String(opt.id)); });
      return b;
    }
    var sortOpts = list((step.options || {}).list);
    if (!sortOpts.length) { sortOpts = [{id: "need", label: "Need"}, {id: "want", label: "Want"}]; }
    var buyOpts = list((step.buy || {}).list);
    if (!buyOpts.length) { buyOpts = [{id: "yes", label: "Buy it"}, {id: "no", label: "Skip it"}]; }

    var sortRow = el("div", "lsa-month-row");
    sortRow.setAttribute("data-month", "sort");
    sortOpts.forEach(function (op) { sortRow.appendChild(optButton(op, "", sortCard)); });
    box.appendChild(sortRow);

    var buyRow = el("div", "lsa-month-row");
    buyRow.setAttribute("data-month", "buy");
    buyRow.hidden = true;
    buyOpts.forEach(function (op, i) { buyRow.appendChild(optButton(op, i === 0 ? "go" : "alt", function (id) { buyCard(id === "yes"); })); });
    box.appendChild(buyRow);

    var ledger = el("div", "lsa-month-ledger");
    var balEl = el("span"), boughtEl = el("span");
    ledger.appendChild(balEl); ledger.appendChild(boughtEl);
    box.appendChild(ledger);

    function drawLedger() {
      balEl.textContent = "";
      balEl.appendChild(document.createTextNode("Balance "));
      balEl.appendChild(el("b", null, money0(balance)));
      ledger.className = "lsa-month-ledger" + (balance < 0 ? " red" : "");
      boughtEl.textContent = "Bought so far: " + (spent.length ? spent.join(", ") : "nothing yet") + ".";
    }

    function showCard() {
      current = deck[di]; locked = false;
      card.className = "lsa-month-card";
      priceEl.textContent = money0(Number(current.price) || 0);
      itemEl.textContent = String(current.prompt || "");
      noteEl.textContent = "Card " + (di + 1) + " of " + deck.length + ". Need or want?";
      sortRow.hidden = false; buyRow.hidden = true;
      drawLedger();
      ctx.announce(String(current.prompt || "") + ", " + money0(Number(current.price) || 0) + ". Need or want?");
    }

    function sortCard(choice) {
      if (locked || over || !current) { return; }
      var need = isNeed(current);
      var right = (choice === "need") === need;
      var why = String(current.feedback || "");
      card.className = "lsa-month-card " + (need ? "need" : "want");
      if (right) {
        sortRight += 1;
        var tail = ctx.award();
        ctx.say("Yes. " + why + tail, "good");
        ctx.announce("Yes. " + why);
      } else {
        ctx.miss(String(current.prompt || "") + ": " + (need ? "need" : "want"));
        ctx.say("No. " + why, "bad");
        ctx.announce("No. " + why);
      }
      sortRow.hidden = true;
      if (need) {
        locked = true;
        balance -= Number(current.price) || 0;
        spent.push(String(current.prompt || ""));
        noteEl.textContent = "A need gets paid. Minus " + money0(Number(current.price) || 0) + ".";
        drawLedger();
        setTimeout(function () {
          if (over) { return; }
          if (balance < 0) { endMonth("need"); } else { nextCard(); }
        }, Math.max(ctx.o.advance_ms, 300) + 500);
      } else {
        noteEl.textContent = "A want is a choice. Balance " + money0(balance) + ". Buy it or skip it?";
        buyRow.hidden = false;
        ctx.announce("A want is a choice. Balance " + money0(balance) + ". Buy it or skip it?");
      }
    }

    function buyCard(yes) {
      if (locked || over || !current) { return; }
      locked = true;
      buyRow.hidden = true;
      if (yes) {
        balance -= Number(current.price) || 0;
        spent.push(String(current.prompt || ""));
        drawLedger();
        if (balance < 0) { redCard = current; endMonth("want"); return; }
        noteEl.textContent = "Bought. Minus " + money0(Number(current.price) || 0) + ". Balance " + money0(balance) + ".";
      } else {
        noteEl.textContent = "Skipped. Balance stays at " + money0(balance) + ".";
      }
      ctx.announce(noteEl.textContent);
      setTimeout(function () { if (!over) { nextCard(); } }, Math.max(ctx.o.advance_ms, 300));
    }

    function nextCard() {
      di += 1;
      if (di >= deck.length) { endMonth("done"); } else { showCard(); }
    }

    function endMonth(how) {
      if (over) { return; }
      over = true;
      locked = true;
      ctx.stopClock();
      sortRow.hidden = true; buyRow.hidden = true;
      card.hidden = true; ledger.hidden = true;
      var head, sum, ok = false;
      var sorting = " Sorting: " + sortRight + " of " + deck.length + " right.";
      if (how === "want") {
        head = "In the red";
        sum = "The " + String(redCard.prompt || "").toLowerCase() + " at " + money0(Number(redCard.price) || 0) + " put you "
          + money0(-balance) + " under. That is the want that did it. Nothing banks this month." + sorting;
      } else if (how === "need") {
        head = "In the red";
        sum = "A need came up and the money was gone: " + String(current.prompt || "").toLowerCase() + " at "
          + money0(Number(current.price) || 0) + ". The wants bought before it (" + spent.slice(0, -1).join(", ")
          + ") are what did it. Nothing banks this month." + sorting;
      } else if (how === "time") {
        head = "Time";
        sum = "The clock ran out with " + (deck.length - di) + " of " + deck.length + " cards still to sort. Balance "
          + money0(balance) + ". Nothing banks when the month is not finished." + sorting;
      } else {
        head = "In the black";
        ok = true;
        var bank = Math.round(balance / 5);
        ctx.add(bank);
        sum = "Month over with " + money0(balance) + " left, on top of the " + money0(savings) + " you saved first. That banks "
          + bank + " points (one per 5 dollars)." + sorting;
      }
      var endBox = el("div", "lsa-month-end");
      endBox.appendChild(el("h3", null, head));
      endBox.appendChild(el("p", null, sum));
      var fin = el("button", "gbtn go", "Finish");
      fin.type = "button";
      fin.setAttribute("data-month", "finish");
      fin.addEventListener("click", function () { fin.disabled = true; done(ok); });
      endBox.appendChild(fin);
      box.appendChild(endBox);
      ctx.say(head + ". " + sum, ok ? "good" : "bad");
      ctx.announce(head + ". " + sum);
    }

    if (!deck.length) { done(false); return; }
    showCard();

    /* one clock for the whole month: the words on every card in the pool and
       the buttons, on the arcade rule, plus twelve seconds for every card
       dealt, because each card is a read, a sort and sometimes a choice */
    var n = 0;
    pool.forEach(function (c) { n += ctx.words(c.prompt); });
    sortOpts.concat(buyOpts).forEach(function (op) { n += ctx.words(op.label); });
    ctx.startClock(ctx.round.seconds_per_item == null ? null : ctx.clockFor(n) + 12 * deck.length,
      function () { endMonth("time"); });
  });
}());

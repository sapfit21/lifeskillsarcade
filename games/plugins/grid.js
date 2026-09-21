/* Life Skills Arcade: the grid plugin, step kind "grid".
   A grid of rows by columns. Fixed pieces are drawn from the start. The
   pieces to place sit in a tray: tap a piece, then tap a cell, and it goes
   there. Tap a placed piece to pick it up again. CHECK scores the grid and
   Done ends the round. Only the best check counts: a piece or a rule that
   passes once stays credited, however many times the student checks.

   Two ways to check, read from the step data:
   1. Cells (set-the-table). Every piece carries row and col, and maybe
      also_cells. A piece is right when it sits in one of those cells.
   2. Rules (room-designer). The step carries rules, each {id, text, check}.
      A piece scores when it is on the grid. A rule scores when its check
      passes. The checks are door_swing_clear, path_door_to_window,
      bed_not_under_window and required_placed; see the check section.

   A piece may be wider than one cell: w and h in cells, anchored at the
   tapped cell (its top left corner), clamped to the grid edge. A piece with
   rug true lies under everything: it never blocks a cell, a swing or a path.

   Plain ES5 in one IIFE. No network, no storage, no dependency beyond the
   engine ctx. The chrome, the clock, the score and the report stay with the
   engine. */
(function () {
  "use strict";

  var CSS = ""
    + ".lsa-grid{margin:.4rem 0}"
    + ".lsa-grid-rule{margin:.2rem 0 .5rem;font-weight:600;line-height:1.35}"
    + ".lsa-grid-frame{background:#fff;border:2.5px solid var(--outline);border-radius:12px;padding:.6rem .45rem .5rem;box-shadow:4px 4px 0 var(--outline)}"
    + ".lsa-grid-wrap{position:relative;width:100%;border:4px solid var(--outline);background:#FFF6DC;box-sizing:border-box}"
    + ".lsa-grid-cells{position:absolute;left:0;top:0;right:0;bottom:0;display:grid}"
    + ".lsa-cell{display:block;width:100%;height:100%;min-width:0;min-height:0;padding:0;margin:0;border:1px solid rgba(17,17,17,.14);background:transparent;cursor:pointer;-webkit-appearance:none;appearance:none;box-sizing:border-box;touch-action:manipulation}"
    + ".lsa-cell.solid{background:repeating-linear-gradient(135deg,#C7D3DA 0 6px,#fff 6px 12px);cursor:default}"
    + ".lsa-cell.path{background:rgba(127,212,76,.35)}"
    + ".lsa-cell.want{outline:3px dashed #b3261e;outline-offset:-3px;background:rgba(255,210,63,.35)}"
    + ".lsa-cell.swing{background:rgba(255,90,77,.08)}"
    + ".lsa-grid-layer{position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none}"
    + ".lsa-gpiece{position:absolute;box-sizing:border-box;border:2.5px solid var(--outline);border-radius:4px;background:var(--brand-yellow);"
    +   "display:flex;align-items:center;justify-content:center;font:700 .6rem/1.1 var(--sans);text-align:center;color:var(--ink);cursor:pointer;overflow:hidden;padding:2px;pointer-events:auto}"
    + ".lsa-gpiece.has-art,.lsa-gfixed.piece-fixed{align-items:flex-end}"
    + ".lsa-gpiece.rug.has-art{align-items:flex-start}"
    + ".lsa-gpiece.rug{background:rgba(143,214,240,.45);border-style:dashed}"
    + ".lsa-gpiece.right{background:var(--brand-green)}"
    + ".lsa-gpiece.wrong{background:var(--brand-red);color:#fff}"
    + ".lsa-gpiece.has-art{background:#fff}"
    + ".lsa-gpiece.has-art .piece{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;pointer-events:none;margin:0}"
    + ".lsa-gpiece.has-art .lab{position:relative;background:rgba(255,255,255,.8);border-radius:3px;padding:0 2px}"
    + ".lsa-gpiece.right.has-art{background:var(--brand-green)}"
    + ".lsa-gpiece.wrong.has-art .piece{opacity:.35}"
    + ".lsa-gfixed{position:absolute;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font:700 .62rem/1.1 var(--sans);text-transform:uppercase;letter-spacing:.06em;color:var(--ink);text-align:center;overflow:hidden}"
    + ".lsa-gfixed.solid{background:repeating-linear-gradient(135deg,#C7D3DA 0 6px,#fff 6px 12px);border:2px solid var(--outline)}"
    + ".lsa-gfixed.piece-fixed{border:2.5px solid var(--outline);border-radius:4px;background:#fff;text-transform:none;letter-spacing:0;padding:2px}"
    + ".lsa-gfixed.piece-fixed .piece{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;margin:0}"
    + ".lsa-gfixed.piece-fixed .lab{position:relative;background:rgba(255,255,255,.8);border-radius:3px;padding:0 2px}"
    + ".lsa-gfixed.swing{border:2.5px dashed var(--brand-red);border-left:0;border-bottom:0;border-top-right-radius:100%}"
    + ".lsa-gfixed.window{background:#fff;border-top:2px solid var(--outline);border-bottom:2px solid var(--outline);z-index:2}"
    + ".lsa-gfixed.window::after{content:\"\";position:absolute;left:0;right:0;top:50%;border-top:1px solid var(--outline)}"
    + ".lsa-gfixed.door{background:#FFF6DC;z-index:2}"
    + ".lsa-grid-key{font-size:.85rem;color:var(--ink-2);margin:.5rem 0 0}"
    + ".lsa-grid-tray{display:flex;flex-wrap:wrap;gap:.45rem;margin:.6rem 0}"
    + ".lsa-grid-tray .gbtn{font-size:.9rem;line-height:1.2;padding:.55rem .7rem;background:#fff;text-align:left}"
    + ".lsa-grid-tray .gbtn .piece{display:inline-block;width:1.7rem;height:1.7rem;object-fit:contain;vertical-align:middle;margin:0 .35rem 0 0}"
    + ".lsa-grid-tray .gbtn.sel{background:var(--brand-green)}"
    + ".lsa-grid-tray .gbtn.placed{opacity:.45;text-decoration:line-through}"
    + ".lsa-grid-tray .gbtn small{display:block;font-weight:400;font-size:.75rem;color:var(--ink-2)}"
    + ".lsa-grid-rules{margin:.5rem 0 0 1.1rem;padding:0;font-size:.92rem;line-height:1.4}"
    + ".lsa-grid-rules li{margin:.2rem 0}"
    + ".lsa-grid-btns{display:flex;flex-wrap:wrap;gap:.5rem;margin:.6rem 0}"
    + ".lsa-grid-btns .gbtn{flex:1 1 9rem}"
    + ".lsa-grid-report{margin:.6rem 0 0}"
    + ".lsa-grid-report li.pass{background:var(--brand-green)}"
    + ".lsa-grid-report li.fix{background:#FFD9D6}"
    + ".lsa-grid-report[hidden],.lsa-grid .gbtn[hidden]{display:none}";

  var styled = false;
  function addStyle() {
    if (styled) { return; }
    styled = true;
    var s = document.createElement("style");
    s.appendChild(document.createTextNode(CSS));
    document.head.appendChild(s);
  }

  window.LSAEngine.register("grid", function (ctx, step, done) {
    addStyle();
    var el = ctx.el, list = ctx.list;
    var rows = step.rows || 1, cols = step.columns || 1;
    var pieces = list(step.pieces);
    var fixed = list(step.fixed);
    var rules = list(step.rules);
    var byCells = !rules.length;            /* set-the-table style: right cell per piece */
    var placed = {};                         /* id: {row, col, w, h} (1 based) */
    var credited = {};                       /* piece id or rule id already scored */
    var sel = null, rot = false, over = false, checked = false;
    var slug = ctx.data.slug || "";
    /* the engine's maximum: one right tap per piece, plus one per scored rule */
    if (step.max_taps == null) {
      step.max_taps = pieces.length + rules.filter(function (ru) { return !ru.gate; }).length;
    }

    function pieceById(id) {
      for (var i = 0; i < pieces.length; i++) { if (pieces[i].id === id) { return pieces[i]; } }
      return null;
    }
    function nameOf(p) { return String(p.prompt || p.name || p.id || ""); }
    /* the label drawn on a placed piece: the name up to its first comma or
       colon, so "Bed, twin" reads Bed and "Plate: center" reads Plate */
    function shortName(p) { return nameOf(p).split(/[,:]/)[0]; }
    function sizeOf(p, r) {
      var w = p.w || 1, h = p.h || 1;
      return r ? {w: h, h: w} : {w: w, h: h};
    }
    function artOf(p) {
      return ctx.artFor(p.picture) || ctx.artFor(slug + "-" + (p.piece || p.id));
    }
    function inRect(r, c, box) {
      return r >= box.row && r < box.row + box.h && c >= box.col && c < box.col + box.w;
    }
    function boxOf(f) { return {row: f.row, col: f.col, w: f.w || 1, h: f.h || 1}; }
    function overlaps(a, b) {
      return !(a.col + a.w <= b.col || b.col + b.w <= a.col || a.row + a.h <= b.row || b.row + b.h <= a.row);
    }
    /* a fixed entry that takes up floor space: no marker, or marker "solid" */
    function isSolidFixed(f) { return !f.marker || f.marker === "solid"; }
    function fixedWith(marker) {
      return fixed.filter(function (f) { return f.marker === marker; });
    }
    function cellsOf(box) {
      var out = [];
      for (var r = box.row; r < box.row + box.h; r++) {
        for (var c = box.col; c < box.col + box.w; c++) { out.push({row: r, col: c}); }
      }
      return out;
    }
    /* a cell is solid when it is off the grid, under a fixed solid piece, or
       under a placed piece that is not a rug */
    function solidAt(r, c, skipId) {
      if (r < 1 || c < 1 || r > rows || c > cols) { return true; }
      var i;
      for (i = 0; i < fixed.length; i++) {
        if (isSolidFixed(fixed[i]) && inRect(r, c, boxOf(fixed[i]))) { return true; }
      }
      for (var id in placed) {
        if (!placed.hasOwnProperty(id) || id === skipId) { continue; }
        var p = pieceById(id);
        if (p && p.rug) { continue; }
        if (inRect(r, c, placed[id])) { return true; }
      }
      return false;
    }

    /*  drawing  */
    var box = ctx.box;
    var root = el("div", "lsa-grid");
    box.appendChild(root);
    if (step.rule_text) { root.appendChild(el("p", "lsa-grid-rule", String(step.rule_text))); }
    var frame = el("div", "lsa-grid-frame");
    var wrap = el("div", "lsa-grid-wrap");
    wrap.setAttribute("aria-label", step.grid_label || "The grid");
    var cellsEl = el("div", "lsa-grid-cells");
    cellsEl.style.gridTemplateColumns = "repeat(" + cols + ",minmax(0,1fr))";
    cellsEl.style.gridTemplateRows = "repeat(" + rows + ",minmax(0,1fr))";
    var layer = el("div", "lsa-grid-layer");
    wrap.appendChild(cellsEl);
    wrap.appendChild(layer);
    frame.appendChild(wrap);
    if (step.legend) { frame.appendChild(el("p", "lsa-grid-key", String(step.legend))); }
    root.appendChild(frame);
    var tray = el("div", "lsa-grid-tray");
    tray.setAttribute("aria-label", "The pieces");
    root.appendChild(tray);
    var btns = el("div", "lsa-grid-btns");
    var rotBtn = el("button", "gbtn", "Rotate the piece"); rotBtn.type = "button";
    var checkBtn = el("button", "gbtn go", "Check"); checkBtn.type = "button";
    var doneBtn = el("button", "gbtn alt", "Done"); doneBtn.type = "button";
    doneBtn.hidden = true;
    var needsRotate = false;
    pieces.forEach(function (p) { if ((p.w || 1) !== (p.h || 1)) { needsRotate = true; } });
    if (needsRotate) { btns.appendChild(rotBtn); }
    btns.appendChild(checkBtn);
    btns.appendChild(doneBtn);
    root.appendChild(btns);
    var rulesEl = null;
    if (rules.length) {
      rulesEl = el("ul", "lsa-grid-rules");
      rules.forEach(function (ru) {
        var li = el("li", null, String(ru.text || ""));
        li.setAttribute("data-rule", ru.id);
        rulesEl.appendChild(li);
      });
      root.appendChild(rulesEl);
    }
    var report = el("ul", "miss-list lsa-grid-report");
    report.hidden = true;
    root.appendChild(report);

    /* the cells: one real button each, so a keyboard can reach every square */
    var cellNodes = [];
    (function () {
      for (var r = 1; r <= rows; r++) {
        for (var c = 1; c <= cols; c++) {
          var b = el("button", "lsa-cell");
          b.type = "button";
          b.setAttribute("data-row", String(r));
          b.setAttribute("data-col", String(c));
          b.setAttribute("aria-label", "Row " + r + ", column " + c);
          if (solidAt(r, c)) { b.classList.add("solid"); }
          b.addEventListener("click", (function (rr, cc) { return function () { tapCell(rr, cc); }; }(r, c)));
          cellsEl.appendChild(b);
          cellNodes.push(b);
        }
      }
    }());
    function cellNode(r, c) { return cellNodes[(r - 1) * cols + (c - 1)] || null; }
    function cellPx() { return Math.max(1, wrap.clientWidth / cols); }

    /* keep every cell square, fill the width, never scroll sideways: the
       wrap's height follows its width, and when the cells would fall under
       26 pixels the wrap borrows the page gutter with a negative margin */
    function sizeGrid() {
      wrap.style.marginLeft = "0"; wrap.style.marginRight = "0";
      var w = wrap.clientWidth;
      if (w / cols < 26) {
        var need = 26 * cols + 8;
        var room = Math.min(window.innerWidth || need, need);
        var extra = Math.max(0, (room - (w + 8)) / 2);
        wrap.style.marginLeft = (-extra) + "px"; wrap.style.marginRight = (-extra) + "px";
        w = wrap.clientWidth;
      }
      wrap.style.height = (Math.floor(w / cols) * rows + 8) + "px";
    }
    sizeGrid();
    var onResize = function () { sizeGrid(); };
    window.addEventListener("resize", onResize);

    function pct(box) {
      return {left: (100 * (box.col - 1) / cols) + "%", top: (100 * (box.row - 1) / rows) + "%",
              width: (100 * box.w / cols) + "%", height: (100 * box.h / rows) + "%"};
    }
    function placeNode(node, box) {
      var p = pct(box);
      node.style.left = p.left; node.style.top = p.top; node.style.width = p.width; node.style.height = p.height;
    }

    /* the fixed pieces: a solid block, a piece already placed (the plate), or
       a marker on a wall (door, window) or on the floor (the door swing) */
    fixed.forEach(function (f) {
      var b = boxOf(f);
      var n;
      if (f.marker === "window" || f.marker === "door") {
        n = el("div", "lsa-gfixed " + f.marker);
        n.setAttribute("title", nameOf(f));
        /* a wall marker sits on the 4px wall: a door is a gap in it, a
           window is a double line drawn a little thicker than the wall */
        var p = pct(b), thick = f.marker === "window" ? 8 : 4, off = f.marker === "window" ? -6 : -4;
        if (f.wall === "left") { n.style.left = off + "px"; n.style.width = thick + "px"; n.style.top = p.top; n.style.height = p.height; }
        else if (f.wall === "right") { n.style.right = off + "px"; n.style.width = thick + "px"; n.style.top = p.top; n.style.height = p.height; }
        else if (f.wall === "bottom") { n.style.left = p.left; n.style.width = p.width; n.style.bottom = off + "px"; n.style.height = thick + "px"; }
        else { n.style.left = p.left; n.style.width = p.width; n.style.top = off + "px"; n.style.height = thick + "px"; }
        if (f.marker === "door") { n.style.background = "#FFF6DC"; }
      } else if (f.marker === "swing") {
        n = el("div", "lsa-gfixed swing");
        n.setAttribute("title", nameOf(f));
        placeNode(n, b);
        cellsOf(b).forEach(function (cl) { var cn = cellNode(cl.row, cl.col); if (cn) { cn.classList.add("swing"); } });
      } else if (f.piece || f.picture) {
        n = el("div", "lsa-gfixed piece-fixed");
        var a = artOf(f);
        if (a) { a.className = "piece"; n.appendChild(a); }
        n.appendChild(el("span", "lab", shortName(f)));
        n.setAttribute("title", nameOf(f));
        placeNode(n, b);
      } else {
        n = el("div", "lsa-gfixed solid", shortName(f));
        n.setAttribute("title", nameOf(f));
        placeNode(n, b);
      }
      layer.appendChild(n);
    });

    /* the tray */
    var trayBtns = {};
    pieces.forEach(function (p) {
      var b = el("button", "gbtn");
      b.type = "button";
      b.setAttribute("data-piece", p.id);
      var a = artOf(p);
      if (a) { a.className = "piece"; b.appendChild(a); }
      b.appendChild(document.createTextNode(nameOf(p)));
      if (p.size_text) { b.appendChild(el("small", null, String(p.size_text))); }
      b.addEventListener("click", function () { tapTray(p.id); });
      tray.appendChild(b);
      trayBtns[p.id] = b;
    });

    var pieceNodes = {};
    function render() {
      var old = layer.querySelectorAll(".lsa-gpiece");
      for (var j = 0; j < old.length; j++) { old[j].parentNode.removeChild(old[j]); }
      pieceNodes = {};
      var ids = [];
      for (var id in placed) { if (placed.hasOwnProperty(id)) { ids.push(id); } }
      /* rugs first, so furniture draws on top of them */
      ids.sort(function (a, b) {
        var ra = pieceById(a).rug ? 0 : 1, rb = pieceById(b).rug ? 0 : 1;
        return ra - rb;
      });
      ids.forEach(function (id) {
        var p = pieceById(id), n = el("div", "lsa-gpiece" + (p.rug ? " rug" : ""));
        var a = artOf(p);
        if (a) { a.className = "piece"; n.appendChild(a); n.classList.add("has-art"); }
        /* with a picture, a label that cannot fit is left off: the picture
           and the title carry the name (a small cell, or a long name) */
        var lab = shortName(p), px = cellPx() * placed[id].w, longest = 0;
        lab.split(/\s+/).forEach(function (w) { longest = Math.max(longest, w.length); });
        if (!a || (lab.length <= 14 && longest * 5.8 + 8 <= px)) { n.appendChild(el("span", "lab", lab)); }
        n.setAttribute("data-piece", id);
        n.setAttribute("title", nameOf(p));
        placeNode(n, placed[id]);
        n.addEventListener("click", function (ev) { ev.stopPropagation(); pickUp(id); });
        layer.appendChild(n);
        pieceNodes[id] = n;
      });
      for (var i = 0; i < cellNodes.length; i++) { cellNodes[i].classList.remove("path", "want"); }
      box.setAttribute("data-placed", String(ids.length));
    }

    function setSel(id) {
      sel = id;
      for (var k in trayBtns) {
        if (trayBtns.hasOwnProperty(k)) { trayBtns[k].classList.toggle("sel", k === id); }
      }
    }

    /*  taps  */
    function tapTray(id) {
      if (over) { return; }
      if (placed[id]) { pickUp(id); return; }
      setSel(id); rot = false;
      var p = pieceById(id), d = sizeOf(p, false);
      var big = d.w > 1 || d.h > 1;
      ctx.say(nameOf(p) + " selected. " + (big ? "Tap the square where its top left corner goes." : "Tap the cell where it goes."), "");
      ctx.announce(nameOf(p) + " selected.");
    }
    function pickUp(id) {
      if (over) { return; }
      delete placed[id];
      trayBtns[id].classList.remove("placed");
      render();
      tapTray(id);
    }
    function tapCell(r, c) {
      if (over) { return; }
      if (!sel) { ctx.say("Tap a piece in the tray first.", ""); return; }
      var p = pieceById(sel), d = sizeOf(p, rot);
      if (c + d.w - 1 > cols) { c = cols - d.w + 1; }
      if (r + d.h - 1 > rows) { r = rows - d.h + 1; }
      var b = {row: r, col: c, w: d.w, h: d.h};
      if (p.rug) {
        /* a rug goes under furniture but never into a fixed solid block */
        for (var i = 0; i < fixed.length; i++) {
          if (isSolidFixed(fixed[i]) && overlaps(b, boxOf(fixed[i]))) {
            ctx.say("That spot is taken. Try another square.", "bad"); return;
          }
        }
      } else {
        var cl = cellsOf(b);
        for (var k = 0; k < cl.length; k++) {
          if (solidAt(cl[k].row, cl[k].col, sel)) { ctx.say("That spot is taken. Try another square.", "bad"); return; }
        }
      }
      placed[sel] = b;
      trayBtns[sel].classList.add("placed");
      var n = 0;
      for (var id in placed) { if (placed.hasOwnProperty(id)) { n += 1; } }
      ctx.say(nameOf(p) + " placed. " + (n < pieces.length ? "Pick the next piece, or press Check." : "Everything is in. Press Check."), "good");
      ctx.announce(nameOf(p) + " placed at row " + r + ", column " + c + ".");
      setSel(null);
      render();
    }
    rotBtn.addEventListener("click", function () {
      if (over) { return; }
      if (!sel) { ctx.say("Pick a piece first, then rotate it.", ""); return; }
      rot = !rot;
      var d = sizeOf(pieceById(sel), rot);
      ctx.say(nameOf(pieceById(sel)) + " turned: now " + d.w + " wide by " + d.h + " long.", "");
    });

    /*  the checks  */

    /* the cells of every fixed marker of one kind, inside the grid */
    function markerCells(marker) {
      var out = [];
      fixedWith(marker).forEach(function (f) { out = out.concat(cellsOf(boxOf(f))); });
      return out;
    }
    function pieceCells(id) { return placed[id] ? cellsOf(placed[id]) : []; }
    function sameCell(a, b) { return a.row === b.row && a.col === b.col; }
    function touches(cellsA, cellsB) {
      for (var i = 0; i < cellsA.length; i++) {
        for (var j = 0; j < cellsB.length; j++) { if (sameCell(cellsA[i], cellsB[j])) { return true; } }
      }
      return false;
    }

    /* door_swing_clear: no cell of any placed piece (rugs aside) is a swing cell */
    function checkDoorSwing() {
      var swing = markerCells("swing");
      for (var id in placed) {
        if (!placed.hasOwnProperty(id) || pieceById(id).rug) { continue; }
        if (touches(pieceCells(id), swing)) { return false; }
      }
      return true;
    }

    /* path_door_to_window: a corridor 3 cells wide from the door to the
       window. A cell is "open" when the 3 by 3 block whose top left corner is
       that cell holds no solid cell (nothing off the grid, no closet, no
       furniture; a rug does not count). A flood fill (breadth first) walks
       from open block to open block one cell at a time, up, down, left or
       right. Sliding a 3 by 3 block one cell at a time traces a corridor that
       is never narrower than 3, so if the fill reaches the window the path is
       real. The fill starts from every open block that contains a door cell
       (the cells along the door on its wall) and stops at the first open block
       that contains a window cell (the cells along the window on its wall).
       Returns the cells the fill covered when a path exists, else null. */
    function checkPath() {
      var W = 3;
      var open = {}, r, c, ok, dr, dc, key;
      for (r = 1; r <= rows - W + 1; r++) {
        for (c = 1; c <= cols - W + 1; c++) {
          ok = true;
          for (dr = 0; dr < W && ok; dr++) { for (dc = 0; dc < W; dc++) { if (solidAt(r + dr, c + dc)) { ok = false; break; } } }
          if (ok) { open[r + "," + c] = true; }
        }
      }
      var doorCells = markerCells("door"), winCells = markerCells("window");
      if (!doorCells.length || !winCells.length) { return null; }
      function blockHas(r0, c0, cellsList) {
        for (var i = 0; i < cellsList.length; i++) {
          var x = cellsList[i];
          if (x.row >= r0 && x.row < r0 + W && x.col >= c0 && x.col < c0 + W) { return true; }
        }
        return false;
      }
      var queue = [], seen = {};
      for (key in open) {
        if (open.hasOwnProperty(key)) {
          var pr = key.split(",");
          if (blockHas(+pr[0], +pr[1], doorCells)) { seen[key] = true; queue.push(key); }
        }
      }
      var found = false;
      while (queue.length) {
        var cur = queue.shift(), parts = cur.split(",");
        r = +parts[0]; c = +parts[1];
        if (blockHas(r, c, winCells)) { found = true; break; }
        var nb = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]];
        for (var k = 0; k < 4; k++) {
          var nk = nb[k][0] + "," + nb[k][1];
          if (open[nk] && !seen[nk]) { seen[nk] = true; queue.push(nk); }
        }
      }
      if (!found) { return null; }
      var covered = [];
      for (key in seen) {
        if (seen.hasOwnProperty(key)) {
          var q = key.split(",");
          for (dr = 0; dr < W; dr++) { for (dc = 0; dc < W; dc++) { covered.push({row: +q[0] + dr, col: +q[1] + dc}); } }
        }
      }
      return covered;
    }

    /* bed_not_under_window: no cell of the bed touches a window cell */
    function checkBed(rule) {
      var id = rule.piece || "bed";
      if (!placed[id]) { return false; }
      return !touches(pieceCells(id), markerCells("window"));
    }

    /* required_placed: every piece marked required is on the grid */
    function missingRequired() {
      return pieces.filter(function (p) { return p.required && !placed[p.id]; });
    }

    function runRule(rule) {
      var ch = rule.check;
      if (ch === "door_swing_clear") { return {ok: checkDoorSwing()}; }
      if (ch === "path_door_to_window") { var cov = checkPath(); return {ok: !!cov, cells: cov || []}; }
      if (ch === "bed_not_under_window") { return {ok: checkBed(rule)}; }
      if (ch === "required_placed") { return {ok: missingRequired().length === 0}; }
      return {ok: false};
    }

    /* a set-the-table piece is right in its own cell or in one of also_cells */
    function rightCell(p) {
      var at = placed[p.id];
      if (!at) { return false; }
      if (at.row === p.row && at.col === p.col) { return true; }
      var also = list(p.also_cells);
      for (var i = 0; i < also.length; i++) { if (at.row === also[i].row && at.col === also[i].col) { return true; } }
      return false;
    }

    function addReport(text, ok) {
      var li = el("li", ok ? "pass" : "fix", (ok ? "Pass. " : "Fix. ") + text);
      report.appendChild(li);
    }
    /* credited keys are prefixed, because a rule and a piece may share an id
       (room-designer has a bed piece and a bed rule) */
    function credit(key) {
      if (credited[key]) { return; }
      credited[key] = 1;
      ctx.award();
    }
    function reportOn() { report.textContent = ""; report.hidden = false; }
    function ruleFail(ru) { return String(ru.fail || ru.text || ru.id); }
    function rulePass(ru) { return String(ru.pass || ru.text || ru.id); }
    function pieceMissText(p) { return nameOf(p) + (p.feedback ? ": " + p.feedback : ""); }

    /* CHECK. final is true on the last check (Done or the clock): every
       piece and rule that never passed on any check is then a miss. One that
       passed once stays credited, so the best check is the one that counts. */
    function check(final) {
      var i, p, n = 0, total;
      for (i = 0; i < cellNodes.length; i++) { cellNodes[i].classList.remove("path", "want"); }
      for (var id in pieceNodes) { if (pieceNodes.hasOwnProperty(id)) { pieceNodes[id].classList.remove("right", "wrong"); } }
      if (byCells) {
        reportOn();
        for (i = 0; i < pieces.length; i++) {
          p = pieces[i];
          if (rightCell(p)) {
            n += 1;
            credit("p:" + p.id);
            if (pieceNodes[p.id]) { pieceNodes[p.id].classList.add("right"); }
          } else {
            if (pieceNodes[p.id]) { pieceNodes[p.id].classList.add("wrong"); }
            var want = cellNode(p.row, p.col);
            if (want) { want.classList.add("want"); }
            addReport(pieceMissText(p), false);
            if (final && !credited["p:" + p.id]) { ctx.miss(pieceMissText(p)); }
          }
        }
        total = pieces.length;
        var line = n === total ? "Every piece is in the right cell."
                 : n + " of " + total + " in the right cell. The dashed cell is where a marked piece goes. Move it and check again.";
        ctx.say(line, n === total ? "good" : "");
        ctx.announce(n + " of " + total + " pieces right.");
      } else {
        /* the gate: a required piece missing stops an ordinary check */
        var need = missingRequired();
        if (need.length && !final) {
          ctx.say("Place these first: " + need.map(nameOf).join(", ") + ".", "bad");
          ctx.announce("Place these first: " + need.map(nameOf).join(", ") + ".");
          return false;
        }
        reportOn();
        for (i = 0; i < pieces.length; i++) {
          p = pieces[i];
          if (placed[p.id]) { credit("p:" + p.id); }
          else if (final) { ctx.miss(p.required ? "Place these first: " + nameOf(p) + "." : ""); }
        }
        var pass = 0, scored = 0;
        for (i = 0; i < rules.length; i++) {
          var ru = rules[i], res = runRule(ru);
          if (ru.gate) {
            if (!res.ok) { addReport(ruleFail(ru) || ("Place these first: " + need.map(nameOf).join(", ") + "."), false); }
            continue;
          }
          scored += 1;
          if (res.ok) {
            pass += 1;
            credit("r:" + ru.id);
            addReport(rulePass(ru), true);
            list(res.cells).forEach(function (cl) { var cn = cellNode(cl.row, cl.col); if (cn) { cn.classList.add("path"); } });
          } else {
            addReport(ruleFail(ru), false);
            if (final && !credited["r:" + ru.id]) { ctx.miss(ruleFail(ru)); }
          }
          if (rulesEl) {
            var li = rulesEl.querySelector('[data-rule="' + ru.id + '"]');
            if (li) { li.style.textDecoration = res.ok ? "line-through" : "none"; }
          }
        }
        var say = pass === scored ? (scored === 3 ? "Three of three. The room works." : "Every rule passes.")
                : pass + " of " + scored + " rules pass. Fix what failed and check again.";
        ctx.say(say, pass === scored ? "good" : "");
        ctx.announce(pass + " of " + scored + " rules pass.");
      }
      checked = true;
      doneBtn.hidden = false;
      return true;
    }
    function allCredited() {
      var i;
      for (i = 0; i < pieces.length; i++) { if (!credited["p:" + pieces[i].id]) { return false; } }
      for (i = 0; i < rules.length; i++) { if (!rules[i].gate && !credited["r:" + rules[i].id]) { return false; } }
      return true;
    }
    function finishStep() {
      if (over) { return; }
      over = true;
      window.removeEventListener("resize", onResize);
      checkBtn.disabled = true; doneBtn.disabled = true; rotBtn.disabled = true;
      done(allCredited());
    }
    checkBtn.addEventListener("click", function () { if (!over) { check(false); } });
    doneBtn.addEventListener("click", function () {
      if (over || !checked) { return; }
      check(true);
      finishStep();
    });

    /*  the prompt and the clock  */
    if (!step.prompt) { ctx.prompt("Tap a piece, then tap the cell where it goes. Press Check when the grid is set."); }
    var n = ctx.words(step.rule_text) + ctx.words(step.legend) + ctx.words(step.prompt);
    pieces.forEach(function (p) { n += ctx.words(nameOf(p)) + ctx.words(p.size_text); });
    rules.forEach(function (ru) { n += ctx.words(ru.text); });
    fixed.forEach(function (f) { n += ctx.words(nameOf(f)); });
    var secs = ctx.clockFor(n) + 5 * pieces.length;
    box.setAttribute("data-grid-secs", String(secs));
    ctx.startClock(ctx.round.seconds_per_item == null ? null : secs, function () {
      if (over) { return; }
      check(true);
      ctx.say("Time. " + (allCredited() ? "The grid is set." : "The marked ones are the ones to study."), allCredited() ? "good" : "bad");
      finishStep();
    });
    render();
    ctx.announce((step.prompt || "Tap a piece, then tap the cell where it goes.") + " " + pieces.length + " pieces.");
  });
}());

/* The class leaderboard (D102). A student sees their own class; a teacher
   picks one of theirs. Rows come from the class_board function: one best
   run per student per game inside the chosen time window. The page adds
   them up (all games) or shows one game, and filters by unit. Plain ES5. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  var auth = LSA.auth;
  var CAT = window.LSA_CATALOG || {games: {}, lessons: {}, units: {}};
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (text != null) { e.textContent = text; } return e; }
  function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }
  function title(slug) { return (CAT.games[slug] && CAT.games[slug].title) || slug; }
  function unitOf(slug) { var g = CAT.games[slug]; return g && g.unit != null ? String(parseInt(g.unit, 10)) : ""; }
  if (!auth || !auth.ready) { $("needSignIn").hidden = false; return; }

  var client = null, who = null, rows = [], classes = [], classId = null, roster = [];

  LSA.onAuth = function (w, c) {
    who = w; client = c;
    if (!who) { $("needSignIn").hidden = false; return; }
    $("boardBody").hidden = false;
    fillGames();
    fillUnits();
    if (who.role === "teacher") {
      client.from("classes").select("id, name, code, archived").order("created_at").then(function (r) {
        classes = (r.data || []).filter(function (k) { return !k.archived; }).concat((r.data || []).filter(function (k) { return k.archived; }));
        var sel = $("bClass");
        clear(sel);
        classes.forEach(function (k) { sel.appendChild(new Option(k.name + (k.archived ? " (archived)" : ""), k.id)); });
        $("classField").hidden = classes.length < 2;
        var hash = location.hash.replace(/^#/, "");
        classId = classes.some(function (k) { return k.id === hash; }) ? hash : (classes[0] ? classes[0].id : null);
        if (classId) { sel.value = classId; }
        if (!classId) { $("boardLede").textContent = "Make a class on the Class page and hand out logins; the board fills as students play."; return; }
        load();
      });
    } else {
      classId = who.class_id || null;
      if (!classId) { $("boardLede").textContent = "Your username is not in a class yet. Ask your teacher."; return; }
      load();
    }
  };

  function fillGames() {
    var sel = $("bGame");
    Object.keys(CAT.games).sort(function (a, b) { var ua = parseInt(unitOf(a) || "0", 10), ub = parseInt(unitOf(b) || "0", 10); return ua - ub || title(a).localeCompare(title(b)); })
      .forEach(function (g) { sel.appendChild(new Option(title(g) + (unitOf(g) ? " (Unit " + unitOf(g) + ")" : ""), g)); });
  }
  function fillUnits() {
    var sel = $("bUnit");
    Object.keys(CAT.units || {}).sort(function (a, b) { return a - b; }).forEach(function (n) { sel.appendChild(new Option("Unit " + n + ": " + CAT.units[n], n)); });
  }
  function since() {
    var v = $("bWhen").value, d = new Date();
    if (v === "today") { d.setHours(0, 0, 0, 0); return d.toISOString(); }
    if (v === "week") { d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.toISOString(); }
    return null;
  }
  function load() {
    $("boardCaption").textContent = "Loading.";
    var p = who.role === "teacher"
      ? client.from("students").select("id, username, avatar").eq("class_id", classId).then(function (r) { roster = r.data || []; })
      : Promise.resolve();
    p.then(function () { return auth.board(classId, since()); }).then(function (data) {
      rows = data;
      draw();
    }).catch(function (e) { $("boardCaption").textContent = "Could not load the board: " + e.message; });
  }
  ["bGame", "bUnit"].forEach(function (id) { $(id).addEventListener("change", draw); });
  $("bWhen").addEventListener("change", load);
  $("bClass").addEventListener("change", function () { classId = $("bClass").value; history.replaceState(null, "", location.pathname + "#" + classId); load(); });

  function draw() {
    var game = $("bGame").value, unit = $("bUnit").value;
    var use = rows.filter(function (r) { return (!game || r.game === game) && (!unit || unitOf(r.game) === unit); });
    var by = {};
    use.forEach(function (r) {
      var s = by[r.student_id] || (by[r.student_id] = {id: r.student_id, username: r.username, avatar: r.avatar, points: 0, games: 0, plays: 0, last: ""});
      s.points += r.best_score; s.games += 1; s.plays += Number(r.plays);
      if (!s.last || r.last_played > s.last) { s.last = r.last_played; }
    });
    /* a teacher's board also lists students with no score yet, at the bottom */
    if (who.role === "teacher") {
      roster.forEach(function (st) { if (!by[st.id]) { by[st.id] = {id: st.id, username: st.username, avatar: st.avatar, points: 0, games: 0, plays: 0, last: "", empty: true}; } });
    }
    var list = Object.keys(by).map(function (k) { return by[k]; })
      .sort(function (a, b) { return b.points - a.points || b.games - a.games || a.username.localeCompare(b.username); });
    var ol = $("boardList");
    clear(ol);
    var scored = list.filter(function (s) { return !s.empty; }).length;
    $("noBoard").hidden = scored > 0;
    var cls = who.role === "teacher" ? (classes.filter(function (k) { return k.id === classId; })[0] || {}).name : "your class";
    var what = game ? "best run on " + title(game) : (unit ? "best runs added up, Unit " + unit : "best runs on every game added up");
    var whenText = {"": "all time", week: "this week", today: "today"}[$("bWhen").value];
    $("boardCaption").textContent = (cls || "Class") + ": " + what + ", " + whenText + ". " + scored + (scored === 1 ? " student has" : " students have") + " a score.";
    var rank = 0, prev = null;
    list.forEach(function (s, i) {
      if (!s.empty && s.points !== prev) { rank = i + 1; prev = s.points; }
      var li = el("li", "board-row" + (who.student_id === s.id ? " me" : "") + (s.empty ? " empty" : "") + (rank === 1 && !s.empty ? " top" : ""));
      li.appendChild(el("span", "board-rank", s.empty ? "" : String(rank)));
      var whoEl = el("span", "board-who");
      whoEl.appendChild(el("span", "acct-avatar", auth.avatarChar(s.avatar)));
      whoEl.appendChild(el("span", "board-name", s.username + (who.student_id === s.id ? " (you)" : "")));
      li.appendChild(whoEl);
      li.appendChild(el("span", "board-points", s.empty ? "no score yet" : s.points + (game ? " pts" : " pts, " + s.games + (s.games === 1 ? " game" : " games"))));
      ol.appendChild(li);
    });
  }
}());

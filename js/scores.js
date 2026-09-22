/* My scores (D102): a signed in student's best run per game, their place in
   the class on each, their last plays, and the avatar picker. Reads the
   student's own rows under row level security and the class board through
   the class_board function. Plain ES5. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  var auth = LSA.auth;
  var CAT = window.LSA_CATALOG || {games: {}, lessons: {}, units: {}};
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (text != null) { e.textContent = text; } return e; }
  function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }
  function say(id, text, bad) { var p = $(id); if (!p) { return; } p.textContent = text || ""; p.className = "form-msg" + (bad ? " bad" : "") + (text ? " show" : ""); }
  function title(slug) { return (CAT.games[slug] && CAT.games[slug].title) || slug; }
  function unitOf(slug) { var g = CAT.games[slug]; return g && g.unit != null ? String(parseInt(g.unit, 10)) : ""; }
  function lessonOf(slug, code) { if (code && CAT.lessons[code]) { return code; } var g = CAT.games[slug]; return g && g.lessons && g.lessons.length ? g.lessons[0] : (code || ""); }
  function when(iso) { var d = new Date(iso); if (isNaN(d.getTime())) { return ""; } var now = new Date(); var same = d.toDateString() === now.toDateString(); return (same ? "Today " : (d.getMonth() + 1) + "/" + d.getDate() + " ") + d.getHours() + ":" + String(d.getMinutes()).replace(/^(\d)$/, "0$1"); }
  if (!auth || !auth.ready) { $("needSignIn").hidden = false; return; }

  var client = null, who = null, mine = [], board = [];

  LSA.onAuth = function (w, c) {
    who = w; client = c;
    if (!who) { $("needSignIn").hidden = false; return; }
    if (who.role === "teacher") { $("teacherNote").hidden = false; return; }
    $("scoresBody").hidden = false;
    drawMe();
    load();
  };

  /*  the card at the top and the avatar picker */
  function drawMe() {
    $("meAvatar").textContent = auth.avatarChar(who.avatar);
    $("me-h").textContent = who.username;
    $("meSub").textContent = who.avatar ? "Your avatar is on the class leaderboard next to your username." : "No avatar yet. Pick one and it shows on the class leaderboard.";
    $("pickAvatarBtn").textContent = who.avatar ? "Change avatar" : "Pick your avatar";
  }
  $("pickAvatarBtn").addEventListener("click", function () {
    var grid = $("avatarGrid");
    if (!grid.hidden) { grid.hidden = true; return; }
    clear(grid);
    Object.keys(auth.avatars).forEach(function (key) {
      var b = el("button", "avatar-pick" + (who.avatar === key ? " on" : ""), auth.avatars[key]);
      b.type = "button";
      b.setAttribute("aria-label", key);
      b.title = key;
      b.addEventListener("click", function () {
        say("av-msg", "Saving.");
        auth.setAvatar(key).then(function () {
          say("av-msg", "Saved. That is you now.");
          grid.hidden = true;
          drawMe();
        }).catch(function (e) { say("av-msg", "Could not save it: " + e.message, true); });
      });
      grid.appendChild(b);
    });
    grid.hidden = false;
  });

  /*  the data */
  function load() {
    client.from("scores").select("game, lesson, score, max, played_at").eq("student_id", who.student_id)
      .order("played_at", {ascending: false}).limit(2000).then(function (r) {
        mine = r.data || [];
        var p = who.class_id ? auth.board(who.class_id, null) : Promise.resolve([]);
        return p.then(function (rows) { board = rows; }, function () { board = []; });
      }).then(function () {
        fillUnits();
        drawStats();
        drawBest();
        drawRecent();
      });
  }
  function fillUnits() {
    var sel = $("myUnit");
    clear(sel);
    sel.appendChild(new Option("All units", ""));
    Object.keys(CAT.units || {}).sort(function (a, b) { return a - b; }).forEach(function (n) {
      sel.appendChild(new Option("Unit " + n + ": " + CAT.units[n], n));
    });
  }
  $("myUnit").addEventListener("change", drawBest);

  function bestByGame() {
    var by = {};
    mine.forEach(function (r) {
      var b = by[r.game] || (by[r.game] = {game: r.game, lesson: lessonOf(r.game, r.lesson), best: -1, max: 0, plays: 0, last: ""});
      b.plays += 1;
      if (r.score > b.best) { b.best = r.score; b.max = r.max; }
      if (!b.last || r.played_at > b.last) { b.last = r.played_at; }
    });
    return by;
  }
  function rankOn(game, myBest) {
    var scores = board.filter(function (r) { return r.game === game; }).map(function (r) { return r.best_score; });
    if (!scores.length) { return null; }
    var above = scores.filter(function (s) { return s > myBest; }).length;
    return {rank: above + 1, of: scores.length};
  }
  function drawStats() {
    var box = $("myStats");
    clear(box);
    var by = bestByGame(), games = Object.keys(by);
    var total = 0;
    games.forEach(function (g) { total += by[g].best; });
    var all = Object.keys(CAT.games).length;
    /* place on the whole board: total of bests, against classmates */
    var totals = {};
    board.forEach(function (r) { totals[r.student_id] = (totals[r.student_id] || 0) + r.best_score; });
    var others = Object.keys(totals).map(function (k) { return totals[k]; });
    var place = others.length ? (others.filter(function (t) { return t > total; }).length + 1) + " of " + others.length : "n/a";
    [[total, "points, best runs added up"], [games.length + " of " + all, "games played"], [mine.length, "plays"], [place, "place in class"]].forEach(function (pair) {
      var s = el("div", "stat");
      s.appendChild(el("span", "stat-n", String(pair[0])));
      s.appendChild(el("span", "stat-l", pair[1]));
      box.appendChild(s);
    });
  }
  function drawBest() {
    var tb = $("bestRows");
    clear(tb);
    var by = bestByGame(), unit = $("myUnit").value;
    var slugs = Object.keys(CAT.games).filter(function (g) { return !unit || unitOf(g) === unit; })
      .sort(function (a, b) { var ua = parseInt(unitOf(a) || "0", 10), ub = parseInt(unitOf(b) || "0", 10); return ua - ub || title(a).localeCompare(title(b)); });
    $("noPlays").hidden = mine.length > 0;
    slugs.forEach(function (g) {
      var b = by[g];
      var tr = el("tr", b ? "" : "unplayed");
      var tdG = el("td");
      var a = el("a", "", title(g));
      a.href = auth.base + "games/" + g + ".html";
      tdG.appendChild(a);
      tr.appendChild(tdG);
      var code = b ? b.lesson : ((CAT.games[g].lessons || [])[0] || "");
      tr.appendChild(el("td", "", code ? "Lesson " + code : ""));
      tr.appendChild(el("td", "num", b ? String(b.best) : ""));
      tr.appendChild(el("td", "num", b ? String(b.plays) : ""));
      var rk = b ? rankOn(g, b.best) : null;
      tr.appendChild(el("td", "", rk ? (rk.rank === 1 ? "1st of " + rk.of : rk.rank + " of " + rk.of) : ""));
      var tdP = el("td");
      var play = el("a", "go plain tiny", b ? "Beat it" : "Play");
      play.href = auth.base + "games/" + g + ".html";
      tdP.appendChild(play);
      tr.appendChild(tdP);
      tb.appendChild(tr);
    });
  }
  function drawRecent() {
    var tb = $("recentRows");
    clear(tb);
    mine.slice(0, 12).forEach(function (r) {
      var tr = el("tr");
      tr.appendChild(el("td", "", when(r.played_at)));
      tr.appendChild(el("td", "", title(r.game)));
      tr.appendChild(el("td", "num", String(r.score)));
      tb.appendChild(tr);
    });
  }
}());

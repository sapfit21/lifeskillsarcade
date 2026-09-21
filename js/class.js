/* The Class page (D73). Not a dashboard: one page where a signed in teacher
   makes classes, hands out logins, resets PINs and reads scores. Reads go
   straight to the tables under row level security; anything that touches a
   PIN or an auth user goes through an edge function. Plain ES5. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  var auth = LSA.auth;
  var CAT = window.LSA_CATALOG || {games: {}, lessons: {}};
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (text != null) { e.textContent = text; }
    return e;
  }
  function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }
  function say(id, text, bad) {
    var p = $(id);
    if (!p) { return; }
    p.textContent = text || "";
    p.className = "form-msg" + (bad ? " bad" : "") + (text ? " show" : "");
  }
  function pct(score, max) { return max > 0 ? Math.round(100 * score / max) : 0; }
  function dateOf(iso) {
    if (!iso) { return ""; }
    var d = new Date(iso);
    if (isNaN(d.getTime())) { return ""; }
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + String(d.getFullYear()).slice(2);
  }
  function today() { return dateOf(new Date().toISOString()); }
  function gameTitle(slug) { return (CAT.games[slug] && CAT.games[slug].title) || slug; }
  function lessonOf(code, slug) {
    if (code && CAT.lessons[code]) { return code; }
    if (CAT.games[slug] && CAT.games[slug].lessons && CAT.games[slug].lessons.length) { return CAT.games[slug].lessons[0]; }
    return code || "";
  }
  function lessonLabel(code) {
    var l = CAT.lessons[code];
    return l ? ("Lesson " + code + ", " + l.title) : (code ? "Lesson " + code : "No lesson");
  }
  function token() {
    return client.auth.getSession().then(function (s) {
      return s.data && s.data.session ? s.data.session.access_token : null;
    });
  }
  function fn(name, body) {
    return token().then(function (t) { return auth.callFn(name, body, t); });
  }

  if (!auth || !auth.ready) { return; }
  var client = null;
  var who = null;
  var classes = [];
  var current = null;
  var students = [];
  var scores = [];

  LSA.onAuth = function (w, c) {
    who = w; client = c;
    if (!who || who.role !== "teacher") { $("needSignIn").hidden = false; return; }
    $("needSignIn").hidden = true;
    $("classLede").textContent = "Signed in as " + (who.teacher.display_name || who.teacher.email)
      + ". Your classes, your students' scores, and the logins you hand out. No names live here: you keep the list of who is who.";
    loadClasses();
  };

  /*  classes */
  function loadClasses() {
    client.from("classes").select("id, name, code, school_year, archived, created_at")
      .order("created_at", {ascending: true}).then(function (r) {
        if (r.error) { say("nc-msg", r.error.message, true); return; }
        classes = (r.data || []).sort(function (a, b) { return (a.archived ? 1 : 0) - (b.archived ? 1 : 0); });
        return client.from("students").select("id, class_id, locked_at");
      }).then(function (r) {
        var counts = {}, locked = {};
        ((r && r.data) || []).forEach(function (s) {
          counts[s.class_id] = (counts[s.class_id] || 0) + 1;
          if (s.locked_at) { locked[s.class_id] = (locked[s.class_id] || 0) + 1; }
        });
        drawClasses(counts, locked);
        var hash = location.hash.replace(/^#/, "");
        var pick = null;
        classes.forEach(function (c) { if (c.id === hash) { pick = c; } });
        if (pick) { openClass(pick); } else { showList(); }
      });
  }
  function drawClasses(counts, locked) {
    var ul = $("classCards");
    clear(ul);
    $("noClasses").hidden = classes.length > 0;
    classes.forEach(function (c) {
      var li = el("li", "class-card" + (c.archived ? " archived" : ""));
      var b = el("button", "class-open");
      b.type = "button";
      b.appendChild(el("span", "cc-name", c.name));
      b.appendChild(el("span", "cc-meta", "facs-" + c.code + "-NN" + (c.school_year ? ", " + c.school_year : "")
        + ", " + (counts[c.id] || 0) + (counts[c.id] === 1 ? " student" : " students")
        + (locked[c.id] ? ", " + locked[c.id] + " locked out" : "")
        + (c.archived ? ", archived" : "")));
      b.addEventListener("click", function () { openClass(c); });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }
  function showList() {
    current = null;
    $("classList").hidden = false;
    $("classDetail").hidden = true;
    if (location.hash) { history.replaceState(null, "", location.pathname); }
  }
  $("newClassBtn").addEventListener("click", function () {
    $("newClassForm").hidden = false;
    $("nc-name").focus();
  });
  $("nc-cancel").addEventListener("click", function () { $("newClassForm").hidden = true; });
  $("newClassForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = $("nc-name").value.trim();
    var code = $("nc-code").value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    var year = $("nc-year").value.trim();
    if (!name || !code) { say("nc-msg", "A name and a short code, please.", true); return; }
    client.from("classes").insert({teacher_id: who.user.id, name: name, code: code, school_year: year || null})
      .select("id, name, code, school_year, archived, created_at").single().then(function (r) {
        if (r.error) {
          say("nc-msg", /duplicate|unique/i.test(r.error.message) ? "You already have a class with that code." : r.error.message, true);
          return;
        }
        say("nc-msg", "");
        $("newClassForm").hidden = true;
        $("nc-name").value = ""; $("nc-code").value = "";
        classes.push(r.data);
        openClass(r.data);
      });
  });

  /*  one class */
  function openClass(c) {
    current = c;
    students = []; scores = [];
    $("classList").hidden = true;
    $("classDetail").hidden = false;
    $("cd-kicker").textContent = "facs-" + c.code + "-NN" + (c.school_year ? ", " + c.school_year : "");
    $("cd-h").textContent = c.name;
    $("archiveBtn").textContent = c.archived ? "Unarchive class" : "Archive class";
    $("addStudentsForm").hidden = true;
    $("newLogins").hidden = true;
    say("cd-msg", "");
    history.replaceState(null, "", location.pathname + "#" + c.id);
    loadStudents();
  }
  $("backBtn").addEventListener("click", function () {
    history.replaceState(null, "", location.pathname);
    loadClasses();
  });
  $("archiveBtn").addEventListener("click", function () {
    if (!current) { return; }
    var flag = !current.archived;
    client.from("classes").update({archived: flag}).eq("id", current.id).then(function (r) {
      if (r.error) { say("cd-msg", r.error.message, true); return; }
      current.archived = flag;
      $("archiveBtn").textContent = flag ? "Unarchive class" : "Archive class";
      say("cd-msg", flag ? "Archived. Students in it can still sign in; it just sits at the bottom of your list." : "Back in the active list.");
    });
  });

  function loadStudents() {
    client.from("students").select("id, username, failed_attempts, locked_at, created_at")
      .eq("class_id", current.id).order("username").then(function (r) {
        if (r.error) { say("cd-msg", r.error.message, true); return; }
        students = r.data || [];
        var ids = students.map(function (s) { return s.id; });
        if (!ids.length) { scores = []; drawAll(); return; }
        return client.from("scores").select("student_id, game, lesson, score, max, played_at")
          .in("student_id", ids).order("played_at", {ascending: false}).limit(5000)
          .then(function (r2) {
            if (r2.error) { say("cd-msg", r2.error.message, true); }
            var mine = {};
            ids.forEach(function (id) { mine[id] = true; });
            scores = (r2.data || []).filter(function (row) { return mine[row.student_id]; });
            drawAll();
          });
      });
  }
  function drawAll() {
    drawStats();
    drawRoster();
    drawWeak();
    drawScores();
  }

  /*  the numbers at the top */
  function drawStats() {
    var box = $("stats");
    clear(box);
    var locked = students.filter(function (s) { return s.locked_at; }).length;
    var played = {};
    scores.forEach(function (r) { played[r.student_id] = true; });
    var n = Object.keys(played).length;
    var sum = 0, cnt = 0;
    scores.forEach(function (r) { if (r.max > 0) { sum += pct(r.score, r.max); cnt += 1; } });
    [[students.length, "logins"], [n, "have played"], [scores.length, "plays"],
     [cnt ? Math.round(sum / cnt) + "%" : "n/a", "class average"], [locked, "locked out"]].forEach(function (pair) {
      var s = el("div", "stat" + (pair[1] === "locked out" && locked ? " warn" : ""));
      s.appendChild(el("span", "stat-n", String(pair[0])));
      s.appendChild(el("span", "stat-l", pair[1]));
      box.appendChild(s);
    });
  }

  /*  the roster */
  function perStudent() {
    var by = {};
    scores.forEach(function (r) {
      var s = by[r.student_id] || (by[r.student_id] = {plays: 0, sum: 0, cnt: 0, last: ""});
      s.plays += 1;
      if (r.max > 0) { s.sum += pct(r.score, r.max); s.cnt += 1; }
      if (!s.last || r.played_at > s.last) { s.last = r.played_at; }
    });
    return by;
  }
  function drawRoster() {
    var tb = $("rosterRows");
    clear(tb);
    var by = perStudent();
    var sel = $("scoreWho");
    clear(sel);
    sel.appendChild(new Option("Everyone", ""));
    students.forEach(function (s) {
      var st = by[s.id] || {plays: 0, sum: 0, cnt: 0, last: ""};
      var tr = el("tr", s.locked_at ? "locked" : "");
      tr.appendChild(el("td", "mono", s.username));
      tr.appendChild(el("td", "num", String(st.plays)));
      tr.appendChild(el("td", "num", st.cnt ? Math.round(st.sum / st.cnt) + "%" : ""));
      tr.appendChild(el("td", "", dateOf(st.last)));
      tr.appendChild(el("td", "", s.locked_at ? "Locked out" : (s.failed_attempts ? s.failed_attempts + " wrong tries" : "OK")));
      var td = el("td", "acts");
      var pinB = el("button", "go plain tiny", "New PIN");
      pinB.type = "button";
      pinB.addEventListener("click", function () { resetPin(s, false); });
      td.appendChild(pinB);
      if (s.locked_at || s.failed_attempts) {
        var unB = el("button", "go plain tiny", "Unlock");
        unB.type = "button";
        unB.addEventListener("click", function () { resetPin(s, true); });
        td.appendChild(unB);
      }
      var rmB = el("button", "go plain tiny danger", "Remove");
      rmB.type = "button";
      rmB.addEventListener("click", function () { removeStudent(s, rmB); });
      td.appendChild(rmB);
      tr.appendChild(td);
      tb.appendChild(tr);
      sel.appendChild(new Option(s.username, s.id));
    });
    /* the print copy: usernames with a blank for the name, no PINs */
    var pr = $("rosterPrint");
    clear(pr);
    pr.appendChild(el("p", "sheet-title", current.name + ", roster printed " + today() + ". Write each student's name beside the username. Keep this sheet with you; it is the only place the names live."));
    var t = el("table", "sheet-table");
    var th = el("thead"); var hr = el("tr");
    ["Student (write the name)", "Username", "Notes"].forEach(function (h) { hr.appendChild(el("th", "", h)); });
    th.appendChild(hr); t.appendChild(th);
    var body = el("tbody");
    students.forEach(function (s) {
      var tr = el("tr");
      tr.appendChild(el("td", "blank", ""));
      tr.appendChild(el("td", "mono", s.username));
      tr.appendChild(el("td", "blank", ""));
      body.appendChild(tr);
    });
    t.appendChild(body);
    pr.appendChild(t);
  }
  function resetPin(s, unlockOnly) {
    if (!unlockOnly && !window.confirm("Give " + s.username + " a new PIN? The old one stops working right away.")) { return; }
    say("cd-msg", "One moment.");
    fn("reset-pin", {student_id: s.id, unlock_only: !!unlockOnly}).then(function (r) {
      if (unlockOnly) { say("cd-msg", r.username + " is unlocked. The PIN is the same."); loadStudents(); return; }
      showSheet([{username: r.username, pin: r.pin}], "PIN reset");
      say("cd-msg", "New PIN for " + r.username + ". It is on the sheet above; it will not show again.");
      loadStudents();
    }).catch(function (e) { say("cd-msg", e.message, true); });
  }
  function removeStudent(s, btn) {
    if (!window.confirm("Remove " + s.username + " and every score under it? This cannot be undone.")) { return; }
    btn.disabled = true;
    fn("remove-student", {student_id: s.id}).then(function () {
      say("cd-msg", s.username + " removed.");
      loadStudents();
    }).catch(function (e) { btn.disabled = false; say("cd-msg", e.message, true); });
  }

  /*  add students */
  $("addStudentsBtn").addEventListener("click", function () {
    $("addStudentsForm").hidden = false;
    $("as-count").focus();
  });
  $("as-cancel").addEventListener("click", function () { $("addStudentsForm").hidden = true; });
  $("addStudentsForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseInt($("as-count").value, 10);
    if (!(n >= 1 && n <= 60)) { say("cd-msg", "Between 1 and 60 at a time.", true); return; }
    var btn = ev.target.querySelector("button[type=submit]");
    btn.disabled = true;
    say("cd-msg", "Making " + n + " logins. This takes a few seconds.");
    fn("create-students", {class_id: current.id, count: n}).then(function (r) {
      btn.disabled = false;
      $("addStudentsForm").hidden = true;
      showSheet(r.students || [], "logins made");
      var msg = (r.students || []).length + " logins made.";
      if (r.failed && r.failed.length) { msg += " Could not make: " + r.failed.join(", ") + "."; }
      say("cd-msg", msg, !!(r.failed && r.failed.length));
      loadStudents();
    }).catch(function (e) { btn.disabled = false; say("cd-msg", e.message, true); });
  });
  function showSheet(rows, what) {
    $("ps-class").textContent = current.name;
    $("ps-date").textContent = today() + " (" + what + ")";
    $("ps-site").textContent = location.host + "/signin.html";
    var tb = $("ps-rows");
    clear(tb);
    rows.forEach(function (r) {
      var tr = el("tr");
      tr.appendChild(el("td", "blank", ""));
      tr.appendChild(el("td", "mono", r.username));
      tr.appendChild(el("td", "mono pin", r.pin));
      tb.appendChild(tr);
    });
    $("newLogins").hidden = false;
    $("newLogins").scrollIntoView({behavior: "smooth", block: "start"});
  }
  $("closeSheetBtn").addEventListener("click", function () {
    if (window.confirm("Hide the sheet? The PINs on it will not show again.")) {
      clear($("ps-rows"));
      $("newLogins").hidden = true;
    }
  });
  function printOnly(mode) {
    document.body.setAttribute("data-print", mode);
    var done = function () { document.body.removeAttribute("data-print"); window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    window.print();
    setTimeout(done, 2000);
  }
  $("printSheetBtn").addEventListener("click", function () { printOnly("sheet"); });
  $("printRosterBtn").addEventListener("click", function () { printOnly("roster"); });

  /*  weak lessons */
  function drawWeak() {
    var tb = $("weakRows");
    clear(tb);
    var by = {};
    scores.forEach(function (r) {
      if (!(r.max > 0)) { return; }
      var code = lessonOf(r.lesson, r.game);
      var w = by[code] || (by[code] = {plays: 0, sum: 0, games: {}});
      w.plays += 1; w.sum += pct(r.score, r.max); w.games[r.game] = true;
    });
    var rows = Object.keys(by).map(function (code) { return {code: code, plays: by[code].plays, avg: Math.round(by[code].sum / by[code].plays), games: Object.keys(by[code].games)}; })
      .filter(function (w) { return w.plays >= 3; })
      .sort(function (a, b) { return a.avg - b.avg || b.plays - a.plays; });
    $("noWeak").hidden = rows.length > 0;
    rows.forEach(function (w) {
      var tr = el("tr", w.avg < 60 ? "low" : (w.avg < 75 ? "mid" : ""));
      var td = el("td");
      var l = CAT.lessons[w.code];
      if (l && l.page) {
        var a = el("a", "", lessonLabel(w.code));
        a.href = auth.base + l.page;
        td.appendChild(a);
      } else { td.textContent = lessonLabel(w.code); }
      tr.appendChild(td);
      tr.appendChild(el("td", "num", String(w.plays)));
      tr.appendChild(el("td", "num", w.avg + "%"));
      tr.appendChild(el("td", "", w.games.map(gameTitle).join(", ")));
      tb.appendChild(tr);
    });
  }

  /*  scores by game */
  function drawScores() {
    var tb = $("scoreRows");
    clear(tb);
    var pick = $("scoreWho").value;
    var name = {};
    students.forEach(function (s) { name[s.id] = s.username; });
    var by = {};
    scores.forEach(function (r) {
      if (pick && r.student_id !== pick) { return; }
      var k = r.student_id + "|" + r.game;
      var b = by[k] || (by[k] = {student: r.student_id, game: r.game, lesson: lessonOf(r.lesson, r.game), best: -1, plays: 0, last: ""});
      b.plays += 1;
      var p = pct(r.score, r.max);
      if (p > b.best) { b.best = p; }
      if (!b.last || r.played_at > b.last) { b.last = r.played_at; }
    });
    var rows = Object.keys(by).map(function (k) { return by[k]; })
      .sort(function (a, b) { return (name[a.student] || "").localeCompare(name[b.student] || "") || gameTitle(a.game).localeCompare(gameTitle(b.game)); });
    $("noScores").hidden = rows.length > 0;
    rows.forEach(function (b) {
      var tr = el("tr");
      tr.appendChild(el("td", "mono", name[b.student] || ""));
      tr.appendChild(el("td", "", gameTitle(b.game)));
      tr.appendChild(el("td", "", b.lesson ? "Lesson " + b.lesson : ""));
      tr.appendChild(el("td", "num", b.best >= 0 ? b.best + "%" : ""));
      tr.appendChild(el("td", "num", String(b.plays)));
      tr.appendChild(el("td", "", dateOf(b.last)));
      tb.appendChild(tr);
    });
  }
  $("scoreWho").addEventListener("change", drawScores);
}());

/* Life Skills Arcade: the sign in layer (D72, D73, D62).
   Loaded by every page. Does nothing at all until js/config.js names a
   backend. Then: a Sign in link in the menu; for a signed in teacher, the
   tests and the handout keys appear in place and a Class link joins the
   menu; for a signed in student, the score hook posts to the backend when
   the posting flag is on. Plain ES5, no build step. Storage: only what
   supabase-js keeps for the session, in this browser. */
(function () {
  "use strict";
  var cfg = window.LSA_CONFIG || {};
  var LSA = window.LSA = window.LSA || {};
  var tag = document.currentScript;
  var base = (tag && tag.getAttribute("data-base")) || "";
  var ready = !!(cfg.supabaseUrl && cfg.anonKey);
  var ref = ready ? (cfg.supabaseUrl.replace(/^https?:\/\//, "").split(".")[0]) : "";
  var storageKey = "sb-" + ref + "-auth-token";
  var client = null;
  var who = null;   /* {role: "teacher"|"student", user, teacher?, username?, student_id?, class_id?} */

  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tagName, cls, text) {
    var e = document.createElement(tagName);
    if (cls) { e.className = cls; }
    if (text != null) { e.textContent = text; }
    return e;
  }
  function page() { return (location.pathname.split("/").pop() || "index.html").toLowerCase(); }
  function hasSession() {
    try { return !!window.localStorage.getItem(storageKey); } catch (e) { return false; }
  }
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = function () { cb(null); };
    s.onerror = function () { cb(new Error("could not load " + src)); };
    document.head.appendChild(s);
  }
  function fnUrl(name) { return cfg.supabaseUrl.replace(/\/$/, "") + "/functions/v1/" + name; }

  /* call an edge function; token is the teacher JWT or nothing */
  function callFn(name, body, token, asText) {
    return fetch(fnUrl(name), {
      method: "POST",
      headers: {"Content-Type": "application/json", "apikey": cfg.anonKey,
                "Authorization": "Bearer " + (token || cfg.anonKey)},
      body: JSON.stringify(body || {})
    }).then(function (r) {
      if (asText) { return r.ok ? r.text() : r.json().then(function (j) { throw new Error(j.error || r.statusText); }); }
      return r.json().then(function (j) { if (!r.ok) { var e = new Error(j.error || r.statusText); e.data = j; e.status = r.status; throw e; } return j; });
    });
  }

  /*  the menu */
  function navList() { var n = q("#siteNav ul"); return n; }
  function addNav(text, href, extraClass, first) {
    var ul = navList();
    if (!ul) { return null; }
    var li = el("li");
    var a = el("a", extraClass || "", text);
    if (href) { a.href = base + href; } else { a.href = "#"; }
    li.appendChild(a);
    if (first && ul.firstChild) { ul.insertBefore(li, ul.firstChild); } else { ul.appendChild(li); }
    return a;
  }
  function drawNav() {
    qa("#siteNav li.lsa-auth").forEach(function (li) { li.parentNode.removeChild(li); });
    var ul = navList();
    if (!ul) { return; }
    function item(text, href, onClick) {
      var a = addNav(text, href, "lsa-auth-link");
      if (a) { a.parentNode.className = "lsa-auth"; if (onClick) { a.addEventListener("click", onClick); } }
      return a;
    }
    if (who && who.role === "teacher") {
      item("Class", "class.html");
      item("Sign out (" + (who.teacher.display_name || who.user.email || "teacher") + ")", null, signOut);
    } else if (who && who.role === "student") {
      item("Sign out (" + who.username + ")", null, signOut);
    } else {
      item("Sign in", "signin.html");
    }
  }
  function signOut(ev) {
    if (ev) { ev.preventDefault(); }
    if (!client) { return; }
    client.auth.signOut().then(function () { location.href = base + "index.html"; });
  }

  /*  who is signed in */
  function resolveWho(session) {
    if (!session || !session.user) { who = null; return Promise.resolve(null); }
    var u = session.user;
    var meta = u.user_metadata || {};
    if (meta.kind === "student") {
      return client.from("students").select("id, class_id, username").eq("auth_user_id", u.id).maybeSingle()
        .then(function (r) {
          who = r.data ? {role: "student", user: u, username: r.data.username, student_id: r.data.id, class_id: r.data.class_id}
                       : {role: "student", user: u, username: meta.username || "student"};
          return who;
        });
    }
    return client.from("teachers").select("id, email, display_name, is_admin").eq("id", u.id).maybeSingle()
      .then(function (r) {
        who = r.data ? {role: "teacher", user: u, teacher: r.data} : null;
        return who;
      });
  }

  /*  a teacher: the tests and the keys appear in place (D73) */
  function signedUrl(path) {
    return client.auth.getSession().then(function (s) {
      var token = s.data && s.data.session ? s.data.session.access_token : null;
      return callFn("teacher-file", {path: path}, token);
    });
  }
  function fetchPrivateText(path) {
    return client.auth.getSession().then(function (s) {
      var token = s.data && s.data.session ? s.data.session.access_token : null;
      return callFn("teacher-file", {path: path, text: true}, token, true);
    });
  }
  function openPrivate(path, btn) {
    btn.disabled = true;
    signedUrl(path).then(function (r) {
      btn.disabled = false;
      window.open(r.url, "_blank", "noopener");
    }).catch(function (e) { btn.disabled = false; alert("Could not open the file: " + e.message); });
  }
  function fileButtons(stem, label) {
    var wrap = el("span", "lsa-private-files");
    [[".pdf", "PDF"], [".docx", "Word"]].forEach(function (pair) {
      var b = el("button", "dl lsa-private", (label ? label + " " : "") + pair[1]);
      b.type = "button";
      b.addEventListener("click", function () { openPrivate(stem + pair[0], b); });
      wrap.appendChild(b);
    });
    return wrap;
  }
  function unlockTeacher() {
    document.documentElement.classList.add("lsa-teacher");
    /* gate links: an assessment or a handout key */
    qa("a.gated[data-private]").forEach(function (a) {
      var stem = a.getAttribute("data-private");
      var kind = a.getAttribute("data-kind") || "file";
      var wrap = el("span", "lsa-unlocked");
      if (kind === "assessment") {
        var read = el("button", "dl lsa-private", "Read on the page");
        read.type = "button";
        read.addEventListener("click", function () {
          read.disabled = true;
          fetchPrivateText("html/" + stem + ".html").then(function (html) {
            /* the whole test goes under the list it was listed in, not inside
               the row, so the row keeps its shape */
            var box = el("div", "doc lsa-private-doc");
            box.innerHTML = html;
            var inner = box.firstChild;
            var title = (inner && inner.getAttribute && inner.getAttribute("data-title")) || stem.split("/").pop();
            var bar = el("div", "lsa-private-bar");
            bar.appendChild(el("strong", "", title));
            var hide = el("button", "dl lsa-private", "Hide");
            hide.type = "button";
            hide.addEventListener("click", function () {
              box.parentNode.removeChild(box);
              read.disabled = false;
              read.hidden = false;
            });
            bar.appendChild(hide);
            box.insertBefore(bar, box.firstChild);
            var list = (wrap.closest && (wrap.closest("ul") || wrap.closest("li"))) || wrap.parentNode;
            list.parentNode.insertBefore(box, list.nextSibling);
            read.hidden = true;
          }).catch(function (e) { read.disabled = false; alert("Could not load it: " + e.message); });
        });
        wrap.appendChild(read);
      }
      wrap.appendChild(fileButtons(stem, kind === "assessment" ? "" : "With key"));
      a.parentNode.replaceChild(wrap, a);
    });
    /* the handout page: the key section, on the page */
    qa(".gated-note[data-key]").forEach(function (note) {
      var keyPath = note.getAttribute("data-key");
      var stem = note.getAttribute("data-private");
      note.textContent = "";
      var b = el("button", "dl lsa-private", "Show the teacher key");
      b.type = "button";
      b.addEventListener("click", function () {
        b.disabled = true;
        fetchPrivateText(keyPath).then(function (html) {
          var box = el("div", "lsa-private-key");
          box.innerHTML = html;
          note.parentNode.insertBefore(box, note.nextSibling);
          b.parentNode.removeChild(b);
        }).catch(function (e) { b.disabled = false; alert("Could not load the key: " + e.message); });
      });
      note.appendChild(b);
      if (stem) { note.appendChild(fileButtons(stem, "With key")); }
    });
  }

  /*  a student: the score hook posts when the flag is on (D62) */
  function armStudent() {
    document.documentElement.classList.add("lsa-student");
    LSA.postEnabled = cfg.postScores === true && !!(who && who.student_id);
    LSA.post = function (rec) {
      if (!client || !who || !who.student_id) { return; }
      client.from("scores").insert({
        student_id: who.student_id, game: rec.game, lesson: rec.lesson,
        score: rec.score, max: rec.max, rounds: rec.rounds
      }).then(function (r) { if (r.error) { /* the backend never breaks a game */ } });
    };
  }

  /*  start */
  function withClient(cb) {
    if (client) { cb(null); return; }
    if (window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(cfg.supabaseUrl, cfg.anonKey);
      cb(null); return;
    }
    loadScript(base + "js/supabase.js?v=" + (cfg.version || "1"), function (err) {
      if (err || !window.supabase) { cb(err || new Error("no client")); return; }
      client = window.supabase.createClient(cfg.supabaseUrl, cfg.anonKey);
      cb(null);
    });
  }

  function init() {
    if (!ready) { return; }
    var p = page();
    var needsClient = hasSession() || p === "signin.html" || p === "class.html";
    if (!needsClient) { drawNav(); return; }
    withClient(function (err) {
      if (err) { drawNav(); return; }
      client.auth.getSession().then(function (s) {
        return resolveWho(s.data ? s.data.session : null);
      }).then(function () {
        drawNav();
        if (who && who.role === "teacher") { unlockTeacher(); }
        if (who && who.role === "student") { armStudent(); }
        if (typeof LSA.onAuth === "function") { LSA.onAuth(who, client); }
      }).catch(function () { drawNav(); });
    });
  }

  /* what the sign in and class pages need */
  LSA.auth = {
    ready: ready,
    client: function () { return client; },
    who: function () { return who; },
    withClient: withClient,
    callFn: callFn,
    base: base,
    signOut: signOut,
    /* the student door: username and PIN to the edge function, then a real session */
    studentSignIn: function (username, pin) {
      return callFn("student-login", {username: username, pin: pin}).then(function (r) {
        return client.auth.setSession({access_token: r.access_token, refresh_token: r.refresh_token}).then(function () { return r; });
      });
    },
    teacherSignIn: function (email, password) {
      return client.auth.signInWithPassword({email: email, password: password}).then(function (r) {
        if (r.error) { throw r.error; }
        return r.data;
      });
    },
    teacherSignUp: function (email, password, name) {
      return client.auth.signUp({email: email, password: password,
        options: {data: {terms_accepted: "true", display_name: name || ""}}}).then(function (r) {
        if (r.error) { throw r.error; }
        return r.data;
      });
    }
  };

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
}());

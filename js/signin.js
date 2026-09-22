/* The sign in page (D72). Two doors on one page: a student with a username
   and a PIN, a teacher with an email and a password, plus the create account
   form and the password reset. All calls go through LSA.auth in auth.js.
   Plain ES5. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  var auth = LSA.auth;
  function $(id) { return document.getElementById(id); }
  var base = (auth && auth.base) || "";

  if (!auth || !auth.ready) {
    var off = $("authOff");
    if (off) { off.hidden = false; }
    var doors = $("doors");
    if (doors) { doors.classList.add("is-off"); }
    return;
  }

  function say(id, text, bad) {
    var p = $(id);
    if (!p) { return; }
    p.textContent = text || "";
    p.className = "form-msg" + (bad ? " bad" : "") + (text ? " show" : "");
  }
  function busy(btn, on, label) {
    btn.disabled = !!on;
    if (label) { btn.textContent = label; }
  }
  function next(who) {
    if (who && who.role === "teacher") { location.href = base + "class.html"; }
    else { location.href = base + "games/index.html"; }
  }

  /* already signed in: straight through */
  LSA.onAuth = function (who) {
    var fromEmail = /type=recovery/.test(location.hash) || /type=recovery/.test(location.search);
    if (who && !recovering && !fromEmail) { next(who); }
  };

  /*  students */
  var sForm = $("studentForm");
  sForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var u = $("s-user").value.trim().toLowerCase();
    var p = $("s-pin").value.trim();
    if (!/^[a-z0-9-]{3,40}$/.test(u)) { say("s-msg", "Type the username your teacher gave you, like facs-6a-17.", true); return; }
    if (!/^\d{4}$/.test(p)) { say("s-msg", "The PIN is four numbers.", true); return; }
    var go = $("s-go");
    busy(go, true, "One moment");
    say("s-msg", "");
    auth.withClient(function (err) {
      if (err) { busy(go, false, "Sign in and play"); say("s-msg", "Could not reach the sign in. Check the internet and try again.", true); return; }
      auth.studentSignIn(u, p).then(function () {
        say("s-msg", "Signed in. Off to the games.");
        location.href = base + "games/index.html";
      }).catch(function (e) {
        busy(go, false, "Sign in and play");
        var msg = e.message || "That did not work.";
        var left = e.data ? (typeof e.data.tries_left === "number" ? e.data.tries_left : e.data.attempts_left) : null;
        if (typeof left === "number" && left > 0 && !(e.data && e.data.locked)) {
          msg += " " + left + (left === 1 ? " try" : " tries") + " left.";
        }
        say("s-msg", msg, true);
      });
    });
  });

  /*  teachers: the two tabs */
  var mode = "in";
  var tabIn = $("tab-in"), tabNew = $("tab-new");
  function setMode(m) {
    mode = m;
    var isNew = m === "new";
    tabIn.classList.toggle("on", !isNew);
    tabNew.classList.toggle("on", isNew);
    tabIn.setAttribute("aria-selected", isNew ? "false" : "true");
    tabNew.setAttribute("aria-selected", isNew ? "true" : "false");
    $("t-h").textContent = isNew ? "New teacher account" : "Teachers";
    $("t-who").textContent = isNew
      ? "Any teacher may make an account. Students never make their own; you create them from your Class page."
      : "Sign in to see your classes, the tests and the answer keys.";
    $("t-name-field").hidden = !isNew;
    $("t-terms").hidden = !isNew;
    $("t-pass-hint").hidden = !isNew;
    $("t-go").textContent = isNew ? "Create account" : "Sign in";
    $("t-pass").setAttribute("autocomplete", isNew ? "new-password" : "current-password");
    $("t-forgot").hidden = isNew;
    say("t-msg", "");
  }
  tabIn.addEventListener("click", function () { setMode("in"); });
  tabNew.addEventListener("click", function () { setMode("new"); });

  $("teacherForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var email = $("t-email").value.trim();
    var pass = $("t-pass").value;
    var go = $("t-go");
    if (!email || !pass) { say("t-msg", "Email and password, please.", true); return; }
    if (mode === "new") {
      if (pass.length < 8) { say("t-msg", "Use at least eight characters.", true); return; }
      if (!$("t-agree").checked) { say("t-msg", "Please read and tick the terms first.", true); return; }
    }
    busy(go, true, "One moment");
    say("t-msg", "");
    auth.withClient(function (err) {
      if (err) { busy(go, false, mode === "new" ? "Create account" : "Sign in"); say("t-msg", "Could not reach the sign in. Check the internet and try again.", true); return; }
      var p = mode === "new"
        ? auth.teacherSignUp(email, pass, $("t-name").value.trim())
        : auth.teacherSignIn(email, pass);
      p.then(function (data) {
        if (mode === "new" && !(data && data.session)) {
          busy(go, false, "Create account");
          say("t-msg", "Account made. Check your email for the confirmation link, then come back and sign in.");
          return;
        }
        say("t-msg", "Signed in.");
        location.href = base + "class.html";
      }).catch(function (e) {
        busy(go, false, mode === "new" ? "Create account" : "Sign in");
        var msg = e.message || "That did not work.";
        if (/invalid login/i.test(msg)) { msg = "That email and password do not match."; }
        if (/already registered/i.test(msg)) { msg = "There is already an account for that email. Sign in instead."; }
        if (/terms must be accepted/i.test(msg)) { msg = "Please tick the terms first."; }
        say("t-msg", msg, true);
      });
    });
  });

  /*  forgot: an email with a link back to this page */
  $("t-forgot").addEventListener("click", function (ev) {
    ev.preventDefault();
    var email = $("t-email").value.trim();
    if (!email) { say("t-msg", "Type your email first, then click Forgot your password.", true); $("t-email").focus(); return; }
    auth.withClient(function (err) {
      if (err) { say("t-msg", "Could not reach the sign in. Check the internet and try again.", true); return; }
      var back = location.href.split("#")[0].split("?")[0];
      auth.client().auth.resetPasswordForEmail(email, {redirectTo: back}).then(function (r) {
        if (r.error) { say("t-msg", r.error.message, true); return; }
        say("t-msg", "If that email has an account, a reset link is on its way.");
      });
    });
  });

  /*  the link in that email lands here with a recovery token */
  var recovering = false;
  auth.withClient(function (err) {
    if (err) { return; }
    auth.client().auth.onAuthStateChange(function (event) {
      if (event === "PASSWORD_RECOVERY") {
        recovering = true;
        $("teacherForm").hidden = true;
        $("resetForm").hidden = false;
        setMode("in");
        $("t-h").textContent = "Reset your password";
      }
    });
  });
  $("resetForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var pass = $("r-pass").value;
    if (pass.length < 8) { say("r-msg", "Use at least eight characters.", true); return; }
    auth.client().auth.updateUser({password: pass}).then(function (r) {
      if (r.error) { say("r-msg", r.error.message, true); return; }
      say("r-msg", "Saved. Taking you to your classes.");
      location.href = base + "class.html";
    });
  });
}());

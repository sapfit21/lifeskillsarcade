/* Site behaviour. Plain JavaScript, no dependencies, no network calls.
   1. The header menu button on narrow screens.
   2. The lesson table filter, working over the HTML already on the page.
   3. Marking the table of contents entry for the section you are reading. */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var table = document.getElementById("lessonTable");
  if (table) {
    var unitSel = document.getElementById("unitFilter");
    var textIn = document.getElementById("textFilter");
    var clear = document.getElementById("clearFilter");
    var count = document.getElementById("filterCount");
    var noMatch = document.getElementById("noMatch");
    var rows = [].slice.call(table.tBodies[0].rows);

    function apply() {
      var unit = unitSel ? unitSel.value : "";
      var q = textIn ? textIn.value.trim().toLowerCase() : "";
      var shown = 0;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var ok = true;
        if (unit && row.getAttribute("data-unit") !== unit) { ok = false; }
        if (ok && q) {
          var hay = row.getAttribute("data-search") || "";
          var words = q.split(/\s+/);
          for (var w = 0; w < words.length; w++) {
            if (hay.indexOf(words[w]) === -1) { ok = false; break; }
          }
        }
        row.hidden = !ok;
        if (ok) { shown++; }
      }
      if (count) {
        count.textContent = shown === rows.length
          ? rows.length + " lessons"
          : shown + " of " + rows.length + " lessons";
      }
      if (noMatch) { noMatch.hidden = shown !== 0; }
    }

    if (unitSel) { unitSel.addEventListener("change", apply); }
    if (textIn) { textIn.addEventListener("input", apply); }
    if (clear) {
      clear.addEventListener("click", function () {
        if (unitSel) { unitSel.value = ""; }
        if (textIn) { textIn.value = ""; }
        apply();
      });
    }
    apply();
  }

  var toc = document.querySelector(".toc");
  if (toc && "IntersectionObserver" in window) {
    var links = {};
    var targets = [];
    [].forEach.call(toc.querySelectorAll("a[href^='#']"), function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) { links[id] = a; targets.push(el); }
    });
    var seen = [];
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id;
        var at = seen.indexOf(id);
        if (en.isIntersecting && at === -1) { seen.push(id); }
        if (!en.isIntersecting && at !== -1) { seen.splice(at, 1); }
      });
      for (var id in links) { links[id].classList.remove("here"); }
      if (seen.length) {
        var first = null;
        for (var i = 0; i < targets.length; i++) {
          if (seen.indexOf(targets[i].id) !== -1) { first = targets[i].id; break; }
        }
        if (first && links[first]) { links[first].classList.add("here"); }
      }
    }, { rootMargin: "-72px 0px -70% 0px" });
    targets.forEach(function (t) { obs.observe(t); });
  }
}());

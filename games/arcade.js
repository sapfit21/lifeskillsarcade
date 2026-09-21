/* Life Skills Arcade: the score hook. Loaded by every game page.
   LSA.report({game, lesson, score, max, rounds}) is called once by each game at
   its end panel. It does two things (D62, D67):
   1. Always keeps the result on this device: LSA.last on the page, and the
      last 200 results in local storage under lsa.results. A locked down
      school browser can refuse storage; that never breaks a game.
   2. Posts the result to the backend only when LSA.postEnabled is true and
      LSA.post exists. The flag is off until the school agreement is signed
      (D79). The sign in script sets both when the time comes. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  LSA.last = null;
  LSA.postEnabled = LSA.postEnabled === true;
  LSA.report = function (result) {
    var r = result || {};
    var rec = {
      game: String(r.game || ""),
      lesson: String(r.lesson || ""),
      score: Number(r.score) || 0,
      max: Number(r.max) || 0,
      rounds: Number(r.rounds) || 0,
      when: new Date().toISOString()
    };
    LSA.last = rec;
    try {
      var store = window.localStorage;
      if (store) {
        store.setItem("lsa.last", JSON.stringify(rec));
        var all = [];
        try { all = JSON.parse(store.getItem("lsa.results") || "[]") || []; } catch (e1) { all = []; }
        if (Object.prototype.toString.call(all) !== "[object Array]") { all = []; }
        all.push(rec);
        if (all.length > 200) { all = all.slice(all.length - 200); }
        store.setItem("lsa.results", JSON.stringify(all));
      }
    } catch (e2) {
      /* storage refused: the game keeps its end panel and moves on */
    }
    if (LSA.postEnabled && typeof LSA.post === "function") {
      try { LSA.post(rec); } catch (e3) { /* the backend never breaks a game */ }
    }
    return rec;
  };
  window.LSA = LSA;
}());

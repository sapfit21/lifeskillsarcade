/* Life Skills Arcade: the score hook. Loaded by every game page.
   LSA.report({game, lesson, score, max, rounds}) is called once by each game at
   its end panel. Today it does nothing but keep the last result in a variable
   on the page (window.LSA.last). Nothing is stored, nothing is sent (D31).
   Next week's login and tracking system plugs into this one function. */
(function () {
  "use strict";
  var LSA = window.LSA || {};
  LSA.last = null;
  LSA.report = function (result) {
    var r = result || {};
    LSA.last = {
      game: String(r.game || ""),
      lesson: String(r.lesson || ""),
      score: Number(r.score) || 0,
      max: Number(r.max) || 0,
      rounds: Number(r.rounds) || 0,
      when: new Date().toISOString()
    };
    return LSA.last;
  };
  window.LSA = LSA;
}());

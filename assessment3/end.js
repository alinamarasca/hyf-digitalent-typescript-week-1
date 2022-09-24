"use strict";
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });
const mostRecentScore = localStorage.getItem("mostRecentScore");
// const MAX_HIGH_SCORES = 5;
// const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const finalScoreText = document.getElementById("finalScore");
finalScoreText.innerText = mostRecentScore ? mostRecentScore : "";
console.log(mostRecentScore);
//# sourceMappingURL=end.js.map
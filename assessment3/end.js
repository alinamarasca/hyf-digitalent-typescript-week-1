const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });
const mostRecentScore = localStorage.getItem("mostRecentScore");
// const MAX_HIGH_SCORES = 5;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const finalScoreText = document.getElementById("finalScore");
finalScoreText.innerText = mostRecentScore;

console.log(mostRecentScore);
// saveHighScore = e => {
//   e.preventDefault();

//   const score = {
//     score: Math.floor(Math.random() * 100),
//     name: username.value
//   };
//   highScores.push(score);

//   highScores.sort((a, b) => {
//     return b.score - a.score;
//   });

//   highScores.splice(5);

//   localStorage.setItem("highScores", JSON.stringify(highScores));
//   window.location.assign("/");
// };

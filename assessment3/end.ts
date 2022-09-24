const username = document.getElementById("username") as HTMLElement | null;
const saveScoreBtn = document.getElementById(
  "saveScoreBtn"
) as HTMLElement | null;
// username.addEventListener("keyup", () => {
//   saveScoreBtn.disabled = !username.value;
// });
const mostRecentScore = localStorage.getItem("mostRecentScore");
// const MAX_HIGH_SCORES = 5;
// const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const finalScoreText = document.getElementById(
  "finalScore"
) as HTMLElement | null;

finalScoreText!.innerText = mostRecentScore ? mostRecentScore : "";

console.log(mostRecentScore);

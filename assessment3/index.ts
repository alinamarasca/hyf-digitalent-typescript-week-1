// import { IQuestion } from "./IQuestion";

async function loadQuestions() {
  let url = "https://the-trivia-api.com/api/questions";
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.res[0]);
  return data.res[0];
}
loadQuestions();

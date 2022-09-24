//
var difficulty;
(function (difficulty) {
  difficulty["easy"] = "1";
  difficulty["medium"] = "2";
  difficulty["hard"] = "3";
})(difficulty || (difficulty = {}));
//
const question = document.getElementById("question");
const category = document.getElementById("category");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
// const answersText = document.getElementById("answers") as HTMLElement | null;
let currentQuestion;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// let questions: IQuestion[] = [];
let userAnswer = "";
let correctAnswer = "";
fetch("https://the-trivia-api.com/api/questions")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    // filter out film and tv
    loadedQuestions.filter(q => q.category !== "Film & TV");
    // sort by difficulty
    // replace on numbers
    loadedQuestions.map(q => {
      if (q.difficulty === "easy") {
        q.difficulty = difficulty.easy;
      }
      if (q.difficulty === "medium") {
        q.difficulty = difficulty.medium;
      }
      if (q.difficulty === "hard") {
        q.difficulty = difficulty.hard;
      }
      //sort
      loadedQuestions.sort((a, b) => a.difficulty - b.difficulty);
      console.log(loadedQuestions);
      startGame(loadedQuestions);
    });
    // .catch(err => {
    //   console.log(err);
  });
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
const startGame = questions => {
  questionCounter = 0;
  score = 0;
  // filter out film and tv
  const filteredQuestions = [...questions].filter(
    q => q.category !== "Film & TV"
  );
  console.log(questions);
  availableQuestions = [...filteredQuestions];
  getNewQuestion();
};
const getNewQuestion = () => {
  // keep score
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", String(score));
    return window.location.assign("/end.html");
  }
  // counter up
  questionCounter++;
  // keep track
  questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
  // randomize questions
  // const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // currentQuestion = availableQuestions[questionIndex];
  currentQuestion = availableQuestions[questionCounter - 1];
  correctAnswer = currentQuestion.correctAnswer;
  console.log("correct", correctAnswer);
  // dismember question
  question.innerText = currentQuestion.question;
  category.innerText = currentQuestion.category;
  // mix answers
  const answers = [
    currentQuestion.correctAnswer,
    ...currentQuestion.incorrectAnswers
  ]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  choices.forEach((choice, index) => {
    choice.innerText = answers[index];
  });
  availableQuestions.splice(questionCounter, 1);
  acceptingAnswers = true;
};
// when user answers
choices.forEach(choice =>
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    userAnswer = choice.innerText;
    console.log(userAnswer);
    console.log("selected", userAnswer, "correct", correctAnswer);
    acceptingAnswers = false;
    const selectedAnswer = e.target;
    const answerParent = selectedAnswer.parentElement;
    console.log(selectedAnswer);
    let classToApply = "";
    if (selectedAnswer.innerText == correctAnswer) {
      classToApply = "correct";
      incrementScore(CORRECT_BONUS);
    } else {
      classToApply = "incorrect";
    }
    answerParent === null || answerParent === void 0
      ? void 0
      : answerParent.classList.add(classToApply);
    setTimeout(() => {
      answerParent === null || answerParent === void 0
        ? void 0
        : answerParent.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  })
);
const incrementScore = num => {
  score = Number(score) + num;
  scoreText.innerText = String(score);
};

//# sourceMappingURL=game.js.map

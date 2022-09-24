const question = document.getElementById("question");
const category = document.getElementById("category");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const answersText = document.getElementById("answers");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

let userAnswer = "";
let correctAnswer = "";

fetch("https://the-trivia-api.com/api/questions")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    // filter out film and tv
    questions = loadedQuestions.filter(q => q.category !== "Film & TV");
    console.log(questions);
    startGame();
  })
  .catch(err => {
    console.log(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // keep score
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  // counter up
  questionCounter++;
  // keep track
  questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
  // randomize questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);

  currentQuestion = availableQuestions[questionIndex];
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

  availableQuestions.splice(questionIndex, 1);

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

    console.log(selectedAnswer);

    let classToApply = "";
    if (selectedAnswer.innerText == correctAnswer) {
      classToApply = "correct";
      incrementScore(CORRECT_BONUS);
    } else {
      classToApply = "incorrect";
    }
    selectedAnswer.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedAnswer.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  })
);
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

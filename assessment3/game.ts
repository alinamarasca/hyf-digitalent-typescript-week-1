import { IQuestion } from "./IQuestion";

const question = document.getElementById("question") as HTMLElement | null;
const category = document.getElementById("category") as HTMLElement | null;
const choices = Array.from(document.getElementsByClassName("choice-text")) as
  | HTMLElement[]
  | null;
const questionCounterText = document.getElementById(
  "questionCounter"
) as HTMLElement | null;
const scoreText = document.getElementById("score") as HTMLElement | null;
// const answersText = document.getElementById("answers") as HTMLElement | null;

let currentQuestion: IQuestion;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions: IQuestion[] = [];
let questions: IQuestion[] = [];

let userAnswer = "";
let correctAnswer = "";

fetch("https://the-trivia-api.com/api/questions")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    // filter out film and tv
    questions = loadedQuestions.filter(
      (q: IQuestion) => q.category !== "Film & TV"
    );
    console.log(questions);
    startGame();
  })
  .catch(err => {
    console.log(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

const startGame = () => {
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
  questionCounterText!.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
  // randomize questions
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);

  currentQuestion = availableQuestions[questionIndex];
  correctAnswer = currentQuestion.correctAnswer;
  console.log("correct", correctAnswer);
  // dismember question
  question!.innerText = currentQuestion.question;
  category!.innerText = currentQuestion.category;
  // mix answers
  const answers = [
    currentQuestion.correctAnswer,
    ...currentQuestion.incorrectAnswers
  ]
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  choices!.forEach((choice, index) => {
    choice.innerText = answers[index];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
// when user answers
choices!.forEach(choice =>
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    userAnswer = choice.innerText;
    console.log(userAnswer);

    console.log("selected", userAnswer, "correct", correctAnswer);
    acceptingAnswers = false;
    const selectedAnswer = e.target as HTMLElement;
    const answerParent = selectedAnswer.parentElement;
    console.log(selectedAnswer);

    let classToApply = "";
    if ((selectedAnswer as HTMLElement).innerText == correctAnswer) {
      classToApply = "correct";
      incrementScore(CORRECT_BONUS);
    } else {
      classToApply = "incorrect";
    }
    answerParent?.classList.add(classToApply);
    setTimeout(() => {
      answerParent?.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  })
);
const incrementScore = (num: number) => {
  score = Number(score) + num;
  scoreText!.innerText = String(score);
};

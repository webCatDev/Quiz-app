"strict mode";

import { questions } from "./questions.js";

console.log(questions);

let current = 0;
let score = 0;
let isGameOver=false;

const goToNext = () => {
  current++;
  renderCurrentQuestion(current);
};

// const goToSpecificQuestion = (spec) => {
//   currentQuestion = spec;
//   renderCurrentQuestion(current);
// };

const clearQuestion = () => (document.body.innerHTML = "");

const createQuizElements = (option = { type, elementClass, text, target }) => {
  const element = document.createElement(option.type);
  element.classList.add(option.elementClass);
  element.textContent = option.text;
  option.target.insertAdjacentElement("beforeend", element);
  return element;
};

const showScore = () => {
    
     createQuizElements({
      type: "p",
      elementClass: "score",
      text: `Your score is ${score} / ${questions.length * 10}`,
      target:document.body
    });

    const restartButton = createQuizElements({
        type:"button",
        elementClass:"restart",
        text:"RestartGame",
        target:document.body
    })

    restartButton.addEventListener("click",()=>{
current = -1;
score=0
clearQuestion()
isGameOver = false
goToNext()
    })

} 

const renderCurrentQuestion = (current) => {
  console.log(current);
  // create question element and answer container
  createQuizElements({
    type: "p",
    elementClass: "question",
    text: questions[current].question,
    target: document.body,
  });
  const answerContainer = createQuizElements({
    type: "div",
    elementClass: "answer-container",
    text: "",
    target: document.body,
  });

  // create answer buttons
  questions[current].answers.forEach((answer) => {
    const button = createQuizElements({
      type: "button",
      elementClass: "answer-btn",
      text: answer.text,
      target: answerContainer,
    });
    button.classList.add(answer.isCorrect ? "correct" : "wrong");
  });

  // handle user's answer
  function handleUserAnswer(e) {
    // game state
    if (current === questions.length - 1) isGameOver = true;
    // check answer
    const clickedElement = e.target;
    if (clickedElement.classList.contains("correct")) {
      clickedElement.style.backgroundColor = "green";
      score += 10;
    } else {
      clickedElement.style.backgroundColor = "red";
    }
    // make buttons unclickable
     [...answerContainer.children].forEach((el) => el.disabled=true)

    // show correct answer and go to next question
    const delay = setTimeout(showCorrectAnswer, 500);

    function showCorrectAnswer() {
      [...answerContainer.children].forEach((el) => {
        if (el.classList.contains("correct")) {
          el.style.backgroundColor = "green";
        }
        clearTimeout(delay);
      });
    }

    const wait = setTimeout(() => {
      clearQuestion();
      isGameOver ? showScore() : goToNext();
      clearTimeout(wait);
    }, 800);

    
  };

  answerContainer.addEventListener("click", handleUserAnswer);
};

renderCurrentQuestion(current);

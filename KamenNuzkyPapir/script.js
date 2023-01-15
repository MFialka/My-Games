const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
let userChoice;
let computerChoice;
let result;

const possibleChoice = document.querySelectorAll("button");

possibleChoice.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoice.length + 1);

  if (randomNumber === 1) {
    computerChoice = "rock";
  }

  if (randomNumber === 2) {
    computerChoice = "scissors";
  }
  if (randomNumber === 3) {
    computerChoice = "paper";
  }

  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (computerChoice === userChoice) {
    result = "It is a draw!";
  }
  if (computerChoice === "rock" && userChoice === "paper") {
    result = "You win!";
  }
  if (computerChoice === "rock" && userChoice === "scissors") {
    result = "You lost!";
  }
  if (computerChoice === "paper" && userChoice === "scissors") {
    result = "You win!";
  }
  if (computerChoice === "paper" && userChoice === "rock") {
    result = "You lost!";
  }
  if (computerChoice === "scissors" && userChoice === "rock") {
    result = "You win!";
  }
  if (computerChoice === "scissors" && userChoice === "paper") {
    result = "You lost!";
  }
  resultDisplay.innerHTML = result;
}

// co dělá inner.HTML
// co dělá math.random
//co dělá querryselectorAll
// co dělá addeventlistener

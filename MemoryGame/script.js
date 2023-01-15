const cardArray = [
  {
    name: "fries",
    img: "images/Fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/Cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/Hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/IceCream.png",
  },
  {
    name: "milkshake",
    img: "images/MilkShake.png",
  },
  {
    name: "pizza",
    img: "images/Pizza.png",
  },
  {
    name: "fries",
    img: "images/Fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/Cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/Hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/IceCream.png",
  },
  {
    name: "milkshake",
    img: "images/MilkShake.png",
  },
  {
    name: "pizza",
    img: "images/Pizza.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardChosen = [];
let cardsChosenId = [];
const cardWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.append(card);
  }
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    alert("You have clicked on the same image!");
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
  }

  if (cardChosen[0] == cardChosen[1]) {
    alert("You found a match!");
    cards[optionOneId].setAttribute("src", "images/White.png");
    cards[optionTwoId].setAttribute("src", "images/White.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardWon.push(cardChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    alert("Sorry try again!");
  }
  resultDisplay.innerHTML = cardWon.length;
  cardChosen = [];
  cardsChosenId = [];

  if (cardWon.length === cardArray.length / 2) {
    resultDisplay.innerHTML = "Congratulations you found them all!";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");

  cardChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
//append? něco asi vkládá
//co dělá querry selector?
//document.createElement?
//set.timeout

const grid = document.querySelector(".grid");
const scoreDispaly = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPostion = ballStart;

//create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all my blocks

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
// draw block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div"); // vytvářím div jako variable je block
    block.classList.add("block"); // přidávám blocku class block
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block); //vytvořil jsem element block, který jsem už v CSS nastyloval
  }
}
addBlocks();

//add user

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//draw the user

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPostion[0] + "px";
  ball.style.bottom = ballCurrentPostion[1] + "px";
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move the ball
function moveBall() {
  ballCurrentPostion[0] += xDirection;
  ballCurrentPostion[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//check for collisions
function checkForCollisions() {
  //chech for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPostion[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPostion[0] < blocks[i].bottomRight[0] &&
      ballCurrentPostion[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPostion[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDispaly.innerHTML = score;

      //chech for win
      if (blocks.length === 0) {
        scoreDispaly.innerHTML = "You win";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  //check for wall collisions
  if (
    ballCurrentPostion[0] >= boardWidth - ballDiameter ||
    ballCurrentPostion[1] >= boardHeight - ballDiameter ||
    ballCurrentPostion[0] <= 0
  ) {
    changeDirection();
  }

  //check for user collisions
  if (
    ballCurrentPostion[0] > currentPosition[0] &&
    ballCurrentPostion[0] < currentPosition[0] + blockWidth &&
    ballCurrentPostion[1] > currentPosition[1] &&
    ballCurrentPostion[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (ballCurrentPostion[1] <= 0) {
    //check for game over
    clearInterval(timerId);
    scoreDispaly.innerHTML = "You lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
  }
}

interface Position {
  x: number;
  y: number;
}

const board = document.getElementById("game-board") as HTMLElement | null;
const instructionText = document.getElementById(
  "instruction-text"
) as HTMLElement | null;
const logo = document.getElementById("logo") as HTMLElement | null;
const score = document.getElementById("score") as HTMLElement | null;
const highScoreText = document.getElementById(
  "highScore"
) as HTMLElement | null;

const gridSize: number = 20;
let snake = [{ x: 10, y: 10 }];
let food: Position = generateFood();
let highScore: number = 0;
let direction: string = "right";
let gameInterval: number;
let gameSpeedDelay: number = 200;
let gameStarted: boolean = false;

function startGame(): void {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

function drawSnake(): void {
  snake.forEach((segment) => {
    const snakeElement: HTMLElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag:string, className:string):HTMLElement {
  const element:HTMLElement = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element: HTMLElement, position: Position): void {
  element.style.gridColumn = position.x.toString();
  element.style.gridRow = position.y.toString();
}


function generateFood(): Position {
  const x: number = Math.floor(Math.random() * gridSize) + 1;
  const y: number = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move(): void {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
}

function handleKeyPress(event: KeyboardEvent): void {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

function checkCollision(): void {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame(): void {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore(): void {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame(): void {
  if (gameInterval !== undefined) {
    clearInterval(gameInterval);
  }
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore(): void {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}
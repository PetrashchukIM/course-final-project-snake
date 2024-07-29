interface Position {
  x: number;
  y: number;
}

const board: HTMLElement | null = document.getElementById("game-board");
const instructionText: HTMLElement | null =
  document.getElementById("instruction-text");
const logo: HTMLElement | null = document.getElementById("logo");
const score: HTMLElement | null = document.getElementById("score");
const highScoreText: HTMLElement | null = document.getElementById("highScore");

const gridSize: number = 50;
let snake = [{ x: 10, y: 10 }];
let food: Position = generateFood();
let highScore: number = 0;
let direction: string = "right";
let gameInterval: number;
let gameSpeedDelay: number = 150;
let gameStarted: boolean = false;

function draw(): void {
  if (board) {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
  }
}

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

function increaseSpeed(): void {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function createGameElement(tag: string, className: string): HTMLElement {
  const element: HTMLElement = document.createElement(tag);
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

function drawFood(): void {
  if (gameStarted) {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
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

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
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
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore(): void {
  const currentScore: number = snake.length - 1;
  const padCurrentScore: string = pad(currentScore, 4);
  score.textContent = padCurrentScore;
}

function pad(num: number, size: number): string {
  let s: string = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function stopGame(): void {
  if (gameInterval !== undefined) {
    clearInterval(gameInterval);
  }
  gameStarted = false;
  instructionText.style.display = "block";
  logo.style.display = "block";
}

function updateHighScore(): void {
  const currentScore: number = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    const padCurrentScore: string = pad(currentScore, 4);
    highScoreText.textContent = padCurrentScore;
  }
  highScoreText.style.display = "block";
}

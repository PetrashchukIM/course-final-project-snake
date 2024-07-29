var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var board = document.getElementById("game-board");
var instructionText = document.getElementById("instruction-text");
var logo = document.getElementById("logo");
var score = document.getElementById("score");
var highScoreText = document.getElementById("highScore");
var gridSize = 20;
var snake = [{ x: 10, y: 10 }];
var food = generateFood();
var highScore = 0;
var direction = "right";
var gameInterval;
var gameSpeedDelay = 200;
var gameStarted = false;
function startGame() {
    gameStarted = true;
    instructionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(function () {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}
function drawSnake() {
    snake.forEach(function (segment) {
        var snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}
function createGameElement(tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
}
function setPosition(element, position) {
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
}
function generateFood() {
    var x = Math.floor(Math.random() * gridSize) + 1;
    var y = Math.floor(Math.random() * gridSize) + 1;
    return { x: x, y: y };
}
function move() {
    var head = __assign({}, snake[0]);
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
function handleKeyPress(event) {
    if ((!gameStarted && event.code === "Space") ||
        (!gameStarted && event.key === " ")) {
        startGame();
    }
    else {
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

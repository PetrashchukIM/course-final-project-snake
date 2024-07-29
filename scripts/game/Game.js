"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer_1 = require("../rendering/Renderer");
var Helpers_1 = require("../utils/Helpers");
var Snake_1 = require("./Snake");
var Food_1 = require("./Food");
var Game = /** @class */ (function () {
    function Game() {
        this.board = document.getElementById("game-board");
        this.instructionText = document.getElementById("instruction-text");
        this.logo = document.getElementById("logo");
        this.score = document.getElementById("score");
        this.highScoreText = document.getElementById("highScore");
        this.gridSize = 50;
        this.snake = new Snake_1.default([{ x: 10, y: 10 }]);
        this.food = new Food_1.default(this.gridSize);
        this.highScore = 0;
        this.direction = "right";
        this.gameSpeedDelay = 150;
        this.gameStarted = false;
        this.renderer = new Renderer_1.Renderer(this.board, this.snake, this.food);
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
    }
    Game.prototype.handleKeyPress = function (event) {
        if ((!this.gameStarted && event.code === "Space") ||
            (!this.gameStarted && event.key === " ")) {
            this.startGame();
        }
        else {
            switch (event.key) {
                case "ArrowUp":
                    this.direction = "up";
                    break;
                case "ArrowDown":
                    this.direction = "down";
                    break;
                case "ArrowLeft":
                    this.direction = "left";
                    break;
                case "ArrowRight":
                    this.direction = "right";
                    break;
            }
        }
    };
    Game.prototype.startGame = function () {
        var _this = this;
        this.gameStarted = true;
        this.instructionText.style.display = "none";
        this.logo.style.display = "none";
        this.gameInterval = window.setInterval(function () {
            _this.move();
            _this.checkCollision();
            _this.renderer.draw();
            _this.updateScore();
        }, this.gameSpeedDelay);
    };
    Game.prototype.move = function () {
        var head = __assign({}, this.snake.getHead());
        switch (this.direction) {
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
        this.snake.move(head);
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.food.generateNewPosition(this.snake.getPositions());
            this.increaseSpeed();
            this.snake.grow();
            this.restartInterval();
        }
    };
    Game.prototype.increaseSpeed = function () {
        if (this.gameSpeedDelay > 150) {
            this.gameSpeedDelay -= 5;
        }
        else if (this.gameSpeedDelay > 100) {
            this.gameSpeedDelay -= 3;
        }
        else if (this.gameSpeedDelay > 50) {
            this.gameSpeedDelay -= 2;
        }
        else if (this.gameSpeedDelay > 25) {
            this.gameSpeedDelay -= 1;
        }
    };
    Game.prototype.restartInterval = function () {
        var _this = this;
        if (this.gameInterval !== undefined) {
            clearInterval(this.gameInterval);
        }
        this.gameInterval = window.setInterval(function () {
            _this.move();
            _this.checkCollision();
            _this.renderer.draw();
            _this.updateScore();
        }, this.gameSpeedDelay);
    };
    Game.prototype.checkCollision = function () {
        var head = this.snake.getHead();
        if (head.x < 1 ||
            head.x > this.gridSize ||
            head.y < 1 ||
            head.y > this.gridSize) {
            this.resetGame();
        }
        if (this.snake.checkSelfCollision()) {
            this.resetGame();
        }
    };
    Game.prototype.resetGame = function () {
        this.updateHighScore();
        this.stopGame();
        this.snake.reset();
        this.food.generateNewPosition(this.snake.getPositions());
        this.direction = "right";
        this.gameSpeedDelay = 150;
        this.updateScore();
    };
    Game.prototype.stopGame = function () {
        if (this.gameInterval !== undefined) {
            clearInterval(this.gameInterval);
        }
        this.gameStarted = false;
        this.instructionText.style.display = "block";
        this.logo.style.display = "block";
    };
    Game.prototype.updateScore = function () {
        var currentScore = this.snake.getLength() - 1;
        var padCurrentScore = (0, Helpers_1.pad)(currentScore, 4);
        if (this.score)
            this.score.textContent = padCurrentScore;
    };
    Game.prototype.updateHighScore = function () {
        var currentScore = this.snake.getLength() - 1;
        if (currentScore > this.highScore) {
            this.highScore = currentScore;
            var padCurrentScore = (0, Helpers_1.pad)(currentScore, 4);
            if (this.highScoreText)
                this.highScoreText.textContent = padCurrentScore;
        }
        if (this.highScoreText)
            this.highScoreText.style.display = "block";
    };
    return Game;
}());
exports.default = Game;

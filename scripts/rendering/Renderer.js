"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
var Helpers_1 = require("../utils/Helpers");
var Renderer = /** @class */ (function () {
    function Renderer(board, snake, food) {
        this.board = board;
        this.snake = snake;
        this.food = food;
    }
    Renderer.prototype.draw = function () {
        if (this.board) {
            this.board.innerHTML = "";
            this.drawSnake();
            this.drawFood();
        }
    };
    Renderer.prototype.drawSnake = function () {
        var _this = this;
        this.snake.getPositions().forEach(function (segment) {
            var snakeElement = (0, Helpers_1.createGameElement)("div", "snake");
            (0, Helpers_1.setPosition)(snakeElement, segment);
            if (_this.board)
                _this.board.appendChild(snakeElement);
        });
    };
    Renderer.prototype.drawFood = function () {
        var foodElement = (0, Helpers_1.createGameElement)("div", "food");
        (0, Helpers_1.setPosition)(foodElement, this.food.position);
        if (this.board)
            this.board.appendChild(foodElement);
    };
    return Renderer;
}());
exports.Renderer = Renderer;

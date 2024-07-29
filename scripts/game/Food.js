"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Food = /** @class */ (function () {
    function Food(gridSize) {
        this.gridSize = gridSize;
        this.position = this.generateFood();
    }
    Food.prototype.generateFood = function () {
        var x = Math.floor(Math.random() * this.gridSize) + 1;
        var y = Math.floor(Math.random() * this.gridSize) + 1;
        return { x: x, y: y };
    };
    Food.prototype.generateNewPosition = function (snakePositions) {
        var _this = this;
        do {
            this.position = this.generateFood();
        } while (snakePositions.some(function (pos) { return pos.x === _this.position.x && pos.y === _this.position.y; }));
    };
    return Food;
}());
exports.default = Food;

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
var Snake = /** @class */ (function () {
    function Snake(initialPositions) {
        this.positions = initialPositions;
    }
    Snake.prototype.move = function (head) {
        this.positions.unshift(head);
        this.positions.pop();
    };
    Snake.prototype.grow = function () {
        var tail = this.positions[this.positions.length - 1];
        this.positions.push(__assign({}, tail));
    };
    Snake.prototype.getHead = function () {
        return this.positions[0];
    };
    Snake.prototype.getPositions = function () {
        return this.positions;
    };
    Snake.prototype.getLength = function () {
        return this.positions.length;
    };
    Snake.prototype.reset = function () {
        this.positions = [{ x: 10, y: 10 }];
    };
    Snake.prototype.checkSelfCollision = function () {
        var head = this.getHead();
        for (var i = 1; i < this.positions.length; i++) {
            if (head.x === this.positions[i].x && head.y === this.positions[i].y) {
                return true;
            }
        }
        return false;
    };
    return Snake;
}());
exports.default = Snake;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameElement = createGameElement;
exports.setPosition = setPosition;
exports.pad = pad;
function createGameElement(tag, className) {
    var element = document.createElement(tag);
    element.className = className;
    return element;
}
function setPosition(element, position) {
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
}
function pad(num, size) {
    var s = num + "";
    while (s.length < size)
        s = "0" + s;
    return s;
}

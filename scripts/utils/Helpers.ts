import { Position } from "../interfaces/Position";

function createGameElement(tag: string, className: string): HTMLElement {
  const element: HTMLElement = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element: HTMLElement, position: Position): void {
  element.style.gridColumn = position.x.toString();
  element.style.gridRow = position.y.toString();
}

function pad(num: number, size: number): string {
  let s: string = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export { createGameElement, setPosition, pad };

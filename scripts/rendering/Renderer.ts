import { Position } from "../interfaces/Position";
import Snake from "../game/Snake";
import Food from "../game/Food";
import { createGameElement, setPosition } from "../utils/Helpers";

class Renderer {
  private board: HTMLElement | null;
  private snake: Snake;
  private food: Food;

  constructor(board: HTMLElement | null, snake: Snake, food: Food) {
    this.board = board;
    this.snake = snake;
    this.food = food;
  }

  public draw(): void {
    if (this.board) {
      this.board.innerHTML = "";
      this.drawSnake();
      this.drawFood();
    }
  }

  private drawSnake(): void {
    this.snake.getPositions().forEach((segment) => {
      const snakeElement: HTMLElement = createGameElement("div", "snake");
      setPosition(snakeElement, segment);
      if (this.board) this.board.appendChild(snakeElement);
    });
  }

  private drawFood(): void {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, this.food.position);
    if (this.board) this.board.appendChild(foodElement);
  }
}

export { Renderer };

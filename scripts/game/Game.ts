import { Position } from "../interfaces/Position";
import { Renderer } from "../rendering/Renderer";
import { createGameElement, setPosition, pad } from "../utils/Helpers";
import Snake from "./Snake";
import Food from "./Food";

class Game {
  private board: HTMLElement | null;
  private instructionText: HTMLElement | null;
  private logo: HTMLElement | null;
  private score: HTMLElement | null;
  private highScoreText: HTMLElement | null;
  private gridSize: number;
  private snake: Snake;
  private food: Food;
  private highScore: number;
  private direction: string;
  private gameInterval: number | undefined;
  private gameSpeedDelay: number;
  private gameStarted: boolean;
  private renderer: Renderer;

  constructor() {
    this.board = document.getElementById("game-board");
    this.instructionText = document.getElementById("instruction-text");
    this.logo = document.getElementById("logo");
    this.score = document.getElementById("score");
    this.highScoreText = document.getElementById("highScore");

    this.gridSize = 50;
    this.snake = new Snake([{ x: 10, y: 10 }]);
    this.food = new Food(this.gridSize);
    this.highScore = 0;
    this.direction = "right";
    this.gameSpeedDelay = 150;
    this.gameStarted = false;
    this.renderer = new Renderer(this.board, this.snake, this.food);

    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  private handleKeyPress(event: KeyboardEvent): void {
    if (
      (!this.gameStarted && event.code === "Space") ||
      (!this.gameStarted && event.key === " ")
    ) {
      this.startGame();
    } else {
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
  }

  private startGame(): void {
    this.gameStarted = true;
    this.instructionText.style.display = "none";
    this.logo.style.display = "none";
    this.gameInterval = window.setInterval(() => {
      this.move();
      this.checkCollision();
      this.renderer.draw();
      this.updateScore();
    }, this.gameSpeedDelay);
  }

  private move(): void {
    const head = { ...this.snake.getHead() };
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
  }

  private increaseSpeed(): void {
    if (this.gameSpeedDelay > 150) {
      this.gameSpeedDelay -= 5;
    } else if (this.gameSpeedDelay > 100) {
      this.gameSpeedDelay -= 3;
    } else if (this.gameSpeedDelay > 50) {
      this.gameSpeedDelay -= 2;
    } else if (this.gameSpeedDelay > 25) {
      this.gameSpeedDelay -= 1;
    }
  }

  private restartInterval(): void {
    if (this.gameInterval !== undefined) {
      clearInterval(this.gameInterval);
    }
    this.gameInterval = window.setInterval(() => {
      this.move();
      this.checkCollision();
      this.renderer.draw();
      this.updateScore();
    }, this.gameSpeedDelay);
  }

  private checkCollision(): void {
    const head = this.snake.getHead();

    if (
      head.x < 1 ||
      head.x > this.gridSize ||
      head.y < 1 ||
      head.y > this.gridSize
    ) {
      this.resetGame();
    }

    if (this.snake.checkSelfCollision()) {
      this.resetGame();
    }
  }

  private resetGame(): void {
    this.updateHighScore();
    this.stopGame();
    this.snake.reset();
    this.food.generateNewPosition(this.snake.getPositions());
    this.direction = "right";
    this.gameSpeedDelay = 150;
    this.updateScore();
  }

  private stopGame(): void {
    if (this.gameInterval !== undefined) {
      clearInterval(this.gameInterval);
    }
    this.gameStarted = false;
    this.instructionText.style.display = "block";
    this.logo.style.display = "block";
  }

  private updateScore(): void {
    const currentScore: number = this.snake.getLength() - 1;
    const padCurrentScore: string = pad(currentScore, 4);
    if (this.score) this.score.textContent = padCurrentScore;
  }

  private updateHighScore(): void {
    const currentScore: number = this.snake.getLength() - 1;
    if (currentScore > this.highScore) {
      this.highScore = currentScore;
      const padCurrentScore: string = pad(currentScore, 4);
      if (this.highScoreText) this.highScoreText.textContent = padCurrentScore;
    }
    if (this.highScoreText) this.highScoreText.style.display = "block";
  }
}

export default Game;

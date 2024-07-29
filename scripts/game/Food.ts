import { Position } from "../interfaces/Position";

class Food {
  public position: Position;
  private gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.position = this.generateFood();
  }

  private generateFood(): Position {
    const x: number = Math.floor(Math.random() * this.gridSize) + 1;
    const y: number = Math.floor(Math.random() * this.gridSize) + 1;
    return { x, y };
  }

  public generateNewPosition(snakePositions: Position[]): void {
    do {
      this.position = this.generateFood();
    } while (
      snakePositions.some(
        (pos) => pos.x === this.position.x && pos.y === this.position.y
      )
    );
  }
}

export default Food;

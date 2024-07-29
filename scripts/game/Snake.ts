import { Position } from "../interfaces/Position";

class Snake {
  private positions: Position[];

  constructor(initialPositions: Position[]) {
    this.positions = initialPositions;
  }

  public move(head: Position): void {
    this.positions.unshift(head);
    this.positions.pop();
  }

  public grow(): void {
    const tail = this.positions[this.positions.length - 1];
    this.positions.push({ ...tail });
  }

  public getHead(): Position {
    return this.positions[0];
  }

  public getPositions(): Position[] {
    return this.positions;
  }

  public getLength(): number {
    return this.positions.length;
  }

  public reset(): void {
    this.positions = [{ x: 10, y: 10 }];
  }

  public checkSelfCollision(): boolean {
    const head = this.getHead();
    for (let i = 1; i < this.positions.length; i++) {
      if (head.x === this.positions[i].x && head.y === this.positions[i].y) {
        return true;
      }
    }
    return false;
  }
}

export default Snake;

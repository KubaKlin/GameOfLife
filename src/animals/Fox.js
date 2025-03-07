import { Animal } from '../organisms/Animal';
import { getRandomFromRange } from '../utilities/getRandomFromRange';

export class Fox extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(4, 7, positionY, positionX, age);
  }

  async action(board) {
    const directions = [
      { positionY: -1, positionX: -1 },
      { positionY: 0, positionX: -1 },
      { positionY: 1, positionX: -1 },
      { positionY: -1, positionX: 0 },
      { positionY: 1, positionX: 0 },
      { positionY: -1, positionX: 1 },
      { positionY: 0, positionX: 1 },
      { positionY: 1, positionX: 1 },
    ];

    const safeDirections = directions.filter((direction) => {
      const newX = this.positionY + direction.positionY;
      const newY = this.positionX + direction.positionX;
      if (!board.isValidPosition(newX, newY)) {
        return false;
      }

      const organism = board.getOrganism(newX, newY);
      const isWeaker = organism?.strength <= this.strength;
      return !organism || isWeaker;
    });

    if (!safeDirections.length) {
      return;
    }

    const randomDirection = safeDirections[getRandomFromRange(safeDirections.length)];
    const newX = this.positionY + randomDirection.positionY;
    const newY = this.positionX + randomDirection.positionX;

    const targetOrganism = board.getOrganism(newX, newY);
    if (!targetOrganism) {
      board.moveOrganism(this, newX, newY);
    } else if (targetOrganism.constructor.name === this.constructor.name) {
      this.mate(board, targetOrganism);
    } else {
      this.fight(board, targetOrganism);
    }
  }

  getIcon() {
    return '🦊';
  }
}

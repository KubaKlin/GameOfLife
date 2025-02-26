import { Animal } from '../organisms/Animal';
import { getRandom } from '../utilities/getRandom';

export class Antelope extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(4, 4, positionY, positionX, age);
  }

  async action(board) {
    // Double range of movement
    const directions = [];
    for (let directionY = -2; directionY <= 2; directionY++) {
      for (let directionX = -2; directionX <= 2; directionX++) {
        if (directionX === 0 && directionY === 0) continue;
        directions.push({ positionY: directionY, positionX: directionX });
      }
    }

    const availableDirections = directions.filter((direction) => {
      const newY = this.positionY + direction.positionY;
      const newX = this.positionX + direction.positionX;
      return board.isValidPosition(newY, newX);
    });

    if (availableDirections.length > 0) {
      const randomDirection =
        availableDirections[getRandom(availableDirections.length)];
      const newY = this.positionY + randomDirection.positionY;
      const newX = this.positionX + randomDirection.positionX;

      const targetOrganism = board.getOrganism(newY, newX);
      if (!targetOrganism) {
        board.moveOrganism(this, newY, newX);
      } else if (targetOrganism.constructor.name === this.constructor.name) {
        this.mate(board, targetOrganism);
      } else {
        // 50% chance to flee from fight
        if (Math.random() < 0.5) {
          const escapeSpots = board.getEmptyNeighbors(
            this.positionY,
            this.positionX,
          );
          if (escapeSpots.length > 0) {
            const escape = escapeSpots[getRandom(escapeSpots.length)];
            board.moveOrganism(this, escape.positionY, escape.positionX);
            return;
          }
        }
        this.fight(board, targetOrganism);
      }
    }
  }

  getIcon() {
    return '🦌';
  }
}

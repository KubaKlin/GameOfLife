import { Animal } from '../organisms/Animal';
import { tryWithChance } from '../utilities/tryWithChance';

export class Antelope extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(4, 4, positionY, positionX, age);
  }

  getAvailableDirections(board) {
    const directions = [];
    for (let directionY = -2; directionY <= 2; directionY++) {
      for (let directionX = -2; directionX <= 2; directionX++) {
        if (!(directionX === 0 && directionY === 0)) {
          directions.push({ positionY: directionY, positionX: directionX });
        }
      }
    }

    return directions.filter((direction) => {
      const newY = this.positionY + direction.positionY;
      const newX = this.positionX + direction.positionX;
      return board.isValidPosition(newY, newX);
    });
  }

  shouldFight(board, opponent) {
    return tryWithChance(0.5); // 50% chance to fight
  }

  getIcon() {
    return '🦌';
  }
}

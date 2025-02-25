import { Animal } from './Animal';
import {getDirection} from "../utilities/getDirection";

export class Player extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(5, 4, positionY, positionX, age);
  }

  action(board) {
    return new Promise((resolve) => {
      const handleKeyPress = (event) => {
        const direction = getDirection(event.key);

        if (direction === null) {
          document.removeEventListener('keydown', handleKeyPress);
          resolve();
          return;
        }

        const newX = this.positionY + direction.directionX;
        const newY = this.positionX + direction.directionY;

        if (board.isValidPosition(newX, newY)) {
          const targetOrganism = board.getOrganism(newX, newY);
          if (!targetOrganism) {
            board.moveOrganism(this, newX, newY);
          } else {
            this.fight(board, targetOrganism);
          }
        }

        document.removeEventListener('keydown', handleKeyPress);
        resolve();
      };

      document.addEventListener('keydown', handleKeyPress);
    });
  }

  getIcon() {
    return '🧑';
  }
}

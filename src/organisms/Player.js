import { Animal } from './Animal';
import { getDirection } from '../utilities/getDirection';

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

        const newY = this.positionY + direction.directionY;
        const newX = this.positionX + direction.directionX;

        if (board.isValidPosition(newY, newX)) {
          const targetOrganism = board.getOrganism(newY, newX);
          if (!targetOrganism) {
            board.moveOrganism(this, newY, newX);
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

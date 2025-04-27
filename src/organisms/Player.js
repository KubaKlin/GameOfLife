import { Animal } from './Animal';

export class Player extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(5, 4, positionY, positionX, age);
  }

  getDirection(key) {
    const directions = {
      w: { directionX: 0, directionY: -1 },
      x: { directionX: 0, directionY: 1 },
      a: { directionX: -1, directionY: 0 },
      d: { directionX: 1, directionY: 0 },
      q: { directionX: -1, directionY: -1 },
      e: { directionX: 1, directionY: -1 },
      z: { directionX: -1, directionY: 1 },
      c: { directionX: 1, directionY: 1 },
      s: null, // Stay in place
    };

    return directions[key] || null;
  }

  action(board) {
    return new Promise((resolve) => {
      const handleKeyPress = (event) => {
        const direction = this.getDirection(event.key);

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

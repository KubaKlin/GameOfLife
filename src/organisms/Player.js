import { Animal } from './Animal';

export class Player extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(5, 4, positionY, positionX, age);
  }

  action(board) {
    return new Promise((resolve) => {
      const handleKeyPress = (event) => {
        let directionX = 0;
        let directionY = 0;

        switch (event.key) {
          case 'w':
            directionY = -1;
            break;
          case 'x':
            directionY = 1;
            break;
          case 'a':
            directionX = -1;
            break;
          case 'd':
            directionX = 1;
            break;
          case 'q':
            directionX = -1;
            directionY = -1;
            break;
          case 'e':
            directionX = 1;
            directionY = -1;
            break;
          case 'z':
            directionX = -1;
            directionY = 1;
            break;
          case 'c':
            directionX = 1;
            directionY = 1;
            break;
          case ' ':
          case 's':
            // Stay in place
            document.removeEventListener('keydown', handleKeyPress);
            resolve();
            return;
          default:
            return;
        }

        const newX = this.positionY + directionX;
        const newY = this.positionX + directionY;

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

import { Organism } from '../Organism';
import { getRandom } from '../utilities/getRandom';

export class Animal extends Organism {
  constructor(strength, initiative, positionY, positionX, age = 0) {
    super(strength, initiative, positionY, positionX, age);
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
        this.fight(board, targetOrganism);
      }
    }
  }

  fight(board, opponent) {
    if (this.strength >= opponent.strength) {
      opponent.die();
      board.removeOrganism(opponent);
      board.moveOrganism(this, opponent.positionY, opponent.positionX);
    } else {
      this.die();
      board.removeOrganism(this);
    }
  }

  mate(board) {
    const emptyNeighbors = board.getEmptyNeighbors(
      this.positionY,
      this.positionX,
    );
    if (emptyNeighbors.length > 0) {
      const position = emptyNeighbors[getRandom(emptyNeighbors.length)];
      const baby = new this.constructor(
        this.strength,
        this.initiative,
        position.positionY,
        position.positionX,
      );
      board.addOrganism(baby);
    }
  }

  // to be done - eat guarana
}

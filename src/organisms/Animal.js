import { Organism } from '../Organism';
import { getRandomFromRange } from '../utilities/getRandomFromRange';

export class Animal extends Organism {
  constructor(strength, initiative, positionY, positionX, age = 0) {
    super(strength, initiative, positionY, positionX, age);
  }

  async action(board) {
    const availableDirections = this.getAvailableDirections(board);

    if (!availableDirections.length) {
      return;
    }
    
    const randomDirection =
      availableDirections[getRandomFromRange(availableDirections.length)];
    const newY = this.positionY + randomDirection.positionY;
    const newX = this.positionX + randomDirection.positionX;

    const targetOrganism = board.getOrganism(newY, newX);
    if (!targetOrganism) {
      board.moveOrganism(this, newY, newX);
    } else if (targetOrganism.constructor.name === this.constructor.name) {
      this.mate(board, targetOrganism);
    } else {
      if (this.shouldFight(board, targetOrganism)) {
        this.fight(board, targetOrganism);
      } else {
        const escapeSpots = board.getEmptyNeighbors(this.positionY, this.positionX);
        if (escapeSpots.length > 0) {
          const escape = escapeSpots[getRandomFromRange(escapeSpots.length)];
          board.moveOrganism(this, escape.positionY, escape.positionX);
        }
      }
    }
  }
  

  fight(board, opponent) {
    if (this.strength >= opponent.strength) {
      opponent.onEaten?.(this, board);
      opponent.die();
      board.removeOrganism(opponent);
      board.moveOrganism(this, opponent.positionY, opponent.positionX);
    } else {
      this.die();
      board.removeOrganism(this);
    }
  }

  shouldFight(board, opponent) {
    return true; // By default, animals always fight
  }

  mate(board) {
    const emptyNeighbors = board.getEmptyNeighbors(
      this.positionY,
      this.positionX,
    );
    if (emptyNeighbors.length > 0) {
      const position = emptyNeighbors[getRandomFromRange(emptyNeighbors.length)];
      const baby = new this.constructor(
        this.strength,
        this.initiative,
        position.positionY,
        position.positionX,
      );
      board.addOrganism(baby);
    }
  }

  onEaten(board, predator) {
    // Default behavior - do nothing when eaten
  }

  getAvailableDirections(board) {
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

    return directions.filter((direction) => {
      const newY = this.positionY + direction.positionY;
      const newX = this.positionX + direction.positionX;
      return board.isValidPosition(newY, newX);
    });
  }
}

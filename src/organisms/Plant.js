import { Organism } from '../Organism';
import { getRandom } from '../utilities/getRandom';

export class Plant extends Organism {
  constructor(strength, positionY, positionX, age = 0) {
    super(strength, 0, positionY, positionX, age); // Plants always have initiative 0
    this.spreadChance = 0.1; // 10% chance to spread by default
  }

  async action(board) {
    if (Math.random() < this.spreadChance) {
      this.spread(board);
    }
  }

  spread(board) {
    const emptyNeighbors = board.getEmptyNeighbors(
      this.positionY,
      this.positionX,
    );
    if (emptyNeighbors.length > 0) {
      const position = emptyNeighbors[getRandom(emptyNeighbors.length)];
      const newPlant = new this.constructor(
        position.positionY,
        position.positionX,
      );
      board.addOrganism(newPlant);
    }
  }
}

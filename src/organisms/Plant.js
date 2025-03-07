import { Organism } from '../Organism';
import { getRandomFromRange } from '../utilities/getRandomFromRange';
import { tryWithChance } from '../utilities/tryWithChance';

export class Plant extends Organism {
  constructor(strength, positionY, positionX, age = 0) {
    super(strength, 0, positionY, positionX, age); // Plants always have initiative 0
    this.spreadChance = 0.1; // 10% chance to spread by default
    this.createdThisTurn = true; // Flag to track if plant was just created
  }

  onEaten(predator, board) {
    // Default behavior - do nothing when eaten
  }

  async action(board) {
    if (!this.createdThisTurn && tryWithChance(this.spreadChance)) {
      this.spread(board);
    }
    this.createdThisTurn = false; // Reset the flag after the turn
  }

  spread(board) {
    const emptyNeighbors = board.getEmptyNeighbors(
      this.positionY,
      this.positionX,
    );
    if (emptyNeighbors.length > 0) {
      const position =
        emptyNeighbors[getRandomFromRange(emptyNeighbors.length)];
      const newPlant = new this.constructor(
        position.positionY,
        position.positionX,
      );
      newPlant.createdThisTurn = true; // Ensure the new plant won't spread this turn
      board.addOrganism(newPlant);
    }
  }
}

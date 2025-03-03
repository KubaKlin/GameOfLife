import { Animal } from '../organisms/Animal';
import { tryWithChance } from '../utilities/tryWithChance';

export class Turtle extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(2, 1, positionY, positionX, age);
  }

  async action(board) {
    // 75% chance to stay in place
    if (tryWithChance(0.75)) return;

    await super.action(board);
  }

  fight(board, opponent) {
    // Defends from organisms with strength < 5
    if (opponent.strength < 5) {
      return; // Fight is cancelled
    }
    super.fight(board, opponent);
  }

  getIcon() {
    return '🐢';
  }
}

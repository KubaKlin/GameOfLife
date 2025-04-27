import { Plant } from '../organisms/Plant';

export class PoisonBerry extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age); // Strength doesn't matter since it kills instantly
  }

  onEaten(predator, board) {
    predator.die();
    board.removeOrganism(predator);
  }

  getIcon() {
    return '🍄';
  }
}

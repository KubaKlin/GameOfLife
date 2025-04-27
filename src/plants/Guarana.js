import { Plant } from '../organisms/Plant';

export class Guarana extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
  }

  onEaten(predator, board) {
    predator.strength += 3;
  }

  getIcon() {
    return '🍇';
  }
}

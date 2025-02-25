import { Plant } from '../organisms/Plant';

export class PoisonBerry extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(99, positionY, positionX, age); // High strength to ensure it kills the animal
  }

  getIcon() {
    return '🍄';
  }
}

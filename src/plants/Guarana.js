import { Plant } from '../organisms/Plant';

export class Guarana extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
  }

  onEaten(animal) {
    animal.strength += 3;
  }

  getIcon() {
    return '🍇';
  }
}

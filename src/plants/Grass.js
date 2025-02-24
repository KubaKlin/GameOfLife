import { Plant } from '../organisms/Plant';

export class Grass extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
  }

  getIcon() {
    return '🌱';
  }
}
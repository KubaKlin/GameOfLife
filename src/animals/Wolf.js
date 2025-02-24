import { Animal } from '../Animal';

export class Wolf extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(9, 5, positionY, positionX, age);
  }

  getIcon() {
    return '🐺';
  }
}
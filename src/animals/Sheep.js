import { Animal } from '../organisms/Animal';

export class Sheep extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(3, 4, positionY, positionX, age);
  }

  getIcon() {
    return '🐑';
  }
}
export class Organism {
  constructor(strength, initiative, positionY, positionX, age = 0) {
    this.strength = strength;
    this.initiative = initiative;
    this.positionY = positionY;
    this.positionX = positionX;
    this.age = age;
    this.alive = true;
  }

  getIcon() {
    return '';
  }

  async action(board) {
    // To be implemented by subclasses
  }

  setPosition(positionY, positionX) {
    this.positionY = positionY;
    this.positionX = positionX;
  }

  die() {
    this.alive = false;
  }
}

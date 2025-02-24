import { Plant } from './plant';

export class Grass extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
  }

  getIcon() {
    return '🌱';
  }
}

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

export class PoisonBerry extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(99, positionY, positionX, age); // High strength to ensure it kills the animal
  }

  getIcon() {
    return '🍄';
  }
}

export class SowThistle extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
    this.spreadChance = 0.3; // 30% chance to spread (3x normal)
  }

  getIcon() {
    return '🌼';
  }
}

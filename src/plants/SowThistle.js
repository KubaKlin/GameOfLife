import { Plant } from '../Plant';

export class SowThistle extends Plant {
  constructor(positionY, positionX, age = 0) {
    super(0, positionY, positionX, age);
    this.spreadChance = 0.3; // 30% chance to spread (3x normal)
  }

  getIcon() {
    return '🌼';
  }
}
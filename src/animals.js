import { Animal } from './animal';

export class Wolf extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(9, 5, positionY, positionX, age);
  }

  getIcon() {
    return '🐺';
  }
}

export class Sheep extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(3, 4, positionY, positionX, age);
  }

  getIcon() {
    return '🐑';
  }
}

export class Fox extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(4, 7, positionY, positionX, age);
  }

  async action(board) {
    const directions = [
      { positionY: -1, positionX: -1 },
      { positionY: 0, positionX: -1 },
      { positionY: 1, positionX: -1 },
      { positionY: -1, positionX: 0 },
      { positionY: 1, positionX: 0 },
      { positionY: -1, positionX: 1 },
      { positionY: 0, positionX: 1 },
      { positionY: 1, positionX: 1 },
    ];

    const safeDirections = directions.filter((direction) => {
      const newX = this.positionY + direction.positionY;
      const newY = this.positionX + direction.positionX;
      if (!board.isValidPosition(newX, newY)) return false;

      const organism = board.getOrganism(newX, newY);
      return !organism || organism.strength <= this.strength;
    });

    if (safeDirections.length > 0) {
      const randomDirection =
        safeDirections[Math.floor(Math.random() * safeDirections.length)];
      const newX = this.positionY + randomDirection.positionY;
      const newY = this.positionX + randomDirection.positionX;

      const targetOrganism = board.getOrganism(newX, newY);
      if (!targetOrganism) {
        board.moveOrganism(this, newX, newY);
      } else if (targetOrganism.constructor.name === this.constructor.name) {
        this.mate(board, targetOrganism);
      } else {
        this.fight(board, targetOrganism);
      }
    }
  }

  getIcon() {
    return '🦊';
  }
}

export class Antelope extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(4, 4, positionY, positionX, age);
  }

  async action(board) {
    // Double range of movement
    const directions = [];
    for (let directionY = -2; directionY <= 2; directionY++) {
      for (let directionX = -2; directionX <= 2; directionX++) {
        if (directionX === 0 && directionY === 0) continue;
        directions.push({ positionY: directionX, positionX: directionY });
      }
    }

    const availableDirections = directions.filter((direction) => {
      const newX = this.positionY + direction.positionY;
      const newY = this.positionX + direction.positionX;
      return board.isValidPosition(newX, newY);
    });

    if (availableDirections.length > 0) {
      const randomDirection =
        availableDirections[
          Math.floor(Math.random() * availableDirections.length)
        ];
      const newX = this.positionY + randomDirection.positionY;
      const newY = this.positionX + randomDirection.positionX;

      const targetOrganism = board.getOrganism(newX, newY);
      if (!targetOrganism) {
        board.moveOrganism(this, newX, newY);
      } else if (targetOrganism.constructor.name === this.constructor.name) {
        this.mate(board, targetOrganism);
      } else {
        // 50% chance to flee from fight
        if (Math.random() < 0.5) {
          const escapeSpots = board.getEmptyNeighbors(
            this.positionY,
            this.positionX,
          );
          if (escapeSpots.length > 0) {
            const escape =
              escapeSpots[Math.floor(Math.random() * escapeSpots.length)];
            board.moveOrganism(this, escape.positionY, escape.positionX);
            return;
          }
        }
        this.fight(board, targetOrganism);
      }
    }
  }

  getIcon() {
    return '🦌';
  }
}

export class Turtle extends Animal {
  constructor(positionY, positionX, age = 0) {
    super(2, 1, positionY, positionX, age);
  }

  async action(board) {
    // 75% chance to stay in place
    if (Math.random() < 0.75) return;

    await super.action(board);
  }

  fight(board, opponent) {
    // Defends from organisms with strength < 5
    if (opponent.strength < 5) {
      return; // Fight is cancelled
    }
    super.fight(board, opponent);
  }

  getIcon() {
    return '🐢';
  }
}

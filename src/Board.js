import { Wolf } from './animals/Wolf';
import { Sheep } from './animals/Sheep';
import { Fox } from './animals/Fox';
import { Antelope } from './animals/Antelope';
import { Turtle } from './animals/Turtle';
import { Grass } from './plants/Grass';
import { Guarana } from './plants/Guarana';
import { PoisonBerry } from './plants/PoisonBerry';
import { SowThistle } from './plants/SowThistle';
import { wait } from './utilities/wait';
import { OrganismPopup } from './OrganismPopup';
import { Tile } from './Tile';

export class Board {
  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
    this.organisms = [];
    this.tiles = Array(height)
      .fill()
      .map((_, y) =>
        Array(width)
          .fill()
          .map((_, x) => new Tile(y, x, this)),
      );
    this.gameElement = document.getElementById('game-board');
    this.organismPopup = new OrganismPopup(this);
    this.setupBoard();
  }

  setupBoard() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.gameElement.appendChild(this.tiles[y][x].element);
      }
    }
  }

  addOrganism(organism) {
    if (this.isValidPosition(organism.positionY, organism.positionX)) {
      this.organisms.push(organism);
      this.tiles[organism.positionY][organism.positionX].setOrganism(organism);
    }
  }

  removeOrganism(organism) {
    const index = this.organisms.indexOf(organism);
    if (index > -1) {
      this.organisms.splice(index, 1);
      this.tiles[organism.positionY][organism.positionX].removeOrganism();
    }
  }

  moveOrganism(organism, newY, newX) {
    this.tiles[organism.positionY][organism.positionX].removeOrganism();
    organism.setPosition(newY, newX);
    this.tiles[newY][newX].setOrganism(organism);
  }

  getOrganism(positionY, positionX) {
    return this.tiles[positionY][positionX].getOrganism();
  }

  isValidPosition(positionY, positionX) {
    return (
      positionY >= 0 &&
      positionY < this.height &&
      positionX >= 0 &&
      positionX < this.width
    );
  }

  getEmptyNeighbors(positionY, positionX) {
    const neighbors = [];
    for (let directionY = -1; directionY <= 1; directionY++) {
      for (let directionX = -1; directionX <= 1; directionX++) {
        if (directionX === 0 && directionY === 0) continue;

        const newY = positionY + directionY;
        const newX = positionX + directionX;

        if (this.isValidPosition(newY, newX) && !this.getOrganism(newY, newX)) {
          neighbors.push({ positionY: newY, positionX: newX });
        }
      }
    }
    return neighbors;
  }

  async nextTurn() {
    this.organisms.sort((firstOrganism, secondOrganism) => {
      if (secondOrganism.initiative !== firstOrganism.initiative) {
        return secondOrganism.initiative - firstOrganism.initiative;
      }
      return secondOrganism.age - firstOrganism.age;
    });

    for (const organism of [...this.organisms]) {
      if (organism.alive) {
        await organism.action(this);
        organism.age++;
        await wait(50);
      }
    }

    this.organisms = this.organisms.filter((org) => org.alive);
  }

  createOrganism(organismType, positionY, positionX) {
    if (!this.isValidPosition(positionY, positionX)) {
      console.error(
        `Invalid position for new ${organismType}: (${positionY}, ${positionX})`,
      );
      return;
    }
    const organismClasses = {
      Wolf,
      Sheep,
      Fox,
      Antelope,
      Turtle,
      Grass,
      Guarana,
      PoisonBerry,
      SowThistle,
    };

    const OrganismClass = organismClasses[organismType];
    if (OrganismClass) {
      const newOrganism = new OrganismClass(positionY, positionX);
      this.addOrganism(newOrganism);
    }
  }
}

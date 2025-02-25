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
      .map((_, x) =>
        Array(width)
          .fill()
          .map((_, y) => new Tile(y, x, this)),
      );
    this.gameElement = document.getElementById('game-board');
    this.organismPopup = new OrganismPopup(this);
    this.setupBoard();
  }

  setupBoard() {
    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        this.gameElement.appendChild(this.tiles[x][y].element);
      }
    }
  }

  addOrganism(organism) {
    if (this.isValidPosition(organism.positionY, organism.positionX)) {
      this.organisms.push(organism);
      this.tiles[organism.positionX][organism.positionY].setOrganism(organism);
    }
  }

  removeOrganism(organism) {
    const index = this.organisms.indexOf(organism);
    if (index > -1) {
      this.organisms.splice(index, 1);
      this.tiles[organism.positionX][organism.positionY].removeOrganism();
    }
  }

  moveOrganism(organism, newX, newY) {
    this.tiles[organism.positionX][organism.positionY].removeOrganism();
    organism.setPosition(newX, newY);
    this.tiles[newY][newX].setOrganism(organism);
  }

  getOrganism(positionY, positionX) {
    return this.tiles[positionX][positionY].getOrganism();
  }

  isValidPosition(positionY, positionX) {
    return (
      positionY >= 0 &&
      positionY < this.width &&
      positionX >= 0 &&
      positionX < this.height
    );
  }

  getEmptyNeighbors(positionY, positionX) {
    const neighbors = [];
    for (let directionY = -1; directionY <= 1; directionY++) {
      for (let directionX = -1; directionX <= 1; directionX++) {
        if (directionX === 0 && directionY === 0) continue;

        const newX = positionY + directionX;
        const newY = positionX + directionY;

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

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
import { createTiles } from './utilities/createTiles';
import { sortOrganismsByInitiative } from './utilities/sortOrganismsByInitiative';

export class Board {
  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
    this.organisms = [];
    this.tiles = createTiles(this.width, this.height, this);
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
    const directions = [
      { y: -1, x: -1 },
      { y: -1, x: 0 },
      { y: -1, x: 1 },
      { y: 0, x: -1 },
      { y: 0, x: 1 },
      { y: 1, x: -1 },
      { y: 1, x: 0 },
      { y: 1, x: 1 },
    ];

    return directions
      .map((direction) => {
        const newY = positionY + direction.y;
        const newX = positionX + direction.x;
        if (this.isValidPosition(newY, newX) && !this.getOrganism(newY, newX)) {
          return { positionY: newY, positionX: newX };
        }
        return null;
      })
      .filter((neighbor) => neighbor !== null);
  }

  async nextTurn() {
    this.organisms.sort(sortOrganismsByInitiative);

    for (let i = 0; i < this.organisms.length; i++) {
      const organism = this.organisms[i];
      if (organism.alive) {
        await organism.action(this);
        organism.age++;
        await wait(100);
      }
    }

    this.organisms = this.organisms.filter((organism) => organism.alive);
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

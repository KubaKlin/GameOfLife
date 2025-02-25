import { Wolf } from './animals/Wolf';
import { Sheep } from './animals/Sheep';
import { Fox } from './animals/Fox';
import { Antelope } from './animals/Antelope';
import { Turtle } from './animals/Turtle';
import { Grass } from './plants/Grass';
import { Guarana } from './plants/Guarana';
import { PoisonBerry } from './plants/PoisonBerry';
import { SowThistle } from './plants/SowThistle';
import {wait} from "./utilities/wait";
import {OrganismPopup} from "./OrganismPopup";


export class Board {
  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
    this.organisms = [];
    this.tiles = Array(height)
      .fill()
      .map(() => Array(width).fill(null));
    this.gameElement = document.getElementById('game-board');
    this.organismPopup = new OrganismPopup(this);
    this.setupBoard();
  }

  setupBoard() {
    for (let i = 0; i < this.width * this.height; i++) {
      const positionY = i % this.width; // calculate positionY
      const positionX = Math.floor(i / this.width); // calculate positionX
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.positionY = positionY;
      tile.dataset.positionX = positionX;
      tile.addEventListener('click', () =>
        this.handleTileClick(positionY, positionX),
      );
      this.gameElement.appendChild(tile);
    }
  }

  handleTileClick(positionY, positionX) {
    if (!this.getOrganism(positionY, positionX)) {
      this.organismPopup.showPopup(positionY, positionX);
    }
  }

  addOrganism(organism) {
    this.organisms.push(organism);
    this.tiles[organism.positionX][organism.positionY] = organism;
    this.updateTile(organism.positionY, organism.positionX);
  }

  removeOrganism(organism) {
    const index = this.organisms.indexOf(organism);
    if (index > -1) {
      this.organisms.splice(index, 1);
      this.tiles[organism.positionX][organism.positionY] = null;
      this.updateTile(organism.positionY, organism.positionX);
    }
  }

  moveOrganism(organism, newX, newY) {
    this.tiles[organism.positionX][organism.positionY] = null;
    this.updateTile(organism.positionY, organism.positionX);

    organism.setPosition(newX, newY);
    this.tiles[newY][newX] = organism;
    this.updateTile(newX, newY);
  }

  getOrganism(positionY, positionX) {
    return this.tiles[positionX][positionY];
  }

  updateTile(positionY, positionX) {
    const tile = this.gameElement.children[positionX * this.width + positionY];
    const organism = this.tiles[positionX][positionY];

    while (tile?.firstChild) {
      tile.removeChild(tile.firstChild);
    }
    if (organism && organism.getIcon() && tile) {
      tile.textContent = organism.getIcon();
    }
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

        if (this.isValidPosition(newX, newY) && !this.getOrganism(newX, newY)) {
          neighbors.push({ positionY: newX, positionX: newY });
        }
      }
    }
    return neighbors;
  }

  async nextTurn() {
    // Sort organisms by initiative and age
    this.organisms.sort((firstOrganism, secondOrganism) => {
      if (secondOrganism.initiative !== firstOrganism.initiative) {
        return secondOrganism.initiative - firstOrganism.initiative;
      }
      return secondOrganism.age - firstOrganism.age;
    });

    // Execute actions for each organism
    for (const organism of [...this.organisms]) {
      if (organism.alive) {
        // Wait for the action to complete (important for Player actions)
        await organism.action(this);
        organism.age++;
        // Add a small delay between organism actions - performance issue
        await wait(50);
      }
    }

    // Remove dead organisms
    this.organisms = this.organisms.filter((org) => org.alive);
  }

  createOrganism(organismType, positionY, positionX) {
    const organismClasses = {
      Wolf: Wolf,
      Sheep: Sheep,
      Fox: Fox,
      Antelope: Antelope,
      Turtle: Turtle,
      Grass: Grass,
      Guarana: Guarana,
      PoisonBerry: PoisonBerry,
      SowThistle: SowThistle,
    };

    const OrganismClass = organismClasses[organismType];
    if (OrganismClass) {
      const newOrganism = new OrganismClass(positionY, positionX);
      this.addOrganism(newOrganism);
    }
  }
}

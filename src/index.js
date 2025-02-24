import './styles.css';
import { Board } from './Board';
import { Wolf } from './animals/Wolf';
import { Sheep } from './animals/Sheep';
import { Fox } from './animals/Fox';
import { Antelope } from './animals/Antelope';
import { Turtle } from './animals/Turtle';
import { Grass } from './plants/Grass';
import { Guarana } from './plants/Guarana';
import { PoisonBerry } from './plants/PoisonBerry';
import { SowThistle } from './plants/SowThistle';
import { Player } from './Player';
import { wait } from './utilities/wait';

class Game {
  constructor() {
    this.board = new Board();
    this.isRunning = false;
    this.setupInitialState();
  }

  setupInitialState() {
    // Add player at random position
    const playerPositionX = Math.floor(Math.random() * this.board.width);
    const playerPositionY = Math.floor(Math.random() * this.board.height);
    this.board.addOrganism(new Player(playerPositionX, playerPositionY));

    const organismTypes = [
      Wolf,
      Sheep,
      Fox,
      Antelope,
      Turtle,
      Grass,
      Guarana,
      PoisonBerry,
      SowThistle,
    ];

    // Add 20 random organisms
    for (let i = 0; i < 20; i++) {
      const organismType =
        organismTypes[Math.floor(Math.random() * organismTypes.length)];
      let organismPositionY, organismPositionX, isSpaceOccupied;
      do {
        organismPositionX = Math.floor(Math.random() * this.board.width);
        organismPositionY = Math.floor(Math.random() * this.board.height);
        isSpaceOccupied = this.board.getOrganism(
          organismPositionX,
          organismPositionY,
        );
      } while (isSpaceOccupied);

      this.board.addOrganism(
        new organismType(organismPositionX, organismPositionY),
      );
    }
  }

  async start() {
    this.isRunning = true;
    while (this.isRunning) {
      await this.board.nextTurn();
      // Add a delay between turns - performance issue
      await wait(200);
    }
  }
}

const game = new Game();
game.start();

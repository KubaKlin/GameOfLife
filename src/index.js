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
import { Player } from './organisms/Player';
import { wait } from './utilities/wait';
import { getRandom } from './utilities/getRandom';

class Game {
  constructor() {
    this.board = new Board();
    this.isRunning = false;
    this.setupInitialState();
  }

  setupInitialState() {
    // Add player at random position
    const playerPositionX = getRandom(this.board.width);
    const playerPositionY = getRandom(this.board.height);
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
      const organismType = organismTypes[getRandom(organismTypes.length)];
      let organismPositionX, organismPositionY, isSpaceOccupied;

      while (true) {
        organismPositionX = getRandom(this.board.width);
        organismPositionY = getRandom(this.board.height);
        isSpaceOccupied = this.board.getOrganism(
          organismPositionY,
          organismPositionX,
        );

        if (!isSpaceOccupied) {
          break;
        }
      }

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
      await wait(100);
    }
  }
}

const game = new Game();
game.start();

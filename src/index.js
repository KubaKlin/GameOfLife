import './styles.css';
import { Board } from './board';
import { Wolf, Sheep, Fox, Antelope, Turtle } from './animals';
import { Grass, Guarana, PoisonBerry, SowThistle } from './plants';
import { Player } from './player';
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

// Start the game when the page loads
//window.addEventListener('load', () => {
  const game = new Game();
  game.start();
//});

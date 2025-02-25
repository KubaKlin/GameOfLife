export class Tile {
  constructor(positionY, positionX, board) {
    this.positionY = positionY;
    this.positionX = positionX;
    this.board = board;
    this.organism = null;
    this.element = this.createTileElement();
  }

  createTileElement() {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.positionY = this.positionY;
    tile.dataset.positionX = this.positionX;
    tile.addEventListener('click', () => this.handleClick());
    return tile;
  }

  handleClick() {
    if (!this.organism) {
      this.board.organismPopup.showPopup(this.positionY, this.positionX);
    }
  }

  setOrganism(organism) {
    this.organism = organism;
    this.updateDisplay();
  }

  removeOrganism() {
    this.organism = null;
    this.updateDisplay();
  }

  updateDisplay() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    if (this.organism && this.organism.getIcon()) {
      this.element.textContent = this.organism.getIcon();
    }
  }

  getOrganism() {
    return this.organism;
  }
}

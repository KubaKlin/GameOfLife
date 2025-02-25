export class OrganismPopup {
  constructor(board) {
    this.board = board;
    this.popup = document.getElementById('organism-popup');
    this.buttonsContainer = document.getElementById('organism-buttons');
    this.cancelButton = document.getElementById('cancel-popup');
    this.organisms = [
      'Wolf',
      'Sheep',
      'Fox',
      'Antelope',
      'Turtle',
      'Grass',
      'Guarana',
      'PoisonBerry',
      'SowThistle',
    ];

    this.initializeCancelHandler();
  }

  initializeCancelHandler() {
    this.cancelButton.onclick = () => {
      this.closePopup();
    };
  }

  showPopup(positionY, positionX) {
    // Clear previous buttons
    this.clearButtons();

    // Add buttons for each organism type
    this.organisms.forEach((organism) => {
      const button = document.createElement('button');
      button.textContent = organism;
      button.addEventListener('click', () => {
        this.board.createOrganism(organism, positionY, positionX);
        this.closePopup();
      });
      this.buttonsContainer.appendChild(button);
    });

    this.popup.classList.add('active');
  }

  closePopup() {
    this.popup.classList.remove('active');
  }

  clearButtons() {
    while (this.buttonsContainer.firstChild) {
      this.buttonsContainer.removeChild(this.buttonsContainer.firstChild);
    }
  }
}

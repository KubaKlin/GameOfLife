export class OrganismPopup {
  constructor(board) {
    this.board = board;
    this.popup = document.getElementById('organism-popup');
    this.buttonsContainer = document.getElementById('organism-buttons');
    this.cancelButton = document.getElementById('cancel-popup');

    this.initializeButtonsHandler();
    this.initializeCancelHandler();
  }

  initializeButtonsHandler() {
    const buttons = this.buttonsContainer.querySelectorAll('.add-animal-button');
    buttons.forEach((button) => {
      const organism = button.getAttribute('data-organism');
      button.addEventListener('click', () => {
        const positionY = button.getAttribute('data-position-y');
        const positionX = button.getAttribute('data-position-x');
        this.board.createOrganism(organism, positionY, positionX);
        this.closePopup();
      });
    });
  }

  initializeCancelHandler() {
    this.cancelButton.addEventListener('click', () => {
      this.closePopup();
    });
  }

  showPopup(positionY, positionX) {
    this.popup.classList.add('active');
    const buttons = this.buttonsContainer.querySelectorAll('.add-animal-button');
    buttons.forEach((button) => {
      button.setAttribute('data-position-y', positionY);
      button.setAttribute('data-position-x', positionX);
    });
  }

  closePopup() {
    this.popup.classList.remove('active');
  }
}
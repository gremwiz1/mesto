export class Popup {
  constructor(popupElement) {
    this._openedClass = 'popup_opened';
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupElement.classList.add(this._openedClass);
    document.body.addEventListener('keydown', this._handleEscClose);
  };
  close() {
    this._popupElement.classList.remove(this._openedClass);
    document.body.removeEventListener('keydown', this._handleEscClose);
  };
  _handleEscClose(evt) {
    const keyCodeEscape = 27;
    if (evt.keyCode === keyCodeEscape) {
      this.close();
    }
  }
  setEventListeners() {

    this._popupElement.addEventListener('click', (evt) => {
      if (!evt.target.closest('.popup__container')) {
        this.close();
      }
    });
    this._popupElement.querySelector('.popup__button-close').addEventListener('click', (evt) => {
      this.close();
    })
  }
}

import { Popup } from './Popup.js';
export class PopupDeleteCard extends Popup {
    constructor(popupElement) {
        super(popupElement);

        this._form = popupElement.querySelector('[name="popup-container"]');
        this._submitButton = this._form.querySelector('.submit-button');

    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.changeFunctionSubmit();
        })


    }
    close() {
        super.close();

    }
    open() {
        super.open();

    }
    changeFunctionSubmit(handler) {
        this.changeFunctionSubmit = handler;

    }
    load(text) {
        this._submitButton.textContent = text;
    }
}
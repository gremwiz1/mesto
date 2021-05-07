import { Popup } from './Popup.js';
export class PopupDeleteCard extends Popup {
    constructor(popupElement) {
        super(popupElement);

        this._form = popupElement.querySelector('[name="popup-container"]');

    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', () => {
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
}
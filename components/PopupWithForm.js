import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupElement, submitForm) {
        super(popupElement);
        this._submitForm = submitForm;
        this._form = popupElement.querySelector('[name="popup-container"]');
        this._inputList = Array.from(popupElement.querySelectorAll('.popup-container__name'));
        this._submitButton = this._form.querySelector('.submit-button');
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(element => {
            inputValues[element.name] = element.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._submitForm);
    }
    close() {
        super.close();
        this._form.reset();
    }
    load(text) {
        this._submitButton.textContent = text;
    }
}
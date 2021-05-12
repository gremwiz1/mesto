import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._popupImage = document.querySelector('.popup__image');
        this._popupText = document.querySelector('.popup__text');
    }
    open(item, text) {
        super.open();
        this._popupImage.src = item.src;
        this._popupImage.alt = item.alt;
        this._popupText.textContent = text.textContent;
    }
}
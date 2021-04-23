import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor (popupElement) {
        super(popupElement);
    }
    open(item, text) {
    super.open(); 
    const popupImage = document.querySelector('.popup__image');
    const popupText = document.querySelector('.popup__text');
    popupImage.src = item.src;
    popupImage.alt = item.alt;
    popupText.textContent = text.textContent;
    }
}
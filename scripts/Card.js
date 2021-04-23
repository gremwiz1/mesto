//import {openImagePopup} from './utils/utils.js';
export class Card {
    constructor(item, selector,handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }
    renderCard() {
        const templateElement = document.querySelector(this._selector);
        const newItem = templateElement.content.cloneNode(true);
        const elementTitle = newItem.querySelector('.element__title');
        const elementImage = newItem.querySelector('.element__image');
        const elementLike = newItem.querySelector('.element__like');
        const elementButtonDelete = newItem.querySelector('.element__button-delete');
        elementTitle.textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;
        this._setEventListeners(elementImage,elementTitle,elementLike,elementButtonDelete);
        return newItem;
    }
    _changeLikeElement(item) {
        item.classList.toggle('element__like-active');
    }
    _deleteCard(item) {
        const elementDelete = item.closest('.element');
        elementDelete.remove();
    }
    _setEventListeners(elementImage,elementTitle,elementLike,elementButtonDelete) {
        elementImage.addEventListener('click', () => {this._handleCardClick(elementImage, elementTitle) });
        elementLike.addEventListener('click', () => { this._changeLikeElement(elementLike) });
        elementButtonDelete.addEventListener('click', () => { this._deleteCard(elementButtonDelete) });
    }

}

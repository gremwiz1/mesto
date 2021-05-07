export class Card {
    constructor(item, selector,handleCardClick,handleLikeClick, handleDeleteIconClick) {
        this._name = item.name;
        this._link = item.link;
        this.__numberLikes = (item.likes) ? item.likes.length : 0;
        this._id = item._id;
        this._owner = item.owner._id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }
    renderCard() {
        const templateElement = document.querySelector(this._selector);
        const newItem = templateElement.content.cloneNode(true);
        const elementTitle = newItem.querySelector('.element__title');
        const elementImage = newItem.querySelector('.element__image');
        const elementLike = newItem.querySelector('.element__like');
        const elementButtonDelete = newItem.querySelector('.element__button-delete');
        const elementNumberLikes = newItem.querySelector('.element__like-numbers');
        elementTitle.textContent = this._name;
        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementNumberLikes.textContent = this.__numberLikes;
        this._setEventListeners(elementImage,elementTitle,elementLike,elementButtonDelete,elementNumberLikes);
        if(this._owner!=='5e51fd63ad71e1d086b3e567') {
            
            elementButtonDelete.style.display = 'none';
        }
        return newItem;
    }
    
    _setEventListeners(elementImage,elementTitle,elementLike,elementButtonDelete, elementNumberLikes) {
        elementImage.addEventListener('click', () => {this._handleCardClick(elementImage, elementTitle) });
        elementLike.addEventListener('click', () => { this._handleLikeClick(this._id,elementLike,elementNumberLikes) });
        elementButtonDelete.addEventListener('click', () => { this._handleDeleteIconClick(this._id,elementButtonDelete.closest('.element')) });
    }

}

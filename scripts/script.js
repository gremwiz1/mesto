const formElement = document.getElementById('popupProfile');
const popupFormElement = document.getElementById('popupFormElement');
const popupProfileForm = document.querySelector('.popup_edit-profile');
const nameInput = document.querySelector('input[name="firstname"]');
const jobInput = document.querySelector('input[name="profession"]');
const popupIsClose = document.querySelectorAll('.popup__button-close');
const popupIsOpen = document.querySelector('.profile-button');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__profession');
const popupAddElement = document.querySelector('.popup_add-card');
const addElementButton = document.querySelector('.add-button');
const popupWithImage = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const templateElement = document.querySelector('.template');
const container = document.querySelector('.elements');
const inputNameImage = document.querySelector('input[name="nameimage"]');
const inputSourceImage = document.querySelector('input[name="path"]');
const buttonCloseFormAddCard = document.getElementById('popupaddcard');
const buttonCloseImagePopup = document.getElementById('imagepopup');
const buttonCloseEditProfile = document.getElementById('popupeditprofile');
renderElements();
formElement.addEventListener('submit', submitEditProfileForm);
popupFormElement.addEventListener('submit', submitAddCardPopup);
popupIsOpen.addEventListener('click', () => {openProfileForm(popupProfileForm)});
addElementButton.addEventListener('click', () => {openPopupAddCard()});
buttonCloseFormAddCard.addEventListener('click', () => {closeFormAddCard()});
buttonCloseImagePopup.addEventListener('click', () => {closePopup(popupWithImage)});
buttonCloseEditProfile.addEventListener('click', () => {closePopup(popupProfileForm)});
popupProfileForm.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')) {
        closePopup(popupProfileForm);
    }
});
popupAddElement.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container')) {
        closePopup(popupAddElement);
    }
});
popupWithImage.addEventListener('click', (evt) => {
    if(!evt.target.closest('.popup__container-image')) {
        closePopup(popupWithImage);
    }
});
function renderElements() {
const result = initialCards.map(createCard);
container.append(...result);
}
function createCard(item) {
    const newItem = templateElement.content.cloneNode(true);
    const elementTitle = newItem.querySelector('.element__title');
    const elementImage = newItem.querySelector('.element__image');
    const elementLike = newItem.querySelector('.element__like');
    const elementButtonDelete = newItem.querySelector('.element__button-delete');
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;
    elementImage.addEventListener('click',() =>{openImagePopup(elementImage, elementTitle)});
    elementLike.addEventListener('click',() => {changeLikeElement(elementLike)});
    elementButtonDelete.addEventListener('click', () => {deleteCard(elementButtonDelete)})
    return newItem;
}
function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
}
function closePopup(popup) {
    document.body.removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
}
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.body.addEventListener('keydown', closePopupEsc);
}
function changeLikeElement(item) {
item.classList.toggle('element__like-active');
}
function openImagePopup(item, text) {
openPopup(popupWithImage);  
popupImage.src = item.src;
popupImage.alt = item.alt;
popupText.textContent = text.textContent;
}
function deleteCard(item) {
const elementDelete = item.closest('.element');
elementDelete.remove();
}
function submitAddCardPopup(evt) {
    evt.preventDefault();
    const card = createCard({name: inputNameImage.value, link: inputSourceImage.value});
    container.prepend(card);
    popupFormElement.reset();
    closePopup(evt.target.closest('.popup'));
}
function openProfileForm(popup) {
  openPopup(popup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;
}
function closeFormAddCard() {
  popupFormElement.reset();
  closePopup(popupAddElement);
}
function openPopupAddCard() {
    openPopup(popupAddElement);
    popupFormElement.reset();
    const submitButtonFormAddCard = popupFormElement.querySelector('.submit-button');
    submitButtonFormAddCard.setAttribute('disabled', true);
}
function closePopupEsc(evt) {
    const keyCodeEscape = 27;
    if(evt.keyCode === keyCodeEscape) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}


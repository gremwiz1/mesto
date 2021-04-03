import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial-cards.js';

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
const selectorTemplateCard = '.template';
const container = document.querySelector('.elements');
const inputNameImage = document.querySelector('input[name="nameimage"]');
const inputSourceImage = document.querySelector('input[name="path"]');
const buttonCloseFormAddCard = document.getElementById('popupaddcard');
const buttonCloseImagePopup = document.getElementById('imagepopup');
const buttonCloseEditProfile = document.getElementById('popupeditprofile');
const validationObjectForms = {
        inputSelector: '.popup-container__name',
        submitButtonSelector: '.submit-button',
        inactiveButtonClass: 'submit-button_disabled',
        inputErrorClass: 'popup-container__input-error',
        errorClass: 'popup__error_visible'
}
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

const result = initialCards.map((item) => {
const card = new Card (item, selectorTemplateCard);
container.append(card.renderCard());

});

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

export const openImagePopup = (item, text) => {
openPopup(popupWithImage);  
popupImage.src = item.src;
popupImage.alt = item.alt;
popupText.textContent = text.textContent;
}

function submitAddCardPopup(evt) {
    evt.preventDefault();
    const card = new Card ({name: inputNameImage.value, link: inputSourceImage.value}, selectorTemplateCard);
    
    container.prepend(card.renderCard());
    popupFormElement.reset();
    closePopup(evt.target.closest('.popup'));
}
function openProfileForm(popup) {
  openPopup(popup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;
  const profileForm = new FormValidator(validationObjectForms, formElement);
  profileForm.enableValidation();
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
    const formAddCard = new FormValidator(validationObjectForms, popupFormElement);
    formAddCard.enableValidation();
}
function closePopupEsc(evt) {
    const keyCodeEscape = 27;
    if(evt.keyCode === keyCodeEscape) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}


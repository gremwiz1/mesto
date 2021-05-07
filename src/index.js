import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/initial-cards.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
const formElement = document.getElementById('popupProfile');
const popupFormElement = document.getElementById('popupFormElement');
const popupProfileForm = document.querySelector('.popup_edit-profile');
const nameInput = document.querySelector('input[name="firstname"]');
const jobInput = document.querySelector('input[name="profession"]');
const popupIsOpen = document.querySelector('.profile-button');
const popupAddElement = document.querySelector('.popup_add-card');
const addElementButton = document.querySelector('.add-button');
const popupWithImage = document.querySelector('.popup_image');
const selectorTemplateCard = '.template';
const submitButtonFormAddCard = popupFormElement.querySelector('.submit-button');
const submitButtonEditProfile = popupProfileForm.querySelector('.submit-button');
const validationObjectForms = {
    inputSelector: '.popup-container__name',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_disabled',
    inputErrorClass: 'popup-container__input-error',
    errorClass: 'popup__error_visible'
}
const validatorAddCardForm = createFormValidator(validationObjectForms, popupFormElement);
validatorAddCardForm.enableValidation();
const validatorEditProfileForm = createFormValidator(validationObjectForms, formElement);
validatorEditProfileForm.enableValidation();
popupIsOpen.addEventListener('click', () => {
    popupWithFormEditProfile.open();
    validatorEditProfileForm.disableSubmitButton();
    const userObject = userInfo.getUserInfo();
    nameInput.value = userObject.firstname;
    jobInput.value = userObject.profession;
});
addElementButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    validatorAddCardForm.disableSubmitButton();
});
function submitEditProfileForm(evt) {
    evt.preventDefault();
    userInfo.setUserInfo(popupWithFormEditProfile._getInputValues());
    popupWithFormEditProfile.close();
}
function submitAddCardPopup(evt) {
    evt.preventDefault();
    const cardInfo = popupWithFormAddCard._getInputValues();
    let inputNameImage = cardInfo.nameimage;
    let inputSourceImage = cardInfo.path;
    const card = createCard({ name: inputNameImage, link: inputSourceImage }, selectorTemplateCard, handleCardClick);
    const cardElement = card.renderCard();
    defaultCardList.addItem(cardElement);
    popupWithFormAddCard.close();
}
function createCard(item, selector, handleCardClick) {
    return new Card(item, selector, handleCardClick);
}
function createFormValidator(valiadationConfig, form) {
    return new FormValidator(valiadationConfig, form);
}
function handleCardClick(elementImage, elementTitle) {

    popupWithImageCard.open(elementImage, elementTitle);
    popupWithImageCard.setEventListeners();
}
const popupWithImageCard = new PopupWithImage(popupWithImage);
const popupWithFormAddCard = new PopupWithForm(popupAddElement, submitAddCardPopup);
const popupWithFormEditProfile = new PopupWithForm(popupProfileForm, submitEditProfileForm);
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();
const cardListSelector = ".elements";
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item, selectorTemplateCard, handleCardClick);
        const cardElement = card.renderCard();
        defaultCardList.addItem(cardElement);
    }
}, cardListSelector);
defaultCardList.renderer();
const userInfo = new UserInfo('.profile__title', '.profile__profession');
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
/*const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', image: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];
<img src="<%=require('./images/logo.png')%>" alt="Логотип"></img>*/
const api = new Api('cohort-23','71d78780-0adb-4990-8076-8dfa433548e7');
api.getInitialCards()
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
}); 
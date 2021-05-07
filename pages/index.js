import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../scripts/initial-cards.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
const formElement = document.getElementById('popupProfile');
const popupFormElement = document.getElementById('popupFormElement');
const popupProfileForm = document.querySelector('.popup_edit-profile');
const popupDeleteCard = document.querySelector('.popup_delete-card');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="about"]');
const popupIsOpen = document.querySelector('.profile-button');
const popupAddElement = document.querySelector('.popup_add-card');
const addElementButton = document.querySelector('.add-button');
const popupWithImage = document.querySelector('.popup_image');
const selectorTemplateCard = '.template';

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
    nameInput.value = userObject.name;
    jobInput.value = userObject.about;
});
addElementButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    validatorAddCardForm.disableSubmitButton();
});
function submitEditProfileForm(evt) {
    evt.preventDefault();
    api.editUserProfile(popupWithFormEditProfile._getInputValues())
        .then((result) => {
            userInfo.setUserInfo(result);
            popupWithFormEditProfile.close();
        })
        .catch((err) => {
            console.log(err);
            popupWithFormEditProfile.close();
        })
}
function submitAddCardPopup(evt) {
    evt.preventDefault();
    const cardInfo = popupWithFormAddCard._getInputValues();
    let inputNameImage = cardInfo.nameimage;
    let inputSourceImage = cardInfo.path;
    api.addItem({ name: inputNameImage, link: inputSourceImage })
        .then((result) => {

            const card = createCard(result, selectorTemplateCard, handleCardClick, handleLikeClick, handleDeleteIconClick);
            const cardElement = card.renderCard();
            defaultCardList.addItem(cardElement);
            popupWithFormAddCard.close();

        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
            popupWithFormAddCard.close();
        })
    
}
function createCard(item, selector, handleCardClick, handleLikeClick, handleDeleteIconClick) {
    return new Card(item, selector, handleCardClick, handleLikeClick, handleDeleteIconClick);
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
const popupWithDeleteCard = new PopupDeleteCard(popupDeleteCard);
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithDeleteCard.setEventListeners();
const cardListSelector = ".elements";

const userInfo = new UserInfo('.profile__title', '.profile__profession', '.profile__avatar');
const api = new Api('cohort-23', '71d78780-0adb-4990-8076-8dfa433548e7');


const defaultCardList = new Section({
    api,
    renderer: (item) => {

        const card = createCard(item, selectorTemplateCard, handleCardClick, handleLikeClick, handleDeleteIconClick);
        const cardElement = card.renderCard();
        defaultCardList.addItem(cardElement);

    }
}, cardListSelector);
defaultCardList.renderer();
api.getUserProfile()
    .then((result) => {
        userInfo.setUserInfo(result);
    }).catch((err) => {
        console.log(err);
    })
function handleLikeClick(card, elementLike, elementNumberLikes) {

    if (elementLike.classList.contains('element__like-active')) {
        api.deleteLikeClick(card)
            .then((result) => {
                elementNumberLikes.textContent = result.likes.length;
                elementLike.classList.toggle('element__like-active');

            }).catch((err) => {
                console.log(err)
            })

    }
    else {
        api.putLikeClick(card)
            .then((result) => {
                elementNumberLikes.textContent = result.likes.length;
                elementLike.classList.toggle('element__like-active');

            }).catch((err) => {
                console.log(err)
            })
    }


}
function handleDeleteIconClick(card, elementCard) {


    
    popupWithDeleteCard.changeFunctionSubmit(() => {
        
        

        api.deleteCard(card)
            .then((result) => {
                elementCard.remove();
                popupWithDeleteCard.close();
            }).catch((err) => {
                console.log(err);
                popupWithDeleteCard.close();
            })
            popupWithDeleteCard.open();
    })


}


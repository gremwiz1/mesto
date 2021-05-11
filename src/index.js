import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
const formElement = document.getElementById('popupProfile');
const formChangeAvatar = document.getElementById('changeAvatarPopup');
const popupFormElement = document.getElementById('popupFormElement');
const popupProfileForm = document.querySelector('.popup_edit-profile');
const popupDeleteCard = document.querySelector('.popup_delete-card');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="about"]');
const buttonPopupWithChangeAvatar = document.getElementById('buttonChangeAvatar');
const popupIsOpen = document.querySelector('.profile-button');
const popupAddElement = document.querySelector('.popup_add-card');
const popupChangeAvatar = document.querySelector('.popup_change-avatar');
const addElementButton = document.querySelector('.add-button');
const popupWithImage = document.querySelector('.popup_image');
const selectorTemplateCard = '.template';
const imageAvatar = document.querySelector('.profile__avatar');
const buttonImageAvatar = document.querySelector('.profile__button-change-avatar');
const sectionProfile = document.querySelector('.profile__change-avatar');
sectionProfile.addEventListener('mouseover', () => {
    buttonImageAvatar.classList.add('profile__button-change-avatar_active');
    imageAvatar.classList.add('profile__avatar_inactive');
})
sectionProfile.addEventListener('mouseout', () => {
    buttonImageAvatar.classList.remove('profile__button-change-avatar_active');
    imageAvatar.classList.remove('profile__avatar_inactive');
})
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
const validatorChangeAvatarForm = createFormValidator(validationObjectForms, formChangeAvatar);
validatorChangeAvatarForm.enableValidation();
buttonPopupWithChangeAvatar.addEventListener('click', () => {
    popupWithChangeAvatar.open();
    validatorChangeAvatarForm.disableSubmitButton();
})
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
    popupWithFormEditProfile.load('Сохранение...');
    api.editUserProfile(popupWithFormEditProfile._getInputValues())
        .then((result) => {
            userInfo.setUserInfo(result);
            popupWithFormEditProfile.close();
        })
        .catch((err) => {
            console.log(err);
            popupWithFormEditProfile.close();
        }).finally(() => {
            popupWithFormEditProfile.load('Сохранить');
        })
}
function submitAddCardPopup(cardinfo) {
    let inputNameImage = cardInfo.nameimage;
    let inputSourceImage = cardInfo.path;
    popupWithFormAddCard.load('Сохранение...');
    api.addItem({ name: inputNameImage, link: inputSourceImage })
        .then((result) => {

            const card = createCard(result, selectorTemplateCard, handleCardClick, handleLikeClick, handleDeleteIconClick);
            const cardElement = card.renderCard();
            defaultCardList.addItem(cardElement);
            popupWithFormAddCard.close();

        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
            popupWithFormAddCard.close();
        }).finally(() => {
            popupWithFormAddCard.load('Сохранить');
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
const popupWithChangeAvatar = new PopupWithForm(popupChangeAvatar, submitChangeAvatar);
popupWithFormAddCard.setEventListeners();
popupWithFormEditProfile.setEventListeners();
popupWithDeleteCard.setEventListeners();
popupWithChangeAvatar.setEventListeners();
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
        popupWithDeleteCard.load('Удаление...');




        api.deleteCard(card)
            .then(() => {
                elementCard.remove();
                popupWithDeleteCard.close();
            }).catch((err) => {
                console.log(err);
                popupWithDeleteCard.close();
            }).finally(() => {
                popupWithDeleteCard.load('Да');
            })

    })
    popupWithDeleteCard.open();

}
function submitChangeAvatar(evt) {
    evt.preventDefault();
    popupWithChangeAvatar.load('Сохранение...');
    api.changeAvatarImage(popupWithChangeAvatar._getInputValues())
        .then((result) => {
            userInfo.setUserInfo(result);
            popupWithChangeAvatar.close();
        })
        .catch((err) => {
            console.log(err);
            popupWithChangeAvatar.close();
        }).finally(() => {
            popupWithChangeAvatar.load('Сохранить');
        })

}

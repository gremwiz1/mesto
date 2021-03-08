let formElement = document.getElementById('poppupProfile');
let poppup = document.querySelector('.poppup');
let nameInput = document.querySelector('input[name="firstname"]');
let jobInput = document.querySelector('input[name="profession"]');
let poppupIsClose = document.querySelectorAll('.poppup__button-close');
let poppupIsOpen = document.querySelector('.profile-button');
let profileTitle = document.querySelector('.profile__title');
let profileProfession = document.querySelector('.profile__profession');
const poppupAddElement = document.getElementById('poppupElement');
const addElementButton = document.querySelector('.add-button');
const poppupWithImage = document.getElementById('imagepopup');
const poppupImage = document.querySelector('.poppup__image');
const poppupText = document.querySelector('.poppup__text');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
const templateElement = document.querySelector('.template');
const container = document.querySelector('.elements');
renderElements();
function renderElements() {
const result = initialCards.map(createTemplateElement);
container.append(...result);
}
function createTemplateElement(item) {
    const newItem = templateElement.content.cloneNode(true);
    const elementTitle = newItem.querySelector('.element__title');
    const elementImage = newItem.querySelector('.element__image');
    const elementLike = newItem.querySelector('.element__like');
    const elementButtonDelete = newItem.querySelector('.element__button-delete');
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;
    elementImage.addEventListener('click',() =>{imagePopup(elementImage, elementTitle)});
    elementLike.addEventListener('click',() => {changeLikeElement(elementLike)});
    elementButtonDelete.addEventListener('click', () => {deleteElement(elementButtonDelete)})

    return newItem;
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    poppupClose(evt.target.parentNode.parentNode);
}
function poppupClose(poppup) {
    poppup.classList.remove('poppup_opened');
   
}
function poppupOpen(poppup) {
    poppup.classList.add('poppup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileProfession.textContent;
}
formElement.addEventListener('submit', formSubmitHandler);
poppupIsOpen.addEventListener('click', () => {poppupOpen(poppup)});
addElementButton.addEventListener('click',() => {poppupOpen(poppupAddElement)});
[].forEach.call(poppupIsClose, function(item) {
    item.addEventListener('click', () => {poppupClose(item.parentNode.parentNode)});
});
function changeLikeElement(item) {
item.classList.toggle('.element__like:active');
}
function imagePopup(item, text) {
poppupWithImage.classList.add('poppup_opened');    

poppupImage.src = item.src;
poppupImage.alt = item.alt;
poppupText.textContent = text.textContent;
}
function deleteElement(item) {
const elementDelete = item.parentNode;
elementDelete.remove();
}
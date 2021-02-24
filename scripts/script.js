let formElement = document.querySelector('.poppup__container');
let poppup = document.querySelector('.poppup');
let nameInput = document.querySelector('input[name="firstname"]');
let jobInput = document.querySelector('input[name="profession"]');
let poppupIsClose = document.querySelector('.poppup-container__button-close');
let poppupIsOpen = document.querySelector('.profile-button');
let profileTitle = document.querySelector('.profile__title');
let profileProfession = document.querySelector('.profile__profession');
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    poppupClose();
}
function poppupClose() {
    poppup.classList.remove('poppup_opened');
}
function poppupOpen() {
    poppup.classList.add('poppup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileProfession.textContent;
}
poppupIsClose.addEventListener('click', poppupClose);
formElement.addEventListener('submit', formSubmitHandler);
poppupIsOpen.addEventListener('click', poppupOpen);
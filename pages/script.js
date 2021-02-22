let formElement = document.querySelector('.poppup-container');
let poppup = document.querySelector('.poppup');
let formelements = document.querySelectorAll('.poppup-container__name');

let nameInput = formelements[0];
let jobInput = formelements[1];
let poppup_close = document.querySelector('.poppup-container__button-close');
let poppup_open = document.querySelector('.profile-button');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profile__title = document.querySelector('.profile__title');
    let profile__profession = document.querySelector('.profile__profession');
    profile__title.textContent = nameInput.value;
    profile__profession.textContent = jobInput.value;
    
    poppup.classList.remove ('poppup__opened');
    

    
}
function poppupClose () {
    
    poppup.classList.remove('poppup__opened');
    
    

}
function poppupOpen () {
    poppup.classList.add('poppup__opened');
    
}
formElement.addEventListener('submit', formSubmitHandler); 
poppup_close.addEventListener('click', poppupClose);
poppup_open.addEventListener('click', poppupOpen);
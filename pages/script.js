let formElement = document.querySelector('.poppup-container');
let poppup = document.querySelector('.poppup');
let formelements = document.querySelectorAll('.poppup-container__name');
let flag = false;
let nameInput = formelements[0];
let jobInput = formelements[1];
let poppup_close = document.querySelector('.poppup-container__button-close');
let poppup_open = document.querySelector('.profile-button');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profile__title = document.querySelector('.profile__title');
    let profile__profession = document.querySelector('.profile__profession');
    if(flag) {
        flag = false;
    }
    else {
        profile__title.textContent = nameInput.value;
        profile__profession.textContent = jobInput.value;
          
    }
    
    
    poppup.classList.remove ('poppup__opened');
    

    
}
function poppupClose () {
    
    poppup.classList.remove('poppup__opened');
    flag = true;
    
    

}
function poppupOpen () {
    poppup.classList.add('poppup__opened');
    
}
poppup_close.addEventListener('click', poppupClose);
formElement.addEventListener('submit', formSubmitHandler); 

poppup_open.addEventListener('click', poppupOpen);
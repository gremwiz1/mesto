  const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setFormResetListeners(formElement,rest);
        setInputListeners(formElement,rest);
    });
};
const setInputListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
   
    inputList.forEach( inputElement => {
        inputElement.addEventListener('input', () => {
            checkInput(inputElement,rest);
            toggleButtonState(submitButton, inactiveButtonClass, inputList);
        });
        toggleButtonState(submitButton, inactiveButtonClass, inputList);
    })
}
const checkInput = (inputElement,{ ...rest}) => {
    if(inputElement.validity.valid) {
        hideInputError(inputElement,rest);
    }
    else {
        showInputError(inputElement,rest);
    }
}
const showInputError = (inputElement, {errorClass, inputErrorClass}) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
};
const hideInputError = (inputElement, {errorClass, inputErrorClass}) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
};
const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
    if(hasInvalidInput(inputList) || allInputsEmpty(inputList) ){
        submitButton.classList.add(inactiveButtonClass);
        submitButton.setAttribute('disabled', true);
    }
    else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};
const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => {
      return inputElement.value.length >0
    })
};
const setFormResetListeners = (formElement, {inputSelector, ...rest}) => {
    formElement.addEventListener('reset', (event) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        inputList.forEach( inputElement => {
            hideInputError(inputElement,rest);
        })
    })
}
enableValidation({
    formSelector: '.popup-container',
    inputSelector: '.popup-container__name',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_disabled',
    inputErrorClass: 'popup-container__input-error',
    errorClass: 'popup__error_visible'
  });
export class FormValidator {
    constructor (item, form) {
        this._inputSelector = item.inputSelector;
        this._submitButtonSelector = item.submitButtonSelector;
        this._inactiveButtonClass = item.inactiveButtonClass;
        this._inputErrorClass = item.inputErrorClass;
        this._errorClass = item.errorClass;
        this._form = form;
    }
    enableValidation ()  {
            this._form.addEventListener('submit', (event) => {
                event.preventDefault();});
            this._setFormResetListeners();
            this._setInputListeners();
    };
    _setInputListeners()  {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const submitButton = this._form.querySelector(this._submitButtonSelector);
       inputList.forEach( inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState(submitButton, inputList);
            });
            this._toggleButtonState(submitButton, inputList);
        })
    }
    _checkInput (inputElement) {
        if(inputElement.validity.valid) {
            this._hideInputError(inputElement);
        }
        else {
            this._showInputError(inputElement);
        }
    }
    _showInputError (inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    };
    _hideInputError (inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    };
    _toggleButtonState (submitButton, inputList) {
        if(this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList) ){
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.setAttribute('disabled', true);
        }
        else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        }
    };
    _hasInvalidInput (inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    };
    _allInputsEmpty (inputList) {
        return !inputList.some(inputElement => {
          return inputElement.value.length >0
        })
    };
    _setFormResetListeners () {
        
        this._form.addEventListener('reset', (event) => {
            const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
            inputList.forEach( inputElement => {
                this._hideInputError(inputElement);
                
            })
        })
    }
  

}
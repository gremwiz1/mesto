export class FormValidator {
    constructor(valiadationConfig, form) {
        this._inputSelector = valiadationConfig.inputSelector;
        this._submitButtonSelector = valiadationConfig.submitButtonSelector;
        this._inactiveButtonClass = valiadationConfig.inactiveButtonClass;
        this._inputErrorClass = valiadationConfig.inputErrorClass;
        this._errorClass = valiadationConfig.errorClass;
        this._form = form;
        this._submitButton = form.querySelector(valiadationConfig.submitButtonSelector);
        this._inputList = Array.from(form.querySelectorAll(valiadationConfig.inputSelector));
    }
    enableValidation() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._setFormResetListeners();
        this._setInputListeners();
    };
    _setInputListeners() {

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            });
            this._toggleButtonState();
        })
    }
    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        }
        else {
            this._showInputError(inputElement);
        }
    }
    _showInputError(inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    };
    _hideInputError(inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    };
    _toggleButtonState() {
        if (this._hasInvalidInput() || this._allInputsEmpty()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.setAttribute('disabled', true);
        }
        else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.removeAttribute('disabled');
        }
    };
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    };
    _allInputsEmpty() {
        return !this._inputList.some(inputElement => {
            return inputElement.value.length > 0
        })
    };
    _setFormResetListeners() {

        this._form.addEventListener('reset', (event) => {

            this._inputList.forEach(inputElement => {
                this._hideInputError(inputElement);

            })
        })
    }
    disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disbaled = true;
    }


}
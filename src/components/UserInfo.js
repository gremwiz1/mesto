export class UserInfo {
    constructor(nameUserSelector, professionUserSelector, imageSelector) {
        this._nameUserElement = document.querySelector(nameUserSelector);
        this._professionUserElement = document.querySelector(professionUserSelector);
        this._imageSelector = document.querySelector(imageSelector);
    }
    getUserInfo() {
        this._user = {
            name: this._nameUserElement.textContent,
            about: this._professionUserElement.textContent
        }
        return this._user;
    }
    setUserInfo(userData) {
        this._nameUserElement.textContent = userData.name;
        this._professionUserElement.textContent = userData.about;
        this._imageSelector.src = userData.avatar;
    }
}
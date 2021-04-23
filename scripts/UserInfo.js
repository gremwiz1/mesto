export class UserInfo {
    constructor(nameUserSelector, professionUserSelector) {
        this._nameUserElement = document.querySelector(nameUserSelector);
        this._professionUserElement = document.querySelector(professionUserSelector);
    }
    getUserInfo() {
        this._user = {
            firstname: this._nameUserElement.textContent,
            profession: this._professionUserElement.textContent
        }
        return this._user;
    }
    setUserInfo(userData) {
        this._nameUserElement.textContent = userData.firstname;
        this._professionUserElement.textContent = userData.profession;
    }
}
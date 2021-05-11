export class Section {
    constructor({api, renderer}, containerSelector) {
        
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }
    renderer() {
        
        this._api.getInitialCards()
        .then((result) => {
            result.map((item) => {
                this._renderer(item);
            })
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
        
    }
    addItem(element) {
        this._container.prepend(element);
    }
}

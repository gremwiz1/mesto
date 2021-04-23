export class Section {
    constructor({items, renderer},containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderer() {
       this._items.map(item => {
            this._renderer(item);
          });
    }
    addItem(element) {
        this._container.append(element);
    }
}
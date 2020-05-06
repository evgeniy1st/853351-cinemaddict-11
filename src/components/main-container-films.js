import {createElement} from "../utils";

const createMainContainerFilms = () => {
  return (
    `<section class="films">
    </section>`
  );
};


export default class MainContainerFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainContainerFilms();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

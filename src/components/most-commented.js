import {createElement} from "../utils";

const createMostCommented = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      </section>`
  );
};

export default class MostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommented(this._film);
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

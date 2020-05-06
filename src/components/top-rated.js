import {createElement} from "../utils";

export const createTopRated = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      </section>`
  );
};

export default class TopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRated();
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

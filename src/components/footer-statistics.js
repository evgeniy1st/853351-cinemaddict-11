import {createElement} from "../utils";

const createFooterStatistics = (qnt) => {
  return (
    `<p>${qnt} movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor(qnt) {
    this._statistics = qnt;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._statistics);
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

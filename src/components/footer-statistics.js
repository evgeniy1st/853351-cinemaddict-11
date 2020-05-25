import AbstractComponent from "./abstract-component";

const createFooterStatistics = (quantity) => {
  return (
    `<p>${quantity} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(quantity) {
    super();
    this._statistics = quantity;
  }

  getTemplate() {
    return createFooterStatistics(this._statistics);
  }
}

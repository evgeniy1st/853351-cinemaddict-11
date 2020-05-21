import AbstractComponent from "./abstract-component";

const createFooterStatistics = (qnt) => {
  return (
    `<p>${qnt} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(qnt) {
    super();
    this._statistics = qnt;
  }

  getTemplate() {
    return createFooterStatistics(this._statistics);
  }
}

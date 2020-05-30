import AbstractComponent from "./abstract-component";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const createSorting = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type ="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type ="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type ="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor(films) {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._films = films;
  }

  getTemplate() {
    return createSorting();
  }

  getSortType() {
    return this._currenSortType;
  }

  setSortTypeChangeHandler(handler) {
    const parentEl = this.getElement();
    parentEl.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      const sortingButtons = parentEl.querySelectorAll(`.sort__button`);
      sortingButtons.forEach((it) => {
        if (it.classList.contains(`sort__button--active`)) {
          it.classList.remove(`sort__button--active`);
        }
      });

      evt.target.classList.add(`sort__button--active`);
      this._currenSortType = sortType;

      handler(this._currenSortType, this._films);
    });
  }
}

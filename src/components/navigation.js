import AbstractComponent from "./abstract-component";

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const createNavigation = (watchlist, history, favorites) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type ="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type ="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" data-filter-type ="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
        <a href="#favorites" data-filter-type ="${FilterType.FAVORITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor(watchlist, history, favorites) {
    super();

    this._watchlist = watchlist;
    this._history = history;
    this._favorites = favorites;
    this._currenFilterType = FilterType.ALL;
  }

  getTemplate() {
    return createNavigation(this._watchlist, this._history, this._favorites);
  }

  getFilterType() {
    return this._currenFilterType;
  }

  setFilterTypeChangeHandler(handler) {
    const parentEl = this.getElement();
    parentEl.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currenFilterType === filterType) {
        return;
      }

      const filterButtons = parentEl.querySelectorAll(`.main-navigation__item`);
      filterButtons.forEach((it) => {
        if (it.classList.contains(`main-navigation__item--active`)) {
          it.classList.remove(`main-navigation__item--active`);
        }
      });

      evt.target.classList.add(`main-navigation__item--active`);
      this._currenFilterType = filterType;

      handler(this._currenFilterType);
    });
  }
}

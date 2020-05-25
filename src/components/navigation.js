import AbstractComponent from "./abstract-component";

const createNavigation = (watchlist, history, favorites) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
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
  }

  getTemplate() {
    return createNavigation(this._watchlist, this._history, this._favorites);
  }
}

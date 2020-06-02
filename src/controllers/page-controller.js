import FilmsListContainer from "../components/films-list-container";
import FilmController from "./film-controller";
import NoFilms from "../components/no-films";
import {render, renderPosition, remove} from "../utils/render";
import ShowMoreButton from "../components/show-more-button";
import Sorting, {SortType} from "../components/sorting";
import {QUANTITY_FILM_CARDS} from "../constants";
import Navigation, {FilterType} from "../components/navigation";

const renderFilms = (container, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new FilmController(container, onDataChange);

    filmController.renderFilm(film);

    return filmController;
  });
};

export default class PageController {
  constructor(container, films) {
    this._filmsListContainer = new FilmsListContainer();
    this._showingFilmCount = QUANTITY_FILM_CARDS;
    this._films = films;
    this._container = container;
    this._sorting = new Sorting();
    this._quantityWatchlist = films.slice().filter((it) => {
      return it.isWatchlist === true;
    }).length;
    this._quantityHistory = films.slice().filter((it) => {
      return it.isHistory === true;
    }).length;
    this._quantityFavorites = films.slice().filter((it) => {
      return it.isFavorite === true;
    }).length;
    this._navigation = new Navigation(this._quantityWatchlist, this._quantityHistory, this._quantityFavorites);
    this._filmCount = 0;
    this._currentFilter = FilterType.ALL;
    this._currentSort = SortType.DEFAULT;
    this._filmsListForDecreasing = films.slice();
    this._onDataChange = this.onDataChange.bind(this);
  }

  onDataChange(evt, filmController, oldData, newData) {
    evt.preventDefault();
    evt.stopPropagation();
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.renderFilm(this._films[index]);
  }

  renderFilmCards(films) {
    let currentFilms = films.slice(this._filmCount, this._filmCount + QUANTITY_FILM_CARDS);
    renderFilms(this._filmsListContainer.getElement(), currentFilms, this._onDataChange);
    this._filmCount += QUANTITY_FILM_CARDS;
  }

  renderStartFilmCards(films, container) {
    this._filmCount = 0;
    if (films.length === 0) {
      render(this._filmsListContainer.getElement(), new NoFilms(), renderPosition.BEFOREEND);
      return;
    }
    this._filmsListContainer.getElement().innerHTML = ``;
    this.renderFilmCards(films);
    render(container, this._sorting, renderPosition.AFTERBEGIN);
    render(container, this._navigation, renderPosition.AFTERBEGIN);

    if (container.querySelector(`.films-list__show-more`)) {
      container.querySelector(`.films-list__show-more`).remove();
    }

    this._sorting.setSortTypeChangeHandler((sortType) => {
      this._currentSort = sortType;
      this.renderMainContent();
    });

    this._navigation.setFilterTypeChangeHandler((filterType) => {
      this._currentFilter = filterType;
      this.renderMainContent();
    });

    const showMoreButton = new ShowMoreButton();

    render(container, showMoreButton, renderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this.renderFilmCards(this._filmsListForDecreasing);
      if (films.length <= this._filmCount) {
        remove(showMoreButton);
        showMoreButton.removeElement();
      }
    });
  }

  returnInitialState() {
    this._filmsListForDecreasing = this._films.slice();
  }

  applyFilter() {
    switch (`${this._currentFilter}`) {
      case `${FilterType.WATCHLIST}`:
        this._filmsListForDecreasing = this._filmsListForDecreasing.filter((it) => it.isWatchlist === true);
        break;
      case `${FilterType.HISTORY}`:
        this._filmsListForDecreasing = this._filmsListForDecreasing.filter((it) => it.isHistory === true);
        break;
      case `${FilterType.FAVORITES}`:
        this._filmsListForDecreasing = this._filmsListForDecreasing.filter((it) => it.isFavorite === true);
        break;
      default:
        return;
    }
  }

  applySort() {
    switch (`${this._currentSort}`) {
      case `${SortType.DATE}`:
        this._filmsListForDecreasing.sort((a, b) => b.year - a.year);
        break;
      case `${SortType.RATING}`:
        this._filmsListForDecreasing.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return;
    }
  }

  renderMainContent() {
    this.returnInitialState();
    this.applyFilter();
    this.applySort();
    render(this._container, this._filmsListContainer, renderPosition.BEFOREEND);
    this.renderStartFilmCards(this._filmsListForDecreasing, this._container);
  }
}

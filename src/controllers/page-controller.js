import Comment from "../components/comments";
import FilmsListContainer from "../components/films-list-container";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import NoFilms from "../components/no-films";
import {render, renderPosition, remove} from "../utils/render";
import ShowMoreButton from "../components/show-more-button";
import Sorting, {SortType} from "../components/sorting";
import {QUANTITY_FILM_CARDS} from "../constants";

const body = document.querySelector(`body`);
const filmsListContainer = new FilmsListContainer();

export default class PageController {
  constructor(container) {
    this.container = container;
    this._sorting = new Sorting();
    this._filmCount = 0;
  }

  renderOneCard(film, container) {
    const popup = new FilmDetails(film).getElement();
    const commentsContainer = popup.querySelector(`.film-details__comments-list`);
    film.comments.forEach((it) => {
      commentsContainer.appendChild(new Comment(it).getElement());
    });
    const filmCard = new FilmCard(film);

    filmCard.setClickHandler(() => {
      body.appendChild(popup);

      const closePopupBtn = popup.querySelector(`.film-details__close-btn`);
      const closePopup = () => {
        body.removeChild(popup);
      };
      const onClosePopupBtnClick = () => {
        closePopup();
        closePopupBtn.removeEventListener(`click`, onClosePopupBtnClick);
        document.removeEventListener(`keydown`, onDocumentKeydown);
      };

      closePopupBtn.addEventListener(`click`, onClosePopupBtnClick);
      const onDocumentKeydown = (evt) => {
        if (evt.keyCode === 27) {
          closePopup();
          document.removeEventListener(`keydown`, onDocumentKeydown);
          closePopupBtn.removeEventListener(`click`, onClosePopupBtnClick);
        }
      };
      document.addEventListener(`keydown`, onDocumentKeydown);
    });
    render(container, filmCard, renderPosition.BEFOREEND);
  }

  renderFilmCards(films) {
    films.slice(this._filmCount, this._filmCount + QUANTITY_FILM_CARDS).forEach((it) => {
      this.renderOneCard(it, filmsListContainer.getElement());
    });
    this._filmCount += QUANTITY_FILM_CARDS;
  }

  renderStartFilmCards(films, container) {
    this._filmCount = 0;
    if (films.length === 0) {
      render(filmsListContainer.getElement(), new NoFilms(), renderPosition.BEFOREEND);
      return;
    }
    filmsListContainer.getElement().innerHTML = ``;
    this.renderFilmCards(films);
    render(container, this._sorting, renderPosition.AFTERBEGIN);

    if (container.querySelector(`.films-list__show-more`)) {
      container.querySelector(`.films-list__show-more`).remove();
    }

    this._sorting.setSortTypeChangeHandler((sortType) => {
      switch (sortType) {
        case SortType.DATE:
          this.renderMainContent(films.slice().sort((a, b) => a.year - b.year));
          break;

        case SortType.RATING:
          this.renderMainContent(films.slice().sort((a, b) => a.rating - b.rating));
          break;

        default:
          this.renderMainContent(films);
      }
    });

    const showMoreButton = new ShowMoreButton();

    render(container, showMoreButton, renderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this.renderFilmCards(films);
      if (films.length <= this._filmCount) {
        remove(showMoreButton);
        showMoreButton.removeElement();
      }
    });
  }

  renderMainContent(films) {
    render(this.container, filmsListContainer, renderPosition.BEFOREEND);
    this.renderStartFilmCards(films, this.container);
  }
}

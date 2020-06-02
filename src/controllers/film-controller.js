import Comment from "../components/comments";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, renderPosition} from "../utils/render";

const body = document.querySelector(`body`);

export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._filmComponent = null;
    this._popup = null;
    this._onDataChange = onDataChange;
  }

  renderFilm(film) {
    this._popup = new FilmDetails(film).getElement();
    const commentsContainer = this._popup.querySelector(`.film-details__comments-list`);
    film.comments.forEach((it) => {
      commentsContainer.appendChild(new Comment(it).getElement());
    });
    this._filmComponent = new FilmCard(film);

    this._filmComponent.setWatchlistButtonClickHandler((evt) => {
      this._onDataChange(evt, this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    });

    this._filmComponent.setHistoryButtonClickHandler((evt) => {
      this._onDataChange(evt, this, film, Object.assign({}, film, {
        isHistory: !film.isHistory
      }));
    });

    this._filmComponent.setFavoritesButtonClickHandler((evt) => {
      this._onDataChange(evt, this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    this._filmComponent.setClickHandler(() => {
      body.appendChild(this._popup);

      const closePopupBtn = this._popup.querySelector(`.film-details__close-btn`);
      const closePopup = () => {
        body.removeChild(this._popup);
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

    render(this._container, this._filmComponent, renderPosition.BEFOREEND);
  }
}

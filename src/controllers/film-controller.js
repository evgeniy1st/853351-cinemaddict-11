import Comment from "../components/comments";
import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import {render, renderPosition} from "../utils/render";

const body = document.querySelector(`body`);

export default class FilmController {
  constructor(container) {
    this._container = container;
  }

  renderFilm(film) {
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
    render(this._container, filmCard, renderPosition.BEFOREEND);
  }
}

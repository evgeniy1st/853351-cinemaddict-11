import AbstractComponent from "./abstract-component";

const createFilmCard = (obj) => {
  const description = obj.description.length >= 140 ? obj.description.slice(0, 138) + `...` : obj.description;
  const activeCSSClass = `film-card__controls-item--active`;
  return (
    `<article class="film-card" data-index="${obj.index}">
      <h3 class="film-card__title">${obj.title}</h3>
      <p class="film-card__rating">${obj.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${obj.year}</span>
        <span class="film-card__duration">${obj.duration}</span>
        <span class="film-card__genre">${obj.genres[0]}</span>
      </p>
      <img src="./images/posters/${obj.poster}" alt="${obj.poster}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${obj.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${obj.isWatchlist ? activeCSSClass : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${obj.isHistory ? activeCSSClass : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${obj.isFavorite ? activeCSSClass : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(obj) {
    super();
    this._film = obj;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

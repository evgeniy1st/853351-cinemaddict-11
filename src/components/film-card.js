import {getRandomInt} from "../utils";
import {getRandomFloat} from "../utils";
import {titles} from "../mocks/film-card";
import {genres} from "../mocks/film-card";
import {posters} from "../mocks/film-card";
import {descriptions} from "../mocks/film-card";
import {comments} from "../mocks/film-card";

const generateFilmInfo = () => {
  const film = {
    title: titles[getRandomInt(0, titles.length - 1)],
    rating: getRandomFloat(1, 10).toFixed(1),
    year: getRandomInt(1940, 2020),
    duration: `${getRandomInt(1, 2)}h ${getRandomInt(0, 59)}m`,
    genre: genres[getRandomInt(0, genres.length - 1)],
    poster: posters[getRandomInt(0, posters.length - 1)],
    description: descriptions[getRandomInt(0, descriptions.length - 1)],
    getComments(count) {
      const commentsList = [];
      for (let i = 0; i < count; i++) {
        let currentComment = comments[getRandomInt(0, comments.length - 1)];
        commentsList.push(currentComment);
      }
      return commentsList;
    }
  };
  return film;
};

export const createFilmCard = () => {
  const filmInfo = generateFilmInfo();
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmInfo.year}</span>
        <span class="film-card__duration">${filmInfo.duration}</span>
        <span class="film-card__genre">${filmInfo.genre}</span>
      </p>
      <img src="./images/posters/${filmInfo.poster}" alt="${filmInfo.poster}" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description.slice(0, 138)}...</p>
      <a class="film-card__comments">${filmInfo.getComments(getRandomInt(1, 10)).length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

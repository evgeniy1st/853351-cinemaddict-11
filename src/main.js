import {createUserRank} from "./components/user-rank";
import {createNavigation} from "./components/navigation";
import {createSorting} from "./components/sorting";
import {createMainContainerFilms} from "./components/main-container-films";
import {createSectionFilmsList} from "./components/section-films-list";
import {createTopRated} from "./components/top-rated";
import {createMostCommented} from "./components/most-commented";
import {createFilmsListContainer} from "./components/films-list-container";
import {createShowMoreButton} from "./components/show-more-button";
import {createFilmCard} from "./components/film-card";
import {createFilmDetails} from "./components/film-details";
import {createFooterStatistics} from "./components/footer-statistics";
import {getFilms} from "./mocks/film-card";
import {QUANTITY_FILM_EXTRA} from "./constants";
import {QUANTITY_FILM_CARDS} from "./constants";

const films = getFilms();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);

let qntWatchlist = films.slice().filter((it) => {
  return it.isWatchlist === true;
}).length;
let qntHistory = films.slice().filter((it) => {
  return it.isHistory === true;
}).length;
let qntFavorites = films.slice().filter((it) => {
  return it.isFavorite === true;
}).length;

render(header, createUserRank(), `beforeend`);
render(main, createNavigation(qntWatchlist, qntHistory, qntFavorites), `beforeend`);
render(main, createSorting(), `beforeend`);
render(main, createMainContainerFilms(), `beforeend`);

const mainContainerFilms = main.querySelector(`.films`);

render(mainContainerFilms, createSectionFilmsList(), `beforeend`);
render(mainContainerFilms, createTopRated(), `beforeend`);
render(mainContainerFilms, createMostCommented(), `beforeend`);

const sectionFilmsList = mainContainerFilms.querySelector(`.films-list`);
const sectionsFilmListExtra = mainContainerFilms.querySelectorAll(`.films-list--extra`);

render(sectionFilmsList, createFilmsListContainer(), `beforeend`);


const filmsListContainer = sectionFilmsList.querySelector(`.films-list__container`);

let filmsListForDecreasing = films.slice();

const renderFilmCards = () => {
  filmsListContainer.innerHTML = ``;
  filmsListForDecreasing.splice(0, QUANTITY_FILM_CARDS).forEach((it) => {
    render(filmsListContainer, createFilmCard(it), `beforeend`);
  });

  if (sectionFilmsList.querySelector(`.films-list__show-more`)) {
    sectionFilmsList.querySelector(`.films-list__show-more`).remove();
  }

  render(sectionFilmsList, createShowMoreButton(), `beforeend`);

  const showMoreButton = sectionFilmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    filmsListForDecreasing.splice(0, QUANTITY_FILM_CARDS).forEach((it) => {
      render(filmsListContainer, createFilmCard(it), `beforeend`);
    });
    if (filmsListForDecreasing.length <= 0) {
      showMoreButton.remove();
    }
  });
};

renderFilmCards();

const defaultButton = main.querySelector(`[href="#all"]`);
const watchlistButton = main.querySelector(`[href="#watchlist"]`);
const historyButton = main.querySelector(`[href="#history"]`);
const favoritesButton = main.querySelector(`[href="#favorites"]`);

defaultButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  main.querySelectorAll(`.main-navigation__item`).forEach((it) => {
    it.classList.remove(`main-navigation__item--active`);
  });
  defaultButton.classList.add(`main-navigation__item--active`);
  filmsListForDecreasing = films.slice();

  renderFilmCards();
});

watchlistButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  main.querySelectorAll(`.main-navigation__item`).forEach((it) => {
    it.classList.remove(`main-navigation__item--active`);
  });
  watchlistButton.classList.add(`main-navigation__item--active`);
  filmsListForDecreasing = films.slice().filter((it) => {
    return it.isWatchlist === true;
  });

  renderFilmCards();
});

historyButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  main.querySelectorAll(`.main-navigation__item`).forEach((it) => {
    it.classList.remove(`main-navigation__item--active`);
  });
  historyButton.classList.add(`main-navigation__item--active`);
  filmsListForDecreasing = films.slice().filter((it) => {
    return it.isHistory === true;
  });

  renderFilmCards();
});

favoritesButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  main.querySelectorAll(`.main-navigation__item`).forEach((it) => {
    it.classList.remove(`main-navigation__item--active`);
  });
  favoritesButton.classList.add(`main-navigation__item--active`);
  filmsListForDecreasing = films.slice().filter((it) => {
    return it.isFavorite === true;
  });

  renderFilmCards();
});

render(sectionsFilmListExtra[0], createFilmsListContainer(), `beforeend`);

let filmsListContainerExtra = sectionsFilmListExtra[0].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.rating) - parseFloat(a.rating);
})
.slice(0, QUANTITY_FILM_EXTRA)
.forEach((it) => {
  render(filmsListContainerExtra, createFilmCard(it), `beforeend`);
});

render(sectionsFilmListExtra[1], createFilmsListContainer(), `beforeend`);

filmsListContainerExtra = sectionsFilmListExtra[1].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.comments.length) - parseFloat(a.comments.length);
})
  .slice(0, QUANTITY_FILM_EXTRA)
  .forEach((it) => {
    render(filmsListContainerExtra, createFilmCard(it), `beforeend`);
  });

const footerStatistics = document.querySelector(`.footer__statistics`);

render(footerStatistics, createFooterStatistics(films.length), `beforeend`);

mainContainerFilms.addEventListener(`click`, function (evt) {
  if (evt.target.parentElement.classList.contains(`film-card`)) {
    render(body, createFilmDetails(films[evt.target.parentElement.dataset.index]), `beforeend`);

    const filmDetails = body.querySelector(`.film-details`);
    const closePopupBtn = filmDetails.querySelector(`.film-details__close-btn`);
    const closeBtnClickHandler = () => {
      body.removeChild(filmDetails);
    };
    closePopupBtn.addEventListener(`click`, closeBtnClickHandler);
  }
});


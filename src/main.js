import UserRank from "./components/user-rank";
import Navigation from "./components/navigation";
import Sorting from "./components/sorting";
import MainContainerFilms from "./components/main-container-films";
import SectionFilmsList from "./components/section-films-list";
import TopRated from "./components/top-rated";
import MostCommented from "./components/most-commented";
import FilmsListContainer from "./components/films-list-container";
import ShowMoreButton from "./components/show-more-button";
import FilmCard from "./components/film-card";
import FilmDetails from "./components/film-details";
import FooterStatistics from "./components/footer-statistics";
import {getFilms} from "./mocks/film-card";
import {QUANTITY_FILM_EXTRA} from "./constants";
import {QUANTITY_FILM_CARDS} from "./constants";
import {render, renderPosition} from "./utils";

const films = getFilms();

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

render(header, new UserRank().getElement(), renderPosition.BEFOREEND);
render(main, new Navigation(qntWatchlist, qntHistory, qntFavorites).getElement(), renderPosition.BEFOREEND);
render(main, new Sorting().getElement(), renderPosition.BEFOREEND);
render(main, new MainContainerFilms().getElement(), renderPosition.BEFOREEND);

const mainContainerFilms = main.querySelector(`.films`);

render(mainContainerFilms, new SectionFilmsList().getElement(), renderPosition.BEFOREEND);
render(mainContainerFilms, new TopRated().getElement(), renderPosition.BEFOREEND);
render(mainContainerFilms, new MostCommented().getElement(), renderPosition.BEFOREEND);

const sectionFilmsList = mainContainerFilms.querySelector(`.films-list`);
const sectionsFilmListExtra = mainContainerFilms.querySelectorAll(`.films-list--extra`);

render(sectionFilmsList, new FilmsListContainer().getElement(), renderPosition.BEFOREEND);


const filmsListContainer = sectionFilmsList.querySelector(`.films-list__container`);

let filmsListForDecreasing = films.slice();

const renderFilmCards = () => {
  filmsListContainer.innerHTML = ``;
  filmsListForDecreasing.splice(0, QUANTITY_FILM_CARDS).forEach((it) => {
    render(filmsListContainer, new FilmCard(it).getElement(), renderPosition.BEFOREEND);
  });

  if (sectionFilmsList.querySelector(`.films-list__show-more`)) {
    sectionFilmsList.querySelector(`.films-list__show-more`).remove();
  }

  render(sectionFilmsList, new ShowMoreButton().getElement(), renderPosition.BEFOREEND);

  const showMoreButton = sectionFilmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    filmsListForDecreasing.splice(0, QUANTITY_FILM_CARDS).forEach((it) => {
      render(filmsListContainer, new FilmCard(it).getElement(), renderPosition.BEFOREEND);
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

render(sectionsFilmListExtra[0], new FilmsListContainer().getElement(), renderPosition.BEFOREEND);

let filmsListContainerExtra = sectionsFilmListExtra[0].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.rating) - parseFloat(a.rating);
})
.slice(0, QUANTITY_FILM_EXTRA)
.forEach((it) => {
  render(filmsListContainerExtra, new FilmCard(it).getElement(), renderPosition.BEFOREEND);
});

render(sectionsFilmListExtra[1], new FilmsListContainer().getElement(), renderPosition.BEFOREEND);

filmsListContainerExtra = sectionsFilmListExtra[1].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.comments.length) - parseFloat(a.comments.length);
})
  .slice(0, QUANTITY_FILM_EXTRA)
  .forEach((it) => {
    render(filmsListContainerExtra, new FilmCard(it).getElement(), renderPosition.BEFOREEND);
  });

const footerStatistics = document.querySelector(`.footer__statistics`);

render(footerStatistics, new FooterStatistics(films.length).getElement(), renderPosition.BEFOREEND);

mainContainerFilms.addEventListener(`click`, function (evt) {
  if (evt.target.parentElement.classList.contains(`film-card`)) {
    render(body, new FilmDetails(films[evt.target.parentElement.dataset.index]).getElement(), renderPosition.BEFOREEND);

    const filmDetails = body.querySelector(`.film-details`);
    const closePopupBtn = filmDetails.querySelector(`.film-details__close-btn`);
    const closeBtnClickHandler = () => {
      body.removeChild(filmDetails);
    };
    closePopupBtn.addEventListener(`click`, closeBtnClickHandler);
  }
});


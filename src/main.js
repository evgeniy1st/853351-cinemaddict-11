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

const renderOneCard = (film, container) => {
  const popup = new FilmDetails(film).getElement();
  const filmCard = new FilmCard(film).getElement();

  filmCard.addEventListener(`click`, function () {
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
};

const renderFilmCards = (arr) => {
  arr.splice(0, QUANTITY_FILM_CARDS).forEach((it) => {
    renderOneCard(it, filmsListContainer);
  });
};

const renderStartFilmCards = () => {
  filmsListContainer.innerHTML = ``;
  renderFilmCards(filmsListForDecreasing);

  if (sectionFilmsList.querySelector(`.films-list__show-more`)) {
    sectionFilmsList.querySelector(`.films-list__show-more`).remove();
  }

  render(sectionFilmsList, new ShowMoreButton().getElement(), renderPosition.BEFOREEND);

  const showMoreButton = sectionFilmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    renderFilmCards(filmsListForDecreasing);
    if (filmsListForDecreasing.length <= 0) {
      showMoreButton.remove();
    }
  });
};

renderStartFilmCards();

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

  renderStartFilmCards();
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

  renderStartFilmCards();
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

  renderStartFilmCards();
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

  renderStartFilmCards();
});

render(sectionsFilmListExtra[0], new FilmsListContainer().getElement(), renderPosition.BEFOREEND);

let filmsListContainerExtra = sectionsFilmListExtra[0].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.rating) - parseFloat(a.rating);
})
.slice(0, QUANTITY_FILM_EXTRA)
.forEach((it) => {
  renderOneCard(it, filmsListContainerExtra);
});

render(sectionsFilmListExtra[1], new FilmsListContainer().getElement(), renderPosition.BEFOREEND);

filmsListContainerExtra = sectionsFilmListExtra[1].querySelector(`.films-list__container`);

films.slice().sort((a, b) => {
  return parseFloat(b.comments.length) - parseFloat(a.comments.length);
})
  .slice(0, QUANTITY_FILM_EXTRA)
  .forEach((it) => {
    renderOneCard(it, filmsListContainerExtra);
  });

const footerStatistics = document.querySelector(`.footer__statistics`);

render(footerStatistics, new FooterStatistics(films.length).getElement(), renderPosition.BEFOREEND);


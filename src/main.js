import FilmsListContainer from "./components/films-list-container";
import FooterStatistics from "./components/footer-statistics";
import MainContainerFilms from "./components/main-container-films";
import MostCommented from "./components/most-commented";
import Navigation from "./components/navigation";
import PageController from "./controllers/page-controller";
import SectionFilmsList from "./components/section-films-list";
import Sorting from "./components/sorting";
import TopRated from "./components/top-rated";
import UserRank from "./components/user-rank";
import {getFilms} from "./mocks/film-card";
import {QUANTITY_FILM_EXTRA} from "./constants";
import {render, renderPosition} from "./utils/render";

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

render(header, new UserRank(), renderPosition.BEFOREEND);
render(main, new Navigation(qntWatchlist, qntHistory, qntFavorites), renderPosition.BEFOREEND);
render(main, new Sorting(), renderPosition.BEFOREEND);
render(main, new MainContainerFilms(), renderPosition.BEFOREEND);

const mainContainerFilms = main.querySelector(`.films`);

render(mainContainerFilms, new SectionFilmsList(), renderPosition.BEFOREEND);

const sectionFilmsList = mainContainerFilms.querySelector(`.films-list`);

let filmsListForDecreasing = films.slice();


const pageController = new PageController(sectionFilmsList);
pageController.renderMainContent(filmsListForDecreasing);

const defaultButton = main.querySelector(`[href="#all"]`);
const watchlistButton = main.querySelector(`[href="#watchlist"]`);
const historyButton = main.querySelector(`[href="#history"]`);
const favoritesButton = main.querySelector(`[href="#favorites"]`);

const applyFilter = (evt, button, filter) => {
  evt.preventDefault();
  main.querySelectorAll(`.main-navigation__item`).forEach((it) => {
    it.classList.remove(`main-navigation__item--active`);
  });
  button.classList.add(`main-navigation__item--active`);

  switch (filter) {
    case `isWatchlist`:
      filmsListForDecreasing = films.slice().filter((it) => {
        return it.isWatchlist === true;
      });
      break;
    case `isHistory`:
      filmsListForDecreasing = films.slice().filter((it) => {
        return it.isHistory === true;
      });
      break;
    case `isFavorite`:
      filmsListForDecreasing = films.slice().filter((it) => {
        return it.isFavorite === true;
      });
      break;
    default:
      filmsListForDecreasing = films.slice();
  }

  pageController.renderMainContent(filmsListForDecreasing);
};

defaultButton.addEventListener(`click`, (evt) => {
  applyFilter(evt, defaultButton);
});

watchlistButton.addEventListener(`click`, (evt) => {
  applyFilter(evt, watchlistButton, `isWatchlist`);
});

historyButton.addEventListener(`click`, (evt) => {
  applyFilter(evt, historyButton, `isHistory`);
});

favoritesButton.addEventListener(`click`, (evt) => {
  applyFilter(evt, favoritesButton, `isFavorite`);
});

if (films.length > 0) {
  render(mainContainerFilms, new TopRated(), renderPosition.BEFOREEND);
  render(mainContainerFilms, new MostCommented(), renderPosition.BEFOREEND);
  const sectionsFilmListExtra = mainContainerFilms.querySelectorAll(`.films-list--extra`);

  render(sectionsFilmListExtra[0], new FilmsListContainer(), renderPosition.BEFOREEND);

  let filmsListContainerExtra = sectionsFilmListExtra[0].querySelector(`.films-list__container`);

  films.slice().sort((a, b) => {
    return parseFloat(b.rating) - parseFloat(a.rating);
  })
    .slice(0, QUANTITY_FILM_EXTRA)
    .forEach((it) => {
      pageController.renderOneCard(it, filmsListContainerExtra);
    });

  render(sectionsFilmListExtra[1], new FilmsListContainer(), renderPosition.BEFOREEND);

  filmsListContainerExtra = sectionsFilmListExtra[1].querySelector(`.films-list__container`);

  films.slice().sort((a, b) => {
    return parseFloat(b.comments.length) - parseFloat(a.comments.length);
  })
    .slice(0, QUANTITY_FILM_EXTRA)
    .forEach((it) => {
      pageController.renderOneCard(it, filmsListContainerExtra);
    });
}

const footerStatistics = document.querySelector(`.footer__statistics`);

render(footerStatistics, new FooterStatistics(films.length), renderPosition.BEFOREEND);


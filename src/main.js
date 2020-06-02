import FilmsListContainer from "./components/films-list-container";
import FooterStatistics from "./components/footer-statistics";
import MainContainerFilms from "./components/main-container-films";
import MostCommented from "./components/most-commented";
import PageController from "./controllers/page-controller";
import SectionFilmsList from "./components/section-films-list";
import TopRated from "./components/top-rated";
import UserRank from "./components/user-rank";
import {getFilms} from "./mocks/film-card";
import {QUANTITY_FILM_EXTRA} from "./constants";
import {render, renderPosition} from "./utils/render";
import FilmController from "./controllers/film-controller";

const films = getFilms();

const hard = `непросто`;


const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);

render(header, new UserRank(), renderPosition.BEFOREEND);
render(main, new MainContainerFilms(), renderPosition.BEFOREEND);

const mainContainerFilms = main.querySelector(`.films`);

render(mainContainerFilms, new SectionFilmsList(), renderPosition.BEFOREEND);

const sectionFilmsList = mainContainerFilms.querySelector(`.films-list`);


const pageController = new PageController(sectionFilmsList, films);

pageController.renderMainContent();

if (films.length > 0) {
  render(mainContainerFilms, new TopRated(), renderPosition.BEFOREEND);
  render(mainContainerFilms, new MostCommented(), renderPosition.BEFOREEND);
  const sectionsFilmListExtra = mainContainerFilms.querySelectorAll(`.films-list--extra`);

  render(sectionsFilmListExtra[0], new FilmsListContainer(), renderPosition.BEFOREEND);

  let filmsListContainerExtra = sectionsFilmListExtra[0].querySelector(`.films-list__container`);
  const topRatedController = new FilmController(filmsListContainerExtra);

  films.slice().sort((a, b) => {
    return parseFloat(b.rating) - parseFloat(a.rating);
  })
    .slice(0, QUANTITY_FILM_EXTRA)
    .forEach((it) => {
      topRatedController.renderFilm(it);
    });

  render(sectionsFilmListExtra[1], new FilmsListContainer(), renderPosition.BEFOREEND);

  filmsListContainerExtra = sectionsFilmListExtra[1].querySelector(`.films-list__container`);
  const mostCommentedController = new FilmController(filmsListContainerExtra);

  films.slice().sort((a, b) => {
    return parseFloat(b.comments.length) - parseFloat(a.comments.length);
  })
    .slice(0, QUANTITY_FILM_EXTRA)
    .forEach((it) => {
      mostCommentedController.renderFilm(it);
    });
}

const footerStatistics = document.querySelector(`.footer__statistics`);

render(footerStatistics, new FooterStatistics(films.length), renderPosition.BEFOREEND);


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


render(header, createUserRank(), `beforeend`);
render(main, createNavigation(), `beforeend`);
render(main, createSorting(), `beforeend`);
render(main, createMainContainerFilms(), `beforeend`);

const mainContainerFilms = main.querySelector(`.films`);

render(mainContainerFilms, createSectionFilmsList(), `beforeend`);
render(mainContainerFilms, createTopRated(), `beforeend`);
render(mainContainerFilms, createMostCommented(), `beforeend`);

const sectionFilmList = mainContainerFilms.querySelector(`.films-list`);
const sectionsFilmListExtra = mainContainerFilms.querySelectorAll(`.films-list--extra`);

render(sectionFilmList, createFilmsListContainer(), `beforeend`);
render(sectionFilmList, createShowMoreButton(), `beforeend`);

const filmsListContainer = sectionFilmList.querySelector(`.films-list__container`);

const filmsforStart = films.slice();
filmsforStart.slice(0, QUANTITY_FILM_CARDS).forEach((it) => {
  render(filmsListContainer, createFilmCard(it), `beforeend`);
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
    render(body, createFilmDetails(), `beforeend`);

    const filmDetails = body.querySelector(`.film-details`);
    const closePopupBtn = filmDetails.querySelector(`.film-details__close-btn`);
    const closeBtnClickHandler = () => {
      body.removeChild(filmDetails);
    };
    closePopupBtn.addEventListener(`click`, closeBtnClickHandler);
  }
});


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


const QUANTITY_FILM_CARDS = 5;
const QUANTITY_FILM_EXTRA = 2;

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

for (let i = 0; i < QUANTITY_FILM_CARDS; i++) {
  render(filmsListContainer, createFilmCard(), `beforeend`);
}

for (let i = 0; i < sectionsFilmListExtra.length; i++) {
  render(sectionsFilmListExtra[i], createFilmsListContainer(), `beforeend`);

  let filmsListContainerExtra = sectionsFilmListExtra[i].querySelector(`.films-list__container`);

  for (let j = 0; j < QUANTITY_FILM_EXTRA; j++) {
    render(filmsListContainerExtra, createFilmCard(), `beforeend`);
  }
}

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


import AbstractComponent from "./abstract-component";

const createSectionFilmsList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>`
  );
};

export default class SectionFilmsList extends AbstractComponent {
  getTemplate() {
    return createSectionFilmsList();
  }
}

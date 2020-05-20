import AbstractComponent from "./abstract-component";

const createFilmsListContainer = () => {
  return (
    `<div class="films-list__container">
    </div>`
  );
};

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsListContainer();
  }
}

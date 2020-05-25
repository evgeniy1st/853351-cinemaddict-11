import AbstractComponent from "./abstract-component";

const createMainContainerFilms = () => {
  return (
    `<section class="films">
    </section>`
  );
};


export default class MainContainerFilms extends AbstractComponent {
  getTemplate() {
    return createMainContainerFilms();
  }
}

import AbstractComponent from "./abstract-component";

const createMostCommented = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      </section>`
  );
};

export default class MostCommented extends AbstractComponent {
  getTemplate() {
    return createMostCommented();
  }
}

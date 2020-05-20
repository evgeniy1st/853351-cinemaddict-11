import AbstractComponent from "./abstract-component";

const createTopRated = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      </section>`
  );
};

export default class TopRated extends AbstractComponent {
  getTemplate() {
    return createTopRated();
  }
}

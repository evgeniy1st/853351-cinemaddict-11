import {createElement} from "../utils";

const getComment = (obj) => {
  return (
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${obj.emotion}.png" width="55" height="55" alt="${obj.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${obj.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${obj.author}</span>
            <span class="film-details__comment-day">${obj.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  );
};

export default class Comment {
  constructor(obj) {
    this._comment = obj;

    this._element = null;
  }

  getTemplate() {
    return getComment(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

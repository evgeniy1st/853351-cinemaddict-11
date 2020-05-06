export const getComments = (arr) => {
  return arr.map((it) => {
    return (
      `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${it.emotion}.png" width="55" height="55" alt="${it.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${it.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${it.author}</span>
              <span class="film-details__comment-day">${it.date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
    );
  });
};

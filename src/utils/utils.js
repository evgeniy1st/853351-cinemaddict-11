export const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloat = function (min, max) {
  return Math.random() * (max - min) + min;
};

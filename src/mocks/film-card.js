import {getRandomInt} from "../utils";
import {getRandomFloat} from "../utils";
import {MAX_QUANTITY_COMMENTS} from "../constants";
import {QUANTITY_FILMS} from "../constants";

const titlesList = [`Mabel Perkins`, `Luella Nguyen`, `Steve Doyle`, `Matilda Valdez`, `Chris Patterson`, `Bertie McGee`, `Lucile Barnes`, `Francisco Cummings`, `Fanny Thornton`, `Jeff Bishop`, `Celia Hanson`, `Myrtie Page`, `Jeremy Osborne`, `Irene Garrett`, `Franklin Washington`, `Josie Drake`, `Troy Olson`, `Ernest Wood`, `Devin Rowe`, `Peter Ryan`, `Maurice Flowers`, `Georgie Weaver`, `Randy Hughes`, `Ethel Walters`, `Dollie Vaughn`, `Lucile Morgan`, `Brent Townsend`, `Leona Goodwin`, `Eliza Vaughn`, `Brett Swanson`, `Katharine Garza`];


const genresList = [`musical`, `comedy`, `thriller`, `drama`, `horror`, `melodrama`, `parody`, `detective`, `adventure`, `western`];

const postersList = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const descriptions = [`Duis adipisicing velit magna aute ex est. Ullamco excepteur ea laborum voluptate exercitation cupidatat. Sit aliquip velit sint anim elit laboris pariatur quis magna. Velit officia est aliqua ea enim in sint qui aliqua consectetur velit ipsum Lorem. Veniam Lorem cillum commodo id sit occaecat nostrud adipisicing. Duis aliqua fugiat proident nostrud consectetur mollit ex commodo ad officia nisi. Sit dolor in nulla duis qui ullamco exercitation ut. Sint ullamco nisi amet ad. Non voluptate proident sit cillum do. Amet aliquip ut pariatur quis labore aute magna dolor culpa id. Consectetur non laboris ex excepteur magna veniam esse dolor sint.`, `Exercitation id esse deserunt excepteur aliqua voluptate sunt mollit pariatur cillum`, `Anim pariatur dolor fugiat reprehenderit adipisicing cillum dolor ut aliqua cupidatat labore elit velit reprehenderit`, `Dolor in ipsum exercitation esse ex nulla exercitation sunt consectetur commodo`, `Ipsum consequat mollit nisi quis cupidatat anim nisi`, `Anim ipsum est eu aute quis voluptate ad aute incididunt`, `Consectetur est sunt aliquip aute`, `Tempor sunt labore cupidatat voluptate aliquip irure nisi ad proident irure sit`, `Voluptate cupidatat duis do labore cillum nulla amet`, `Aliquip excepteur ex consectetur velit in irure in duis minim est proident incididunt. Consectetur voluptate excepteur sit irure. Duis quis ex officia consectetur laborum cupidatat esse eu veniam aliquip cupidatat. Mollit aute mollit commodo eu dolor pariatur sint proident ea est elit mollit dolore. Deserunt fugiat eu deserunt pariatur officia occaecat eiusmod labore adipisicing est aute voluptate aute sint. Esse enim Lorem irure elit dolor aliqua dolore excepteur esse deserunt consectetur. Sint velit duis excepteur ex aute nisi aliquip occaecat occaecat. Occaecat duis sint irure et mollit minim in nulla ad eu. Esse laborum ex nostrud deserunt qui veniam eu et aute. Occaecat est laboris mollit culpa enim.`, `Exercitation elit veniam dolor duis pariatur aliquip eiusmod cillum anim ipsum sunt aute est anim`, `Proident veniam Lorem ea eiusmod culpa eu anim`, `Officia nulla esse pariatur cupidatat ullamco sunt in incididunt laborum`, `Reprehenderit ex amet pariatur minim duis qui nulla reprehenderit consequat minim eiusmod irure sint`, `Esse aute velit sit ex id ea ullamco ad amet sint commodo`, `Adipisicing commodo consectetur quis cupidatat exercitation ad aliquip cupidatat ad laborum consequat ullamco culpa`, `Ea veniam ipsum tempor in consectetur ex quis sit enim`, `Aliqua et irure consequat enim ea consequat tempor non do magna reprehenderit veniam veniam`, `Ex consequat laboris proident magna pariatur nostrud id occaecat est ullamco cillum magna labore`, `Id quis incididunt laborum eu ipsum labore est culpa ullamco cillum pariatur consectetur`, `Voluptate Lorem elit laborum incididunt occaecat exercitation esse amet sunt ad aute mollit cillum`, `Occaecat eiusmod aute est ea proident fugiat ut enim dolore est id aliqua`, `Proident duis est qui esse irure ea qui et laborum labore laborum`, `Lorem eiusmod amet commodo exercitation proident. Culpa duis sit adipisicing nisi exercitation veniam do ipsum. Officia laboris commodo eu et velit voluptate in consequat incididunt commodo velit. Cupidatat occaecat id voluptate cupidatat quis irure cillum officia occaecat sint deserunt eu anim exercitation. Commodo ipsum mollit tempor officia. Ex voluptate esse magna labore tempor labore nostrud officia aute. Anim exercitation aliquip proident laboris minim non nostrud ad mollit nulla irure sint voluptate. Eu sint pariatur eiusmod ullamco magna eiusmod incididunt. Adipisicing aute incididunt labore adipisicing tempor et excepteur. Et sint consectetur Lorem ex et laboris cillum voluptate labore irure ex consectetur Lorem duis.`];

const commentsList = [`Culpa velit duis eu Lorem ipsum reprehenderit sunt cupidatat labore deserunt tempor voluptate consequat`, `Minim aliquip nulla magna anim dolor nulla`, `Aliqua occaecat sit sunt laborum`, `Id nisi sint qui ad officia`, `Consequat anim aliqua irure in`, `Laboris id et do eiusmod enim anim esse anim`, `Non dolor nulla consectetur velit magna nostrud nostrud est id occaecat ut`, `Id tempor culpa duis minim ea`, `Ad cupidatat commodo voluptate eiusmod sint et`, `Eu nulla exercitation Lorem in cupidatat duis nisi ex fugiat aliquip ad occaecat sunt`, `Veniam nostrud labore do exercitation esse esse irure anim`, `Quis magna veniam culpa tempor labore labore labore`, `Aliquip eu et adipisicing laboris nisi proident laborum mollit eu ex laborum in exercitation`, `Deserunt cupidatat do aliquip ut nulla sunt laborum eiusmod eiusmod excepteur`, `Id excepteur ea mollit do veniam ullamco magna`, `Non consequat nisi ad elit aute excepteur ut sunt`, `Ipsum esse incididunt labore labore nulla duis`, `Non exercitation elit id officia incididunt veniam Lorem duis anim aute`, `Sunt non voluptate id enim fugiat veniam sit incididunt fugiat ea`, `Consectetur nisi anim duis et elit Lorem ea officia nulla laborum anim eu nisi`, `Veniam occaecat ex eu tempor sunt adipisicing`, `Sunt et officia nulla eu incididunt culpa cupidatat consequat esse id nulla velit cillum`, `Ex cillum cillum excepteur magna`, `Ipsum nostrud eiusmod officia Lorem ullamco`, `Veniam id nisi ea aliqua`, `Aute minim proident tempor velit`];

const emotionsLists = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];

const getDate = () => {
  let date = new Date(getRandomInt(2018, 2020), getRandomInt(0, 11), getRandomInt(1, 30), getRandomInt(0, 23), getRandomInt(0, 59));
  return (
    `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  );
};

const getComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    let currentComment = {
      text: commentsList[getRandomInt(0, commentsList.length - 1)],
      emotion: emotionsLists[getRandomInt(0, emotionsLists.length - 1)],
      author: titlesList[getRandomInt(0, titlesList.length - 1)],
      date: getDate(),
      deletle() {
        return;
      }
    };
    comments.push(currentComment);
  }
  return comments;
};
const generateFilmInfo = () => {
  const film = {
    title: titlesList[getRandomInt(0, titlesList.length - 1)],
    rating: getRandomFloat(1, 10).toFixed(1),
    year: getRandomInt(1940, 2020),
    duration: `${getRandomInt(1, 2)}h ${getRandomInt(0, 59)}m`,
    genre: genresList[getRandomInt(0, genresList.length - 1)],
    poster: postersList[getRandomInt(0, postersList.length - 1)],
    description: descriptions[getRandomInt(0, descriptions.length - 1)],
    comments: getComments(getRandomInt(1, MAX_QUANTITY_COMMENTS))
  };
  return film;
};

export const getFilms = () => {
  const films = [];

  while (films.length < QUANTITY_FILMS) {
    films.push(generateFilmInfo());
  }

  return films;
};

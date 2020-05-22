import {getRandomInt} from "../utils/common";
import {getRandomFloat} from "../utils/common";
import {MAX_QUANTITY_COMMENTS} from "../constants";
import {QUANTITY_FILMS} from "../constants";
import {MAX_AGE_LIMIT} from "../constants";
import {MIN_AGE_LIMIT} from "../constants";

const titlesList = [`Mabel Perkins`, `Luella Nguyen`, `Steve Doyle`, `Matilda Valdez`, `Chris Patterson`, `Bertie McGee`, `Lucile Barnes`, `Francisco Cummings`, `Fanny Thornton`, `Jeff Bishop`, `Celia Hanson`, `Myrtie Page`, `Jeremy Osborne`, `Irene Garrett`, `Franklin Washington`, `Josie Drake`, `Troy Olson`, `Ernest Wood`, `Devin Rowe`, `Peter Ryan`, `Maurice Flowers`, `Georgie Weaver`, `Randy Hughes`, `Ethel Walters`, `Dollie Vaughn`, `Lucile Morgan`, `Brent Townsend`, `Leona Goodwin`, `Eliza Vaughn`, `Brett Swanson`, `Katharine Garza`, `Francisco Drake`, `Carolyn Steele`, `Roy Miller`, `Amelia Torres`, `Floyd Steele`, `Pearl Webster`, `Sarah Lynch`, `Katie Banks`, `Herman Rhodes`, `Bernard Hernandez`, `Eric Quinn`, `Nathaniel Watson`, `Landon Byrd`, `Charlie Hale`, `Roger Elliott`, `Amelia Tyler`, `Chester Howell`, `Tyler Watts`, `Myrtie Gardner`, `Stanley Collins`, `Lillie Wells`, `Elmer Burton`, `Mattie Lee`, `Alan Kelly`, `Steve Sanchez`, `Mike Lucas`, `Violet Santiago`, `Sue Walker`, `Emma Frank`, `Calvin Henderson`, `Ora Tran`, `Alta Meyer`];


const genresList = [`musical`, `comedy`, `thriller`, `drama`, `horror`, `melodrama`, `parody`, `detective`, `adventure`, `western`];

const postersList = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

const descriptions = [`Duis adipisicing velit magna aute ex est. Ullamco excepteur ea laborum voluptate exercitation cupidatat. Sit aliquip velit sint anim elit laboris pariatur quis magna. Velit officia est aliqua ea enim in sint qui aliqua consectetur velit ipsum Lorem. Veniam Lorem cillum commodo id sit occaecat nostrud adipisicing. Duis aliqua fugiat proident nostrud consectetur mollit ex commodo ad officia nisi. Sit dolor in nulla duis qui ullamco exercitation ut. Sint ullamco nisi amet ad. Non voluptate proident sit cillum do. Amet aliquip ut pariatur quis labore aute magna dolor culpa id. Consectetur non laboris ex excepteur magna veniam esse dolor sint.`, `Exercitation id esse deserunt excepteur aliqua voluptate sunt mollit pariatur cillum`, `Anim pariatur dolor fugiat reprehenderit adipisicing cillum dolor ut aliqua cupidatat labore elit velit reprehenderit`, `Dolor in ipsum exercitation esse ex nulla exercitation sunt consectetur commodo`, `Ipsum consequat mollit nisi quis cupidatat anim nisi`, `Anim ipsum est eu aute quis voluptate ad aute incididunt`, `Consectetur est sunt aliquip aute`, `Tempor sunt labore cupidatat voluptate aliquip irure nisi ad proident irure sit`, `Voluptate cupidatat duis do labore cillum nulla amet`, `Aliquip excepteur ex consectetur velit in irure in duis minim est proident incididunt. Consectetur voluptate excepteur sit irure. Duis quis ex officia consectetur laborum cupidatat esse eu veniam aliquip cupidatat. Mollit aute mollit commodo eu dolor pariatur sint proident ea est elit mollit dolore. Deserunt fugiat eu deserunt pariatur officia occaecat eiusmod labore adipisicing est aute voluptate aute sint. Esse enim Lorem irure elit dolor aliqua dolore excepteur esse deserunt consectetur. Sint velit duis excepteur ex aute nisi aliquip occaecat occaecat. Occaecat duis sint irure et mollit minim in nulla ad eu. Esse laborum ex nostrud deserunt qui veniam eu et aute. Occaecat est laboris mollit culpa enim.`, `Exercitation elit veniam dolor duis pariatur aliquip eiusmod cillum anim ipsum sunt aute est anim`, `Proident veniam Lorem ea eiusmod culpa eu anim`, `Officia nulla esse pariatur cupidatat ullamco sunt in incididunt laborum`, `Reprehenderit ex amet pariatur minim duis qui nulla reprehenderit consequat minim eiusmod irure sint`, `Esse aute velit sit ex id ea ullamco ad amet sint commodo`, `Adipisicing commodo consectetur quis cupidatat exercitation ad aliquip cupidatat ad laborum consequat ullamco culpa`, `Ea veniam ipsum tempor in consectetur ex quis sit enim`, `Aliqua et irure consequat enim ea consequat tempor non do magna reprehenderit veniam veniam`, `Ex consequat laboris proident magna pariatur nostrud id occaecat est ullamco cillum magna labore`, `Id quis incididunt laborum eu ipsum labore est culpa ullamco cillum pariatur consectetur`, `Voluptate Lorem elit laborum incididunt occaecat exercitation esse amet sunt ad aute mollit cillum`, `Occaecat eiusmod aute est ea proident fugiat ut enim dolore est id aliqua`, `Proident duis est qui esse irure ea qui et laborum labore laborum`, `Lorem eiusmod amet commodo exercitation proident. Culpa duis sit adipisicing nisi exercitation veniam do ipsum. Officia laboris commodo eu et velit voluptate in consequat incididunt commodo velit. Cupidatat occaecat id voluptate cupidatat quis irure cillum officia occaecat sint deserunt eu anim exercitation. Commodo ipsum mollit tempor officia. Ex voluptate esse magna labore tempor labore nostrud officia aute. Anim exercitation aliquip proident laboris minim non nostrud ad mollit nulla irure sint voluptate. Eu sint pariatur eiusmod ullamco magna eiusmod incididunt. Adipisicing aute incididunt labore adipisicing tempor et excepteur. Et sint consectetur Lorem ex et laboris cillum voluptate labore irure ex consectetur Lorem duis.`];

const commentsList = [`Culpa velit duis eu Lorem ipsum reprehenderit sunt cupidatat labore deserunt tempor voluptate consequat`, `Minim aliquip nulla magna anim dolor nulla`, `Aliqua occaecat sit sunt laborum`, `Id nisi sint qui ad officia`, `Consequat anim aliqua irure in`, `Laboris id et do eiusmod enim anim esse anim`, `Non dolor nulla consectetur velit magna nostrud nostrud est id occaecat ut`, `Id tempor culpa duis minim ea`, `Ad cupidatat commodo voluptate eiusmod sint et`, `Eu nulla exercitation Lorem in cupidatat duis nisi ex fugiat aliquip ad occaecat sunt`, `Veniam nostrud labore do exercitation esse esse irure anim`, `Quis magna veniam culpa tempor labore labore labore`, `Aliquip eu et adipisicing laboris nisi proident laborum mollit eu ex laborum in exercitation`, `Deserunt cupidatat do aliquip ut nulla sunt laborum eiusmod eiusmod excepteur`, `Id excepteur ea mollit do veniam ullamco magna`, `Non consequat nisi ad elit aute excepteur ut sunt`, `Ipsum esse incididunt labore labore nulla duis`, `Non exercitation elit id officia incididunt veniam Lorem duis anim aute`, `Sunt non voluptate id enim fugiat veniam sit incididunt fugiat ea`, `Consectetur nisi anim duis et elit Lorem ea officia nulla laborum anim eu nisi`, `Veniam occaecat ex eu tempor sunt adipisicing`, `Sunt et officia nulla eu incididunt culpa cupidatat consequat esse id nulla velit cillum`, `Ex cillum cillum excepteur magna`, `Ipsum nostrud eiusmod officia Lorem ullamco`, `Veniam id nisi ea aliqua`, `Aute minim proident tempor velit`];

const emotionsLists = [`angry`, `puke`, `sleeping`, `smile`];

const countriesList = [`Russia`, `USA`, `UK`, `China`, `Japan`, `Canada`, `France`, `Germany`, `Австралия`, `India`, `USSR`, `Poland`];

const getDate = () => {
  let minDate = new Date(`2018`);
  let maxDate = new Date(`2020-04-21`);
  let randomDate = new Date(getRandomInt(minDate.getTime(), maxDate.getTime()));

  return (
    `${randomDate.getFullYear()}/${randomDate.getMonth()}/${randomDate.getDate()}  ${randomDate.getHours()}:${randomDate.getMinutes()}`
  );
};

const getComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    let currentComment = {
      text: commentsList[getRandomInt(0, commentsList.length - 1)],
      emotion: emotionsLists[getRandomInt(0, emotionsLists.length - 1)],
      author: titlesList[getRandomInt(0, titlesList.length - 1)],
      date: getDate()
    };
    comments.push(currentComment);
  }
  return comments;
};
const generateFilmInfo = (count) => {
  const film = {
    title: titlesList[getRandomInt(0, titlesList.length - 1)],
    get originalTitle() {
      return (
        `Real ${this.title}. Original`
      );
    },
    rating: getRandomFloat(1, 10).toFixed(1),
    year: getRandomInt(1940, 2020),
    get fullDate() {
      let date = new Date(this.year, getRandomInt(0, 11), getRandomInt(0, 30));

      return date.toLocaleDateString(`defualt`, {year: `numeric`, month: `long`, day: `numeric`});
    },
    duration: `${getRandomInt(1, 2)}h ${getRandomInt(0, 59)}m`,
    get genres() {
      let tempGenresList = [];
      let qntGenres = getRandomInt(1, 4);
      for (let i = 0; i < qntGenres; i++) {
        tempGenresList.push(genresList[getRandomInt(0, genresList.length - 1)]);
      }

      return tempGenresList;
    },
    poster: postersList[getRandomInt(0, postersList.length - 1)],
    description: descriptions[getRandomInt(0, descriptions.length - 1)],
    comments: getComments(getRandomInt(1, MAX_QUANTITY_COMMENTS)),
    director: titlesList[getRandomInt(0, titlesList.length - 1)],
    get writers() {
      let writersList = [];
      let qntWriters = getRandomInt(1, 4);
      for (let i = 0; i < qntWriters; i++) {
        writersList.push(titlesList[getRandomInt(0, titlesList.length - 1)]);
      }

      return writersList;
    },
    get actors() {
      let actorsList = [];
      let qntActors = getRandomInt(2, 6);
      for (let i = 0; i < qntActors; i++) {
        actorsList.push(titlesList[getRandomInt(0, titlesList.length - 1)]);
      }

      return actorsList;
    },
    isWatchlist: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    ageLimit: `${getRandomInt(MIN_AGE_LIMIT, MAX_AGE_LIMIT)}+`,
    country: countriesList[getRandomInt(0, countriesList.length - 1)],
    index: count
  };
  return film;
};

export const getFilms = () => {
  const films = [];
  let count = 0;

  while (films.length < QUANTITY_FILMS) {
    films.push(generateFilmInfo(count));
    count++;
  }

  return films;
};

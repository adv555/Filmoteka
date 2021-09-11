// export default function getRefs() {
//   return {
//     searchForm: document.querySelector('.search-form'),
//   };
// }

const searchForm = document.querySelector('.search-form');
const queueBtn = document.querySelector('.queue-btn');
const watchedBtn = document.querySelector('.watched-btn');
const trailerBtn = document.querySelector('.trailer-btn');
const mainFrame = document.querySelector('.js-main-frame');
const gallery = document.querySelector('.js-gallery');
const logo = document.querySelector('.js-logo');
const homeLink = document.querySelector('.js-home');
const myLibraryLink = document.querySelector('.js-my-library');
const teamLink = document.querySelector('.js-team-link');
const addQueueBtn = document.querySelector('.queue-btn'); //Миша
const addWatchedBtn = document.querySelector('.watched-btn'); //Миша
const mainSection = document.querySelector('.main'); //Миша
const gallerySection = document.querySelector('.gallery'); //Миша
const filmStrip = document.querySelector('.film-strip'); //Andrew "Upcoming" slider
const userForm = document.getElementById('user-login-form');

export default {
  searchForm,
  filmStrip,
  queueBtn,
  watchedBtn,
  addQueueBtn,
  addWatchedBtn,
  trailerBtn,
  mainFrame,
  gallery,
  logo,
  homeLink,
  myLibraryLink,
  teamLink,
  gallerySection,
  userForm,
};

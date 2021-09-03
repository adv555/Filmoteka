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
const addQueueBtn = document.querySelector('.queue-btn');
const addWatchedBtn = document.querySelector('.watched-btn');

export default {
  searchForm,
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
};

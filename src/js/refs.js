// export default function getRefs() {
//   return {
//     searchForm: document.querySelector('.search-form'),
//   };
// }

const searchForm = document.querySelector('.search-form');
const queueBtn = document.querySelector('button[data-hero="queue"]');
const watchedBtn = document.querySelector('button[data-hero="watched"]');
const trailerBtn = document.querySelector('.trailer-btn');
const mainFrame = document.querySelector('.js-main-frame');
const gallery = document.querySelector('.js-gallery');
const logo = document.querySelector('.js-logo');
const homeLink = document.querySelector('.js-home');
const myLibraryLink = document.querySelector('.js-my-library');
const teamLink = document.querySelector('.js-team-link');
const addQueueBtn = document.querySelector('.js-queue-btn'); //Миша
const addWatchedBtn = document.querySelector('.js-watched-btn'); //Миша
const mainSection = document.querySelector('.main'); //Миша
const gallerySection = document.querySelector('.gallery'); //Миша
const containerGallery = document.querySelector('.container_gallery');
const filmStrip = document.querySelector('.film-strip'); //Andrew "Upcoming" slider

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
  containerGallery,
};

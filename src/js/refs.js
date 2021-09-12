const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.js-search-field__input');
const queueBtn = document.querySelector('button[data-hero="queue"]');
const watchedBtn = document.querySelector('button[data-hero="watched"]');
const trailerBtn = document.querySelector('.trailer-btn');
const mainFrame = document.querySelector('.js-main-frame');
const filterSelect = document.querySelector('.filter'); // filter
const filterGenres = document.querySelector('#filter-Genres'); // filter
const gallery = document.querySelector('.js-gallery');
const logo = document.querySelector('.js-logo');
const homeLink = document.querySelector('.js-home');
const myLibraryLink = document.querySelector('.js-my-library');
const teamLink = document.querySelector('.js-team-link');
const addQueueBtn = document.querySelector('.js-queue-btn'); //Миша
const addWatchedBtn = document.querySelector('.js-watched-btn'); //Миша
const mainSection = document.querySelector('.main'); //Миша
const gallerySection = document.querySelector('.library-gallery'); //Миша
const containerGallery = document.querySelector('.container_gallery');
const filmStrip = document.querySelector('.film-strip'); //Andrew "Upcoming" slider
const pagination = document.querySelector('.pagination'); // onSearch
const sliderMovieInfo = document.getElementsByClassName('.film-strip__info');
const sliderSection = document.querySelector('.slider'); // acces to Slider sedction
const removePagination = document.querySelector('.remove-pagination');
const libraryBtnlist = document.querySelector('.hero-buttons');
const heroDynamicContainer = document.querySelector('.hero__dynamic-container');
const heroBackgroundContainer = document.querySelector('.js-container-hero-bg');
const filterWrapper = document.querySelector('.js-filter-wrapper');
const genresFilter = document.querySelector('.js-genres-filter');
const filterChooseBtn = document.querySelector('.js-choose-btn');
const filterHideBtn = document.querySelector('.js-hide-btn');
const filterResetBtn = document.querySelector('.js-reset-btn');
const headerSection = document.querySelector('.header');
const myLibraryNotice = document.querySelector('.my-Library__notice');

export default {
  searchForm,
  searchInput,
  filmStrip,
  sliderMovieInfo,
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
  pagination,
  sliderSection,
  removePagination,
  filterSelect,
  libraryBtnlist,
  heroDynamicContainer,
  heroBackgroundContainer,
  filterWrapper,
  genresFilter,
  filterChooseBtn,
  filterHideBtn,
  filterResetBtn,
  headerSection,
  myLibraryNotice,
};

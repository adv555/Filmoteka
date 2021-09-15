import refs from './refs';

// ======= было в main до слияния
import renderCards from '../templates/gallery.hbs';
import {
  emptyLibraryNotice,
  emptyWatchedStoragedNotice,
  emptyQueueStoragedNotice,
} from './notification';

//============== Костина сохранненная разметка Олиной картички===========
import { valueLocalStorage as valueForLocalStorage } from './modal-card';
import moviesApiService from '../index.js';
import createGalleryMarkup from '../js/gallery/gallery.js';
var pagination = require('pagination');
export let localStorrageData = {
  watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
  queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
};

refs.myLibraryLink.addEventListener('click', onLibraryBtn);
refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
refs.queueBtn.addEventListener('click', onLibraryQueueBtn);

function onLibraryWachedBtm() {
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (!queueFilmsIdInLocalStorage) queueFilmsIdInLocalStorage = [];
  if (!watchedFilmsIdInLocalStorage) watchedFilmsIdInLocalStorage = [];
  if (
    (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage?.length === 0) &&
    (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage?.length === 0)
  ) {
    refs.myLibraryNotice.classList.remove('visually-hidden');
    refs.gallery.innerHTML = '';
    reloadHeroBtnStatus();
  } else {
    if (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) {
      onLibraryQueueBtn();
    } else {
      renderWatchedFilmStorage();
      refs.watchedBtn.classList.add(
        'hero-buttons__btn--active',
        'site-nav__button--active',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      );

      refs.queueBtn.classList.remove(
        'hero-buttons__btn--active',
        'site-nav__button--active',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      );
    }
  }

  var pag = new pagination(document.getElementsByClassName('pagination')[0], {
    currentPage: 1,
    totalItems: watchedFilmsIdInLocalStorage.length,
    itemsPerPage: 20,
    step: 2,
  });

  pag.onPageChanged(changeWatchedPage);

  const arrowLeft = document.querySelector('.arrowLeft');
  const arrowRight = document.querySelector('.arrowRight');
  arrowLeft.innerHTML = '';
  arrowRight.innerHTML = '';
}

function onLibraryQueueBtn() {
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (!queueFilmsIdInLocalStorage) queueFilmsIdInLocalStorage = [];
  if (!watchedFilmsIdInLocalStorage) watchedFilmsIdInLocalStorage = [];
  if (
    (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) &&
    (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0)
  ) {
    refs.myLibraryNotice.classList.remove('visually-hidden');
    refs.gallery.innerHTML = '';
    reloadHeroBtnStatus();
  } else {
    if (
      (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0) &&
      refs.watchedBtn.classList.contains(
        'hero-buttons__btn--active',
        'site-nav__button--active',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      )
    ) {
    } else {
      renderQueueFilmStorage();
      refs.watchedBtn.classList.remove(
        'hero-buttons__btn--active',
        'site-nav__button--active',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      );
      refs.queueBtn.classList.add(
        'hero-buttons__btn--active',
        'site-nav__button--active',
        'animate__animated',
        'animate__pulse',
        'animate__infinite',
      );
    }
  }

  var pag1 = new pagination(document.getElementsByClassName('pagination')[0], {
    currentPage: 1,
    totalItems: queueFilmsIdInLocalStorage.length,
    itemsPerPage: 20,
    step: 2,
  });

  pag1.onPageChanged(changeQueuePage);
  const arrowLeft = document.querySelector('.arrowLeft');
  const arrowRight = document.querySelector('.arrowRight');
  arrowLeft.innerHTML = '';
  arrowRight.innerHTML = '';
}

function changeWatchedPage(page) {
  reloadLocalStorage();
  const currentItems = localStorrageData.watchedFilmStorage.slice(20 * page - 20, 20 * page);
  refs.gallery.innerHTML = renderCards(currentItems.map(film => film.markup));
}

function changeQueuePage(page) {
  reloadLocalStorage();
  const currentItems = localStorrageData.queueFilmStorage.slice(20 * page - 20, 20 * page);
  refs.gallery.innerHTML = renderCards(currentItems.map(film => film.markup));
}

export function onAddWachedBtm(event) {
  const elevent = event.target;
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  if (watchedFilmsIdInLocalStorage === null) watchedFilmsIdInLocalStorage = [];
  if (queueFilmsIdInLocalStorage === null) queueFilmsIdInLocalStorage = [];
  if (!watchedFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
    if (queueFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
      const num = queueFilmsIdInLocalStorage.map(film => film.id).indexOf(valueForLocalStorage.id);
      queueFilmsIdInLocalStorage.splice(num, 1);
      localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
      elevent.nextElementSibling.innerText = 'ADD TO QUEUE';
      elevent.nextElementSibling.classList.remove('modal__button-hover');
    }

    watchedFilmsIdInLocalStorage.push(valueForLocalStorage);
    event.target.innerText = 'REMOVE FROM WATCHED';
    elevent.classList.add('modal__button-hover');

    localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
  } else {
    const num = watchedFilmsIdInLocalStorage.map(film => film.id).indexOf(valueForLocalStorage.id);
    watchedFilmsIdInLocalStorage.splice(num, 1);
    localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
    event.target.innerText = 'ADD TO WATCHED';
    elevent.classList.remove('modal__button-hover');
  }

  reloadLocalStorage();
}

export function onAddQueueBtn(event) {
  const elevent = event.target;
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  if (watchedFilmsIdInLocalStorage === null) watchedFilmsIdInLocalStorage = [];
  if (queueFilmsIdInLocalStorage === null) queueFilmsIdInLocalStorage = [];
  if (!queueFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
    if (watchedFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
      const num = watchedFilmsIdInLocalStorage
        .map(film => film.id)
        .indexOf(valueForLocalStorage.id);

      watchedFilmsIdInLocalStorage.splice(num, 1);
      localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
      elevent.previousElementSibling.innerText = 'ADD TO WATCHED';
      elevent.previousElementSibling.classList.remove('modal__button-hover');
    }
    queueFilmsIdInLocalStorage.push(valueForLocalStorage);
    localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
    event.target.innerHTML = 'REMOVE FROM QUEUE';
    elevent.classList.add('modal__button-hover');
  } else {
    const num = queueFilmsIdInLocalStorage.map(film => film.id).indexOf(valueForLocalStorage.id);

    queueFilmsIdInLocalStorage.splice(num, 1);
    localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
    event.target.innerHTML = 'ADD TO QUEUE';
    elevent.classList.remove('modal__button-hover');
  }
  reloadLocalStorage();
}

export function onLibraryBtn() {
  refs.myLibraryLink.classList.add(
    'site-nav__button--active',
    'site-nav__button--active',
    'animate__animated',
    'animate__pulse',
    'animate__infinite',
  );
  refs.headerSection.classList.add('header__container--my-library-bg');
  refs.homeLink.classList.remove('site-nav__button--active');
  refs.headerSection.classList.remove('header__container--home-bg');
  refs.sliderSection.classList.add('visually-hidden');
  refs.searchForm.classList.add('visually-hidden');
  refs.filterBox.classList.add('visually-hidden');
  refs.heroWarningBox.classList.add('visually-hidden');
  refs.libraryBtnlist.classList.remove('visually-hidden');
  refs.homeLink.classList.remove(
    'site-nav__button--active',
    'animate__animated',
    'animate__pulse',
    'animate__infinite',
  );

  reloadLocalStorage();
  onLibraryWachedBtm();
}

export function renderWatchedFilmStorage() {
  changeWatchedPage(1);
  bouceInLeftLibGallery();
}

export function renderQueueFilmStorage() {
  changeQueuePage(1);
  bouceInRightLibGallery();
}

export function reloadLocalStorage() {
  localStorrageData = {
    watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
    queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
  };
}
export function reloadHeroBtnStatus() {
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));

  if (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) {
    refs.watchedBtn.classList.remove(
      'hero-buttons__btn--active',
      'site-nav__button--active',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    refs.queueBtn.classList.add(
      'hero-buttons__btn--active',
      'site-nav__button--active',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    reloadLocalStorage();
  }
  if (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0) {
    refs.watchedBtn.classList.add(
      'hero-buttons__btn--active',
      'site-nav__button--active',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    refs.queueBtn.classList.remove(
      'hero-buttons__btn--active',
      'site-nav__button--active',
      'animate__animated',
      'animate__pulse',
      'animate__infinite',
    );
    reloadLocalStorage();
  }
}

refs.myLibraryNoticeTitle.addEventListener('click', onLibraryNoticeTitle);

function onLibraryNoticeTitle() {
  refs.myLibraryNoticeTitle.classList.add('animate__animated', 'animate__jello');
  setTimeout(
    () => refs.myLibraryNoticeTitle.classList.remove('animate__animated', 'animate__jello'),
    750,
  );
}

function bouceInRightLibGallery() {
  refs.gallery.classList.add('animate__animated', 'animate__bounceInRight');
  setTimeout(
    () => refs.gallery.classList.remove('animate__animated', 'animate__bounceInRight'),
    750,
  );
}
function bouceInLeftLibGallery() {
  refs.gallery.classList.add('animate__animated', 'animate__bounceInLeft');
  setTimeout(
    () => refs.gallery.classList.remove('animate__animated', 'animate__bounceInLeft'),
    750,
  );
}

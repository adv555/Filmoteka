import refs from './refs';
import { notice, error } from '@pnotify/core';
//============== Костина сохранненная разметка Олиной картички===========
import { valueLocalStorage as valueForLocalStorage } from './modal-card';
import moviesApiService from '../index.js';
import createGalleryMarkup from '../js/gallery/gallery.js';

export let localStorrageData = {
  watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
  queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
};

refs.myLibraryLink.addEventListener('click', onLibraryBtn);
refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
refs.queueBtn.addEventListener('click', onLibraryQueueBtn);
// refs.homeBtn.addEventListener('click', onHomeBtn);

function onLibraryWachedBtm() {
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) {
    // refs.gallery.innerHTML = '';
    // noticeMessage.notice();

    onLibraryQueueBtn();
    refs.watchedBtn.disabled = true;
  } else {
    renderWatchedFilmStorage();
    refs.watchedBtn.classList.add('hero-buttons__btn--active');
    refs.queueBtn.classList.remove('hero-buttons__btn--active');
    refs.watchedBtn.disabled = true;
    if (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0) {
      refs.queueBtn.disabled = true;
    } else refs.queueBtn.disabled = false;
  }
}

function onLibraryQueueBtn() {
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0) {
    if (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) {
      noticeMessage.error();
      refs.watchedBtn.disabled = true;
      refs.queueBtn.disabled = true;
    }
    refs.queueBtn.disabled = true;
  } else {
    renderQueueFilmStorage();

    refs.watchedBtn.disabled = true;
    refs.queueBtn.disabled = false;

    refs.watchedBtn.classList.remove('hero-buttons__btn--active');
    refs.queueBtn.classList.add('hero-buttons__btn--active');
    noticeMessage.notice();
  }
}

export function onAddWachedBtm(event) {
  const elevent = event.target;
  // const id = e.target.dataset.set;
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (watchedFilmsIdInLocalStorage === null) watchedFilmsIdInLocalStorage = [];
  // console.log('watchedFilmsIdInLocalStorage: ', watchedFilmsIdInLocalStorage);
  if (!watchedFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
    //========================Mike===========================
    // watchedFilmsIdInLocalStorage.push(valueForLocalStorage.id);
    //заменил на:
    watchedFilmsIdInLocalStorage.push(valueForLocalStorage);
    event.target.innerText = 'REMOVE FROM WATCHED';
    elevent.classList.add('modal__button-hover');
    // console.log(e.target.innerText);
    //============================================================
    localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
  } else {
    const num = watchedFilmsIdInLocalStorage.map(film => film.id).indexOf(valueForLocalStorage.id);
    // console.log(num);
    watchedFilmsIdInLocalStorage.splice(num, 1);
    localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
    event.target.innerText = 'ADD TO WATCHED';
    elevent.classList.remove('modal__button-hover');
    // console.log(e.target.innerText);
  }

  // updateBtnState(valueForLocalStorage.id);
  reloadLocalStorage();
}

export function onAddQueueBtn(event) {
  const elevent = event.target;
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  if (queueFilmsIdInLocalStorage === null) queueFilmsIdInLocalStorage = [];
  if (!queueFilmsIdInLocalStorage.map(film => film.id).includes(valueForLocalStorage.id)) {
    queueFilmsIdInLocalStorage.push(valueForLocalStorage);
    localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
    event.target.innerHTML = 'REMOVE FROM QUEUE';
    elevent.classList.add('modal__button-hover');
  } else {
    const num = queueFilmsIdInLocalStorage.map(film => film.id).indexOf(valueForLocalStorage.id);
    // console.log(num);
    queueFilmsIdInLocalStorage.splice(num, 1);
    localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
    event.target.innerHTML = 'ADD TO QUEUE';
    elevent.classList.remove('modal__button-hover');
  }
  // updateBtnState(valueForLocalStorage.id);
  reloadLocalStorage();
}

export function onLibraryBtn() {
  refs.sliderSection.classList.add('visually-hidden');
  refs.myLibraryLink.classList.add('site-nav__button--active');
  refs.homeLink.classList.remove('site-nav__button--active');
  refs.removePagination.classList.add('visually-hidden');
  refs.libraryBtnlist.classList.remove('visually-hidden');
  refs.searchForm.classList.add('visually-hidden');
  refs.filterSelect.classList.add('visually-hidden');

  refs.headerSection.classList.remove('header__container--home-bg');
  refs.headerSection.classList.add('header__container--my-library-bg');

  reloadLocalStorage();
  onLibraryWachedBtm();
}

// export function updateBtnState(id) {
//   // const addQueueBtn = document.querySelector('.js-queue');
//   // const addWatchedBtn = document.querySelector('.js-watched');
//   let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
//   let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));

//   console.log(
//     watchedFilmsIdInLocalStorage
//       .map(film => film.id)
//       .join(',')
//       .includes(id),
//   );

//   if (watchedFilmsIdInLocalStorage.map(film => film.id).includes(id)) {
//     addWatchedBtn.innerText = 'REMOVE FROM WATCHED';
//   } else {
//     addWatchedBtn.innerText = 'ADD TO WATCHED';
//   }

//   if (queueFilmsIdInLocalStorage.map(film => film.id).includes(id)) {
//     addQueueBtn.innerText = 'REMOVE FROM QUEUE';
//   } else {
//     addQueueBtn.innerText = 'ADD TO QUEUE';
//   }
// }

export function renderWatchedFilmStorage() {
  refs.gallery.innerHTML = localStorrageData.watchedFilmStorage
    .map(film => film['markup'])
    .join(' ');
}
export function renderQueueFilmStorage() {
  refs.gallery.innerHTML = localStorrageData.queueFilmStorage.map(film => film['markup']).join(' ');
}

class NoticeMessage {
  constructor() {}
  notice() {
    notice({
      text: 'Your Watched list is empty',
      width: '300px',
      minHeight: '15px',
      delay: 1000,
      addClass: 'error',
    });
  }
  error() {
    error({
      // title: 'Error',
      text: 'Your Library is empty',
      width: '300px',
      minHeight: '15px',
      delay: 1000,
      addClass: 'error',
    });
  }
}

const noticeMessage = new NoticeMessage();

export function reloadLocalStorage() {
  localStorrageData = {
    watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
    queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
  };
}

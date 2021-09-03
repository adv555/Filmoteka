// import filmListTemplate from './'
import refs from './refs';
import { notice, error } from '@pnotify/core';

refs.myLibraryLink.addEventListener('click', onLibraryBtn);
refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
refs.queueBtn.addEventListener('click', onLibraryQueueBtn);
refs.addQueueBtn.addEventListener('click', onAddQueueBtn);
refs.addWatchedBtn.addEventListener('click', onAddWachedBtm);

const watchedFilmStorage = JSON.parse(localStorage.getItem('watche-films'));
const queueFilmStorage = JSON.parse(localStorage.getItem('queue-films'));

function onLibraryWachedBtm(e) {
  refs.myLibraryLink.innerHTML = filmListTemplate(watchedFilmStorage);
}
function onLibraryQueueBtn(e) {
  refs.myLibraryLink.innerHTML = filmListTemplate(queueFilmStorage);
}

function onLibraryBtn(e) {
  if (refs.watchedBtn.checked) {
    // Если кнопка Watched в состоянии checked - выполняем этот код

    // if (watchedFilmStorage !== [] || '') {
    //   onWachedBtm();
    // } else {
    //    refs.myLibraryLink.innerHTML = '';
    // noticeMessage.notice();
    // }
    watchedFilmStorage !== [] || ''
      ? (refs.myLibraryLink.innerHTML = onLibraryWachedBtm())
      : (refs.myLibraryLink.innerHTML = ''),
      noticeMessage.notice();
  }
  if (refs.queueBtn.checked) {
    // Если кнопка Queue в состоянии checked - выполняем этот код

    // if (queueFilmStorage !== [] || '') {
    //   //  refs.myLibraryLink.innerHTML = filmListTemplate(queueFilmStorage);
    //   onQueueBtn();
    // } else {
    //    refs.myLibraryLink.innerHTML = '';
    // noticeMessage.notice();
    // }
    queueFilmStorage !== [] || ''
      ? (refs.myLibraryLink.innerHTML = onQueueBtn())
      : (refs.myLibraryLink.innerHTML = ''),
      noticeMessage.notice();
  }
}

function onAddWachedBtm() {
  if (addWachedBtm.classList.contains('remove')) {
    onRemoveFromWatchedBtm();
  } else {
    localStorage.setItem('watche-films', JSON.stringify(watchedFilmStorage));
    addWachedBtm.classList.toggle('remove');
    addWachedBtm.textContent('Remove from Wached');
  }
}
function onAddQueueBtn() {
  if (refs.addQueueBtn.classList.contains('remove')) {
    onRemoveFromQueueBtm();
  } else {
    localStorage.setItem('queue-films', JSON.stringify(queueFilmStorage));
    refs.addQueueBtn.classList.toggle('remove');
    refs.addQueueBtn.textContent('Remove from Queue');
  }
}
function onRemoveFromWatchedBtm() {
  localStorage.removeItem('watche-films');
  addWachedBtm.classList.toggle('remove');
  addWachedBtm.textContent('Add to Wached');
}
function onRemoveFromQueueBtm() {
  localStorage.removeItem('queue-films');
  refs.addQueueBtn.classList.toggle('remove');
  refs.addQueueBtn.textContent('Add to Queue');
}

class NoticeMessage {
  constructor() {}
  notice() {
    notice({
      // title: 'Attention',
      text: 'Your Library is empty',
      width: '300px',
      minHeight: '15px',
      delay: 2000,
      // addClass: 'error',
    });
  }
  error() {
    error({
      title: 'Error',
      text: 'No matchs found!',
      width: '300px',
      minHeight: '15px',
      delay: 2000,
      // addClass: 'error',
    });
  }
}
const noticeMessage = new NoticeMessage();

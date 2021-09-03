// import filmListTemplate from './'
import getRefs from './api/refs';

const libraryBox = document.querySelector('.gallery');
const libraryWatchedBtn = getRefs().libraryWatchedBtn;
const libraryQueuedBtn = getRefs().libraryQueuedBtn;
let watchedFilmStorage = [];
let queueFilmStorage = [];
function onLibraryBtn(e) {
  if (libraryWatchedBtn.checked) {
// Если кнопка Watched - checked выполняем этот код
    if (watchedFilmStorage !== [] || '') {
      libraryBox.innerHTML = filmListTemplate(watchedFilmStorage);
    } else {
      libraryBox.innerHTML = '';
    }
    // watchedFilmStorage !== [] || ''
    //   ? (libraryBox.innerHTML = filmListTemplate(watchedFilmStorage))
    //   : (libraryBox.innerHTML = '');
    }
    if (libraryQueuedBtn.checked) {
// Если кнопка Watched - checked выполняем этот код
        if (queueFilmStorage !== [] || '') {
      libraryBox.innerHTML = filmListTemplate(queueFilmStorage);
    } else {
      libraryBox.innerHTML = '';
    }
    
        
function onWachedBtm(e) {
  localStorage.setItem('watche-films', JSON.stringify(watchedFilmStorage));
}
function onQueueBtn(e) {
  localStorage.setItem('queue-films', JSON.stringify(queueFilmStorage));
}
function onRemoveFromWatchedBtm(e) {}
function onRemoveFromQueueBtm(e) {}

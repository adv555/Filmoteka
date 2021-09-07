// import filmListTemplate from './'
import refs from './refs';
import { notice, error } from '@pnotify/core';
//============== Костина сохранненная разметка Олиной картички===========
import { valueLocalStorage } from './modal-card';
console.dir(valueLocalStorage);

// let valueLocalStorage = {
//   id: '',
//   markup: '',
// };

// {
//   "id": "825997",
//   "markup": "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//1ho7YYp1DvCke9I1D3Olbh2Px63.jpg\" data-source=\"825997\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Rogue Hostage </h2>\n    <div>\n        Action, Thriller\n    </div>\n</li>"
// }

// {
//   "id": "619297",
//   "markup": "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg\" data-source=\"619297\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>"
// }
// const markup = "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg\" data-source=\"619297\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>"
// const replacesMarkup = markup.replace(/\n/g, '')
// console.log(replacesMarkup)
// console.log(markup)

// const newFilm1 = {
//   id: '744275',
//   markup:
//     '<li class="item">\n <div class="video-card"><img class="gallery__video" src="https://image.tmdb.org/t/p/w300//92wWZAzHPrvEKSpIJxGeMmImHOf.jpg" data-source="744275"><span class="video-rating"></span></div></li>',
// };

// const newFilm2 = {
//   id: '825997',
//   markup:
//     '<li class="item">\n    <div class="video-card">\n        <img class="gallerySection__video" src="https://image.tmdb.org/t/p/w300//1ho7YYp1DvCke9I1D3Olbh2Px63.jpg" data-source="825997">\n        <span class="video-rating"></span>\n   \n    </div>\n    <h2 class="video-title">Rogue Hostage </h2>\n    <div>\n        Action, Thriller\n    </div>\n</li>',
// };
// const newFilm3 = {
//   id: '619297',
//   markup:
//     '<li class="item">\n    <div class="video-card">\n        <img class="gallerySection__video" src="https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg" data-source="619297">\n        <span class="video-rating"></span>\n   \n    </div>\n    <h2 class="video-title">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>',
// };

// const watchedStorageJson = [];
// // console.log(watchedStorageJson["markup"])

// const queueStorageJson = [];

// watchedStorageJson.push(newFilm1, newFilm2, newFilm3)
// console.dir(watchedStorageJson)
// console.log(watchedStorageJson)
// queueStorageJson.push(newFilm3)

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
const watchedFilmStorage = JSON.parse(localStorage.getItem('watched-films'));
const queueFilmStorage = JSON.parse(localStorage.getItem('queue-films'));

refs.myLibraryLink.addEventListener('click', onLibraryBtn);
refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
refs.queueBtn.addEventListener('click', onLibraryQueueBtn);
// refs.addQueueBtn.addEventListener('click', onAddQueueBtn);
// refs.addWatchedBtn.addEventListener('click', onAddWachedBtm);

// let filmArray = []

// function watchedFilmStorage() {
//   return JSON.parse(localStorage.getItem('watched-films'));
// }

// function queueFilmStorage() {
//   return JSON.parse(localStorage.getItem('queue-films'));
// }

// console.log(watchedFilmStorage);

function onLibraryWachedBtm() {
  refs.watchedBtn.classList.add('.hero-buttons__btn--active');
  refs.queueBtn.classList.remove('.hero-buttons__btn--active');
  // refs.gallerySection.innerHTML = filmListTemplate(watchedFilmStorage);
  refs.gallerySection.innerHTML = watchedFilmStorage; //для одного фильма
  // refs.gallerySection.innerHTML = watchedFilmStorage.map(film => film['markup']);//для масива фильмов

  // refs.gallerySection.innerHTML = 'Watched movies'
}
function onLibraryQueueBtn() {
  refs.watchedBtn.classList.remove('hero-buttons__btn--active');
  refs.queueBtn.classList.add('.hero-buttons__btn--active');
  // refs.gallerySection.innerHTML = filmListTemplate(queueFilmStorage);
  refs.gallerySection.innerHTML = queueFilmStorage; //для одного фильма
  // refs.gallerySection.innerHTML = queueFilmStorage.map(film => film['markup']); //для масива фильмов
}

// function onLibraryBtn() {
//   console.log('кнопка library');

// if (refs.watchedBtn.classList.contains('hero-buttons__btn--active')) {
// Если кнопка Watched в состоянии checked - выполняем этот код

// if (watchedFilmStorage !== [''] || watchedFilmStorage !== null) {
// onLibraryWachedBtm();
// } else {
// refs.gallerySection.innerHTML = '';
//   noticeMessage.notice();
// }
// watchedFilmStorage !== [] || ''
//   ? (refs.gallerySection.innerHTML = onLibraryWachedBtm())
//   : (refs.gallerySection.innerHTML = ''),
//   noticeMessage.notice();
// }
// if (refs.queueBtn.classList.contains('hero-buttons__btn--active')) {
//   // Если кнопка Queue в состоянии checked - выполняем этот код

//   if (queueFilmStorage !== [] && queueFilmStorage !== null) {
//     //  refs.gallerySection.innerHTML = filmListTemplate(queueFilmStorage);
//     onLibraryQueueBtn();
//   } else {
//     refs.gallerySection.innerHTML = '';
//     noticeMessage.notice();
//   }
//   //   queueFilmStorage !== [] || ''
//   //     ? (refs.gallerySection.innerHTML = onQueueBtn())
//   //     : (refs.gallerySection.innerHTML = ''),
//   //     noticeMessage.notice();
//   // }
// }
// }
// export function onAddWachedBtm() {
//   // if (addWachedBtm.classList.contains('remove')) {
//   //   onRemoveFromWatchedBtm();
//   // } else {
//   localStorage.setItem('watched-films', JSON.stringify(newFilm1, newFilm2));

// if (
//   !localStorage.getItem('watched-films').includes(watchedFilmStorage.id) &&
//   localStorage.getItem('watched-films') !== null
// ) {
//   localStorage.setItem(
//     'watched-films',
//     JSON.stringify(watchedFilmStorage.push(valueLocalStorage)),
//   );

//   // addToWatchedBtn.classList.toggle('remove');
//   // addToWatchedBtn.textContent('Remove from Wached');
// }
// if (localStorage.getItem('watched-films').includes(watchedFilmStorage.id)) {
//   // addToWatchedBtn.classList.toggle('remove');
//   // addToWatchedBtn.textContent('Remove from Wached');
//   return;
// }

// console.log(valueLocalStorage);
// console.dir(valueLocalStorage);

// export function onAddQueueBtn() {
//   // if (refs.addQueueBtn.classList.contains('remove')) {
//   //   onRemoveFromQueueBtm();
//   // } else {
//   // localStorage.setItem('queue-films', JSON.stringify(watchedFilmStorage.push(valueLocalStorage)));
//   localStorage.setItem('queue-films', JSON.stringify(newFilm1, newFilm2));

//   //   refs.addQueueBtn.classList.toggle('remove');
//   //   refs.addQueueBtn.textContent('Remove from Queue');
//   // // }
//   console.log(valueLocalStorage);
//   console.dir(valueLocalStorage);
// }
// function onRemoveFromWatchedBtm() {
//   localStorage.removeItem('watched-films');
//   addWachedBtm.classList.toggle('remove');
//   addWachedBtm.textContent('Add to Wached');
// }
// function onRemoveFromQueueBtm() {
//   localStorage.removeItem('queue-films');
//   refs.addQueueBtn.classList.toggle('remove');
//   refs.addQueueBtn.textContent('Add to Queue');
// }

// onLibraryBtn()

// localStorage.setItem('watched-films', JSON.stringify(watchedStorageJson));
// localStorage.setItem('queue-films', JSON.stringify(queueStorageJson));

// if(watchedStorageJson["id"] !== e.currentTarget.id ){
//   watchedStorageJson
// }

// ================= новый крод ==============================
export function onAddWachedBtm() {
  localStorage.setItem('watched-films', JSON.stringify(valueLocalStorage.markup));
}

export function onAddQueueBtn() {
  localStorage.setItem('queue-films', JSON.stringify(valueLocalStorage.markup));
}

export function onLibraryBtn() {
  if (watchedFilmStorage === null) {
    if (queueFilmStorage === null) {
      refs.gallerySection.innerHTML = '';
      noticeMessage.notice();
    }
    refs.gallerySection.innerHTML = queueFilmStorage;
    refs.watchedBtn.classList.remove('hero-buttons__btn--active');
  }
  if (watchedFilmStorage !== null) {
    refs.gallerySection.innerHTML = watchedFilmStorage;
  }
}

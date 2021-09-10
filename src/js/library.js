import refs from './refs';
import { notice, error } from '@pnotify/core';
//============== Костина сохранненная разметка Олиной картички===========
import { valueLocalStorage as valueForLocalStorage } from './modal-card';
import moviesApiService from '../index.js';
import createGalleryMarkup from '../js/gallery/gallery.js';

export const localStorrageData = {
  watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
  queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
};

refs.myLibraryLink.addEventListener('click', onLibraryBtn);
refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
refs.queueBtn.addEventListener('click', onLibraryQueueBtn);

function onLibraryWachedBtm() {
  let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
  if (watchedFilmsIdInLocalStorage === null) refs.containerGallery.remove();
  else renderFilms(watchedFilmsIdInLocalStorage);

  refs.watchedBtn.disabled = true;
  refs.queueBtn.disabled = false;
  refs.watchedBtn.classList.add('.hero-buttons__btn--active');
  refs.queueBtn.classList.remove('.hero-buttons__btn--active');
}

function onLibraryQueueBtn() {
  let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
  console.log(queueFilmsIdInLocalStorage);
  if (queueFilmsIdInLocalStorage === null) refs.containerGallery.remove();
  else renderFilms(queueFilmsIdInLocalStorage);

  refs.watchedBtn.disabled = false;
  refs.queueBtn.disabled = true;

  refs.watchedBtn.classList.remove('hero-buttons__btn--active');
  refs.queueBtn.classList.add('.hero-buttons__btn--active');
}
// закомментировал потому-что перенес в саму модалки в функцию addModal в modal-card.js они только внутри нормально работают )//Костя

// export function onAddWachedBtm() {
//   let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
//   if (watchedFilmsIdInLocalStorage === null) watchedFilmsIdInLocalStorage = [];
//   console.log('watchedFilmsIdInLocalStorage: ', watchedFilmsIdInLocalStorage);
//   if (!watchedFilmsIdInLocalStorage.includes(valueForLocalStorage.id)) {
//     watchedFilmsIdInLocalStorage.push(valueForLocalStorage.id);
//     localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
//   } else {
//     const num = watchedFilmsIdInLocalStorage.indexOf(valueForLocalStorage.id);
//     watchedFilmsIdInLocalStorage.splice(num, 1);
//     localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
//   }
//   updateBtnState(valueForLocalStorage.id);
// }

// export function onAddQueueBtn() {
//   let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
//   if (queueFilmsIdInLocalStorage === null) queueFilmsIdInLocalStorage = [];
//   if (!queueFilmsIdInLocalStorage.includes(valueForLocalStorage.id)) {
//     queueFilmsIdInLocalStorage.push(valueForLocalStorage.id);
//     localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
//   } else {
//     const num = queueFilmsIdInLocalStorage.indexOf(valueForLocalStorage.id);
//     queueFilmsIdInLocalStorage.splice(num, 1);
//     localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
//   }
//   updateBtnState(valueForLocalStorage.id);
// }

export function onLibraryBtn() {
  onLibraryWachedBtm();
}

// export function updateBtnState(id) {
//   const addQueueBtn = document.querySelector('.js-queue');
//   const addWatchedBtn = document.querySelector('.js-watched');
//   let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
//   let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));

//   if (watchedFilmsIdInLocalStorage.includes(id)) {
//     addWatchedBtn.innerText = 'REMOVE FROM WATCHED';
//     addWatchedBtn.classList.add('modal__button-hover');
//   } else {
//     addWatchedBtn.innerText = 'ADD TO WATCHED';
//     addWatchedBtn.classList.remove('modal__button-hover');
//   }

//   if (queueFilmsIdInLocalStorage.includes(id)) {
//     addQueueBtn.innerText = 'REMOVE FROM QUEUE';
//     addQueueBtn.classList.add('modal__button-hover');
//   } else {
//     addQueueBtn.innerText = 'ADD TO QUEUE';
//     addQueueBtn.classList.remove('modal__button-hover');
//   }
// }

async function renderFilms(arr) {
  const cardsArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    const card = await moviesApiService.fetchFullInfoOfMovie(arr[i]);
    cardsArr.push({
      backdrop_path: card.backdrop_path,
      poster_path: card.poster_path,
      original_title: card.original_title,
      vote_average: card.vote_average,
      // release_date: date,
      id: card.id,
      // genres: genreList.join(', '),
    });
  }
  createGalleryMarkup({ results: cardsArr });
}

//  =======tresh========
// // import filmListTemplate from './'
// import refs from './refs';
// import { notice, error } from '@pnotify/core';
// //============== Костина сохранненная разметка Олиной картички===========
// import { valueLocalStorage as valueForLocalStorage } from './modal-card';

// console.dir(valueForLocalStorage);
// console.log(valueForLocalStorage);

// // let valueForLocalStorage = {
// //   id: '',
// //   markup: '',
// // };

// // {
// //   "id": "825997",
// //   "markup": "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//1ho7YYp1DvCke9I1D3Olbh2Px63.jpg\" data-source=\"825997\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Rogue Hostage </h2>\n    <div>\n        Action, Thriller\n    </div>\n</li>"
// // }

// // {
// //   "id": "619297",
// //   "markup": "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg\" data-source=\"619297\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>"
// // }
// // const markup = "<li class=\"item\">\n    <div class=\"video-card\">\n        <img class=\"gallerySection__video\" src=\"https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg\" data-source=\"619297\">\n        <span class=\"video-rating\"></span>\n   \n    </div>\n    <h2 class=\"video-title\">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>"
// // const replacesMarkup = markup.replace(/\n/g, '')
// // console.log(replacesMarkup)
// // console.log(markup)

// // const newFilm1 = {
// //   id: '744275',
// //   markup:
// //     '<li class="item">\n <div class="video-card"><img class="gallery__video" src="https://image.tmdb.org/t/p/w300//92wWZAzHPrvEKSpIJxGeMmImHOf.jpg" data-source="744275"><span class="video-rating"></span></div></li>',
// // };

// // const newFilm2 = {
// //   id: '825997',
// //   markup:
// //     '<li class="item">\n    <div class="video-card">\n        <img class="gallerySection__video" src="https://image.tmdb.org/t/p/w300//1ho7YYp1DvCke9I1D3Olbh2Px63.jpg" data-source="825997">\n        <span class="video-rating"></span>\n   \n    </div>\n    <h2 class="video-title">Rogue Hostage </h2>\n    <div>\n        Action, Thriller\n    </div>\n</li>',
// // };
// // const newFilm3 = {
// //   id: '619297',
// //   markup:
// //     '<li class="item">\n    <div class="video-card">\n        <img class="gallerySection__video" src="https://image.tmdb.org/t/p/w300//cP7odDzzFBD9ycxj2laTeFWGLjD.jpg" data-source="619297">\n        <span class="video-rating"></span>\n   \n    </div>\n    <h2 class="video-title">Sweet Girl </h2>\n    <div>\n        Action, Thriller, Drama\n    </div>\n</li>',
// // };

// let watchedStorageJson = [];
// // // console.log(watchedStorageJson["markup"])

// let queueStorageJson = [];

// // watchedStorageJson.push(newFilm1, newFilm2, newFilm3)
// // console.dir(watchedStorageJson)
// // console.log(watchedStorageJson)
// // queueStorageJson.push(newFilm3)

// class NoticeMessage {
//   constructor() {}
//   notice() {
//     notice({
//       // title: 'Attention',
//       text: 'Your Library is empty',
//       width: '300px',
//       minHeight: '15px',
//       delay: 2000,
//       // addClass: 'error',
//     });
//   }
//   error() {
//     error({
//       title: 'Error',
//       text: 'No matchs found!',
//       width: '300px',
//       minHeight: '15px',
//       delay: 2000,
//       // addClass: 'error',
//     });
//   }
// }
// const noticeMessage = new NoticeMessage();

// export const localStorrageData = {
//   watchedFilmStorage: JSON.parse(localStorage.getItem('watched-films')),
//   queueFilmStorage: JSON.parse(localStorage.getItem('queue-films')),
// };

// refs.myLibraryLink.addEventListener('click', onLibraryBtn);
// refs.watchedBtn.addEventListener('click', onLibraryWachedBtm);
// refs.queueBtn.addEventListener('click', onLibraryQueueBtn);
// // refs.addQueueBtn.addEventListener('click', onAddQueueBtn);
// // refs.addWatchedBtn.addEventListener('click', onAddWachedBtm);

// function onLibraryWachedBtm() {
//   // refs.containerGallery.remove(); // повесил на onLibraryBtn
//   refs.watchedBtn.disabled = true;
//   refs.queueBtn.disabled = false;
//   refs.watchedBtn.classList.add('.hero-buttons__btn--active');
//   refs.queueBtn.classList.remove('.hero-buttons__btn--active');

//   localStorrageData.watchedFilmStorage
//     ? refs.gallerySection.insertAdjacentHTML(
//         'afterbegin',
//         `<ul class="lybrary-gallery">${localStorrageData.watchedFilmStorage.map(
//           film => film['markup'],
//         )}</ul>`,
//       )
//     : noticeMessage.notice();
//   // ? refs.gallerySection.innerHTML(
//   //     'afterbegin',
//   //     `<ul class="lybrary-gallery">${localStorrageData.watchedFilmStorage.map(
//   //       film => film['markup'],
//   //     )}</ul>`,
//   //   )

//   // onLibraryQueueBtn();
// }

// function onLibraryQueueBtn() {
//   // refs.containerGallery.remove(); // повесил на onLibraryBtn
//   refs.watchedBtn.disabled = false;
//   refs.queueBtn.disabled = true;

//   refs.watchedBtn.classList.remove('hero-buttons__btn--active');
//   refs.queueBtn.classList.add('.hero-buttons__btn--active');

//   // refs.gallerySection.innerHTML = queueFilmStorage; //для одного фильма
//   // console.log(localStorrageData.queueFilmStorage);
//   localStorrageData.queueFilmStorage
//     ? refs.gallerySection.insertAdjacentHTML(
//         'afterbegin',
//         `<ul class="lybrary-gallery">${localStorrageData.queueFilmStorage.map(
//           film => film['markup'],
//         )}</ul>`,
//       )
//     : noticeMessage.notice();

//   //===================== старый вариант внесения разметки =====================
//   // refs.gallerySection.innerHTML = queueFilmStorage.map(film => film['markup']); //для масива фильмов
//   //================================================================================================
// }

// // function onLibraryBtn() {
// //   console.log('кнопка library');

// // if (refs.watchedBtn.classList.contains('hero-buttons__btn--active')) {
// // Если кнопка Watched в состоянии checked - выполняем этот код

// // if (watchedFilmStorage !== [''] || watchedFilmStorage !== null) {
// // onLibraryWachedBtm();
// // } else {
// // refs.gallerySection.innerHTML = '';
// //   noticeMessage.notice();
// // }
// // watchedFilmStorage !== [] || ''
// //   ? (refs.gallerySection.innerHTML = onLibraryWachedBtm())
// //   : (refs.gallerySection.innerHTML = ''),
// //   noticeMessage.notice();
// // }
// // if (refs.queueBtn.classList.contains('hero-buttons__btn--active')) {
// //   // Если кнопка Queue в состоянии checked - выполняем этот код

// //   if (queueFilmStorage !== [] && queueFilmStorage !== null) {
// //     //  refs.gallerySection.innerHTML = filmListTemplate(queueFilmStorage);
// //     onLibraryQueueBtn();
// //   } else {
// //     refs.gallerySection.innerHTML = '';
// //     noticeMessage.notice();
// //   }
// //   //   queueFilmStorage !== [] || ''
// //   //     ? (refs.gallerySection.innerHTML = onQueueBtn())
// //   //     : (refs.gallerySection.innerHTML = ''),
// //   //     noticeMessage.notice();
// //   // }
// // }
// // }
// // export function onAddWachedBtm() {
// //   // if (addWachedBtm.classList.contains('remove')) {
// //   //   onRemoveFromWatchedBtm();
// //   // } else {
// //   localStorage.setItem('watched-films', JSON.stringify(newFilm1, newFilm2));

// // if (
// //   !localStorage.getItem('watched-films').includes(watchedFilmStorage.id) &&
// //   localStorage.getItem('watched-films') !== null
// // ) {
// //   localStorage.setItem(
// //     'watched-films',
// //     JSON.stringify(watchedFilmStorage.push(valueForLocalStorage)),
// //   );

// //   // addToWatchedBtn.classList.toggle('remove');
// //   // addToWatchedBtn.textContent('Remove from Wached');
// // }
// // if (localStorage.getItem('watched-films').includes(watchedFilmStorage.id)) {
// //   // addToWatchedBtn.classList.toggle('remove');
// //   // addToWatchedBtn.textContent('Remove from Wached');
// //   return;
// // }

// // console.log(valueForLocalStorage);
// // console.dir(valueForLocalStorage);

// // export function onAddQueueBtn() {
// //   // if (refs.addQueueBtn.classList.contains('remove')) {
// //   //   onRemoveFromQueueBtm();
// //   // } else {
// //   // localStorage.setItem('queue-films', JSON.stringify(watchedFilmStorage.push(valueForLocalStorage)));
// //   localStorage.setItem('queue-films', JSON.stringify(newFilm1, newFilm2));

// //   //   refs.addQueueBtn.classList.toggle('remove');
// //   //   refs.addQueueBtn.textContent('Remove from Queue');
// //   // // }
// //   console.log(valueForLocalStorage);
// //   console.dir(valueForLocalStorage);
// // }
// // function onRemoveFromWatchedBtm() {
// //   localStorage.removeItem('watched-films');
// //   addWachedBtm.classList.toggle('remove');
// //   addWachedBtm.textContent('Add to Wached');
// // }
// // function onRemoveFromQueueBtm() {
// //   localStorage.removeItem('queue-films');
// //   refs.addQueueBtn.classList.toggle('remove');
// //   refs.addQueueBtn.textContent('Add to Queue');
// // }

// // onLibraryBtn()

// // localStorage.setItem('watched-films', JSON.stringify(watchedStorageJson));
// // localStorage.setItem('queue-films', JSON.stringify(queueStorageJson));

// // if(watchedStorageJson["id"] !== e.currentTarget.id ){
// //   watchedStorageJson
// // }

// // ================= новый код ==============================
// export function onAddWachedBtm() {
//   console.log('on AddWachedBtm if #1');
//   // if (localStorrageData?.watchedFilmStorage?.id === valueForLocalStorage.id) {
//   //   console.log('localStorrageData?.watchedFilmStorage?.id === valueForLocalStorage.id');
//   //   localStorrageData.watchedFilmStorage['watched-films'].filter(
//   //     film => film.id !== valueForLocalStorage.id,
//   //   );
//   // }

//   // localStorrageData?.watchedFilmStorage['watched-films']
//   //   ? (localStorrageData.watchedFilmStorage['watched-films'] =
//   //       localStorrageData.watchedFilmStorage['watched-films'].push(valueForLocalStorage))
//   //   : (localStorrageData.watchedFilmStorage = valueForLocalStorage);

//   localStorage.setItem('watched-films', JSON.stringify([valueForLocalStorage]));
//   //==================== не исполльзовать =====================
//   // localStorage.setItem('watched-films', JSON.stringify(valueForLocalStorage.markup));
// }

// export function onAddQueueBtn() {
//   console.log('on AddQueueBtn if #1');

//   if (localStorrageData?.queueFilmStorage?.id === valueForLocalStorage.id) {
//     localStorrageData.queueFilmStorage['queue-films'].filter(
//       film => film.id !== valueForLocalStorage.id,
//     );
//   }
//   localStorrageData.queueFilmStorage
//     ? (localStorrageData.queueFilmStorage =
//         localStorrageData.queueFilmStorage.push(valueForLocalStorage))
//     : (localStorrageData.queueFilmStorage = valueForLocalStorage);

//   localStorage.setItem('queue-films', JSON.stringify([valueForLocalStorage]));

//   //==================== не исполльзовать =====================
//   // localStorage.setItem('queue-films', JSON.stringify(valueForLocalStorage.markup));
// }

// export function onLibraryBtn() {
//   refs.myLibraryLink.disabled;
//   refs.containerGallery.remove();

//   localStorrageData.watchedFilmStorage ? onLibraryWachedBtm() : onLibraryQueueBtn();

//   // if (localStorrageData) {
//   //   if (localStorrageData.watchedFilmStorage['watched-films']) {
//   //     onLibraryWachedBtm();
//   //   }
//   //   if (
//   //     !localStorrageData.watchedFilmStorage['watched-films'] &&
//   //     localStorrageData.queueFilmStorage['queue-films']
//   //   ) {
//   //     onLibraryWachedBtm();
//   //   }
//   // }
//   // noticeMessage.notice();
// }

import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './api/api-service.js';
import tplModalCard from '../templates/modal-card.hbs';
import refs from './refs';

import cliSpinners from 'cli-spinners';
import { onAddWachedBtm, onAddQueueBtn, localStorrageData, updateBtnState } from './library';

// экземпляр класа для получения API
const moviesApiService = new MoviesApiService();

//пустой объект для записи в LocalStorage

export const valueLocalStorage = {
  id: '',
};

//Переменная для смены бегдропа
let standardBackdrop = true;

// слушатель на галерею
refs.gallery.addEventListener('click', getMovieIdInImg);

// Один слушатель на СЛАЙДЕР
refs.filmStrip.addEventListener('click', getMovieId);

//При клике на карточку фильма в gallery
function getMovieIdInImg(e) {
  const tagName = e.target.nodeName;
  const className = e.target.className;
  if (tagName != 'IMG' && className !== 'gallery-image') {
    return;
  }
  getMovieId(e);
}

//получение id фильма и записываем в объект;
function getMovieId(e) {
  const movieId = e.target.dataset.source;
  getDataMovieById(movieId);
  valueLocalStorage.id = movieId;
}

// отправляем запрос на сервер через id и получаем информацию по фильму
function getDataMovieById(movieId) {
  moviesApiService.fetchFullInfoOfMovie(movieId).then(movie => {
    insertDataIntoTemplate(movie);
  });
}

//Генерация шаблона с информацией что мы получили через id
function insertDataIntoTemplate(movie) {
  const templateMovie = tplModalCard(movie);
  addModal(templateMovie);
}

//реализация модального окна через библиотеку basicLightbox
function addModal(dataMovie) {
  //новый экземпляр basicLightbox
  const ModalCard = basicLightbox.create(dataMovie, {
    //Параметр из документации (позволяет нам что-то делать во время открытия модального окна)
    onShow: ModalCard => {
      //получение id фильма для віполнения проверки
      const id = ModalCard.element().querySelector('IMG').dataset.set;
      //ссылка на елементы кнопок

      const addWatchedBtn = ModalCard.element().querySelector('.js-watched');
      const addQueueBtn = ModalCard.element().querySelector('.js-queue');
      //слашетели  на елементы кнопок
      addWatchedBtn.addEventListener('click', onAddWachedBtm);
      addQueueBtn.addEventListener('click', onAddQueueBtn);
      updateBtnState(id);

      // запретить скролл страницы при открытии модалки (hidden-без предоставления прокрутки)
      document.body.style.overflow = 'hidden';
      //Вешаем слушатели на елементы
      document.addEventListener('keydown', closeEsc);
      ModalCard.element().querySelector('.modal__movie-poster').addEventListener('click', givesId);
      ModalCard.element()
        .querySelector('.modal__close-button')
        .addEventListener('click', modalClose);
      ModalCard.element().querySelector('.modal').addEventListener('click', SecretModal);

      //закрытие через клик на крестик
      function modalClose() {
        ModalCard.close();
        document.removeEventListener('keydown', closeEsc);
      }
      //закрытие через нажатие кнопки Esc
      function closeEsc(e) {
        if (e.code === 'Escape') {
          ModalCard.close();
          console.log('Keydown: ', e.code);
          document.removeEventListener('keydown', closeEsc);
        }
      }

      function givesId(e) {
        launchMovieTrailer(id);
      }

      //проверяет есть ли id фильма в LocalStorage или нет и добавляет или удаляет
      function onAddWachedBtm() {
        let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
        if (watchedFilmsIdInLocalStorage === null) watchedFilmsIdInLocalStorage = [];
        if (!watchedFilmsIdInLocalStorage.includes(id)) {
          watchedFilmsIdInLocalStorage.push(id);
          localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
        } else {
          const num = watchedFilmsIdInLocalStorage.indexOf(id);
          watchedFilmsIdInLocalStorage.splice(num, 1);
          localStorage.setItem('watched-films', JSON.stringify(watchedFilmsIdInLocalStorage));
        }
        updateBtnState(id);
      }
      //проверяет есть ли id фильма в LocalStorage или нет и добавляет или удаляет
      function onAddQueueBtn() {
        let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
        if (queueFilmsIdInLocalStorage === null) queueFilmsIdInLocalStorage = [];
        if (!queueFilmsIdInLocalStorage.includes(id)) {
          queueFilmsIdInLocalStorage.push(id);
          localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
        } else {
          const num = queueFilmsIdInLocalStorage.indexOf(id);
          queueFilmsIdInLocalStorage.splice(num, 1);
          localStorage.setItem('queue-films', JSON.stringify(queueFilmsIdInLocalStorage));
        }
        updateBtnState(id);
      }

      //Проверка на нахождение id фильма в LocalStorage и прорисовка кнопок
      function updateBtnState(id) {
        let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
        let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));

        if (watchedFilmsIdInLocalStorage.includes(id)) {
          addWatchedBtn.innerText = 'REMOVE FROM WATCHED';
          addWatchedBtn.classList.add('modal__button-hover');
        } else {
          addWatchedBtn.innerText = 'ADD TO WATCHED';
          addWatchedBtn.classList.remove('modal__button-hover');
        }

        if (queueFilmsIdInLocalStorage.includes(id)) {
          addQueueBtn.innerText = 'REMOVE FROM QUEUE';
          addQueueBtn.classList.add('modal__button-hover');
        } else {
          addQueueBtn.innerText = 'ADD TO QUEUE';
          addQueueBtn.classList.remove('modal__button-hover');
        }
      }
    },
    onClose: ModalCard => {
      //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
      document.body.style.overflow = 'visible';
      //удаляем слушатель на Esc
    },
  });

  ModalCard.show();
}

//При клике постер фильма
function launchMovieTrailer(id) {
  moviesApiService.fetchMovieTrtailer(id).then(video => {
    const idTrailer = video.results[0].id;
    console.log(idTrailer);
    // turnOnTheTrailer(idTrailer);
  });
}

// function turnOnTheTrailer(id) {
//   const ModalCardTrailer = basicLightbox.create(
//     `<video controls>
//         <source src="width="560" height="315" src='https://www.youtube.com/watch?v=${id}'>
//     </video>`,
//   );
//   ModalCardTrailer.show();
// }

//При нажатии на модалку вылазит постер вместо бегдропа
//При повторном нажатии на модалку бегдроп возращаеться
function SecretModal(e) {
  const x = document.querySelector('.basicLightbox');
  const modal = e.target.nodeName;
  const Url = e.currentTarget.dataset.set;

  if (modal !== 'DIV') {
    return;
  } else {
    if (standardBackdrop) {
      setTimeout(() => {
        x.style.backgroundSize = 'cover';
        x.style.backgroundImage = `url(${Url})`;
        standardBackdrop = false;
      }, 250);
    } else {
      setTimeout(() => {
        x.style.removeProperty('background-size');
        x.style.removeProperty('background-image');
        x.style.removeProperty('animation');
        standardBackdrop = true;
      }, 250);
    }
  }
}

// _______________________реализация модального окна через библиотеку basicLightbox____длинный-вариант_____________
// function addModal(dataMovie) {
//   //новый экземпляр basicLightbox
//   const ModalCard = basicLightbox.create(dataMovie, {
//     //Параметр из документации (позволяет нам что-то делать во время открытия модального окна)
//     onShow: ModalCard => {
//       // запретить скролл страницы при открытии модалки (hidden-без предоставления прокрутки)
//       document.body.style.overflow = 'hidden';

//       //_____________ссылки на елементы для смены бекдропа _____________
//       const movieModal = ModalCard.element().querySelector('.modal');
//       // const movieTitel = ModalCard.element().querySelector('[data-set]');
//       // ________в modal-card.htb надо розкомментировать________________

//       //ссылки елементы из шаблона
//       const moviePoster = ModalCard.element().querySelector('.modal__movie-poster');
//       const addToWatchedBtn = ModalCard.element().querySelector('.js-watched');
//       const addToQueueBtn = ModalCard.element().querySelector('.js-queue');
//       const closeBtn = ModalCard.element().querySelector('.modal-close-button');

//       //_____________слушатели для смены бекдропа _____________
//       movieModal.addEventListener('click', SecretModal);
//       // movieTitel.addEventListener('click', SecretTitle);
//       // _______________________________________________________________

//       //Слушатели на елементы
//       moviePoster.addEventListener('click', launchMovieTrailer);
//       addToWatchedBtn.addEventListener('click', clgOk);
//       addToQueueBtn.addEventListener('click', clgNo);
//       closeBtn.addEventListener('click', modalClose);
//       document.addEventListener('keydown', closeEsc);

//       //закрытие через клик на крестик
//       function modalClose() {
//         ModalCard.close();
//         console.log('close');
//         document.removeEventListener('keydown', closeEsc);
//       }

//       //закрытие через нажатие кнопки Esc
//       function closeEsc(e) {
//         if (e.code === 'Escape') {
//           ModalCard.close();
//           console.log('Keydown: ', e.code);
//           document.removeEventListener('keydown', closeEsc);
//         }
//       }
//     },
//     onClose: ModalCard => {
//       //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
//       document.body.style.overflow = 'visible';
//     },
//   });

//   ModalCard.show();
// }

// _____________________________________________________________________________
//При нажатии на оригинальное название фильма вылазит постер вместо бегдропа
//При повторном нажатии на оригинальное название фильма бегдроп возращаеться
// function SecretTitle(e) {
//   const x = document.querySelector('.basicLightbox');
//   const backgroundIMG = e.currentTarget.dataset.set;
//   if (standardBackdrop) {
//     setTimeout(() => {
//       x.style.backgroundSize = 'cover';
//       x.style.backgroundImage = `url(${backgroundIMG})`;
//       standardBackdrop = false;
//     }, 450);
//   } else {
//     setTimeout(() => {
//       x.style.removeProperty('background-size');
//       x.style.removeProperty('background-image');
//       standardBackdrop = true;
//     }, 450);
//   }
// }

// _______________________________________________________________________________
//получение id фильма и разметки карточки фильма ;
// function getMovieIdandMurkup(e) {
//   const tagImg = e.target.nodeName;
//   if (tagImg !== 'IMG') {
//     return;
//   }
//   const murkupCadrMovie = e.target.closest('.item').outerHTML;
//   console.dir(murkupCadrMovie);
//   const movieId = e.target.dataset.source;
// //   console.log('getMovieIdandMurkup ~ movieId', movieId);
//   getDataMovieById(movieId);
// }
// ___________________________________________________________________

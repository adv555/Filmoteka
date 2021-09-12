import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './api/api-service.js';
import tplModalCard from '../templates/modal-card.hbs';
import tplModalTrailer from '../templates/trailer.hbs';

import refs from './refs';

import cliSpinners from 'cli-spinners';
import {
  onAddWachedBtm,
  onAddQueueBtn,
  reloadLocalStorage,
  localStorrageData,
  renderWatchedFilmStorage,
  renderQueueFilmStorage,
} from './library';
import {
  emptyLibraryNotice,
  emptyWatchedStoragedNotice,
  emptyQueueStoragedNotice,
} from './notification';

//Кастомный помощник библеотеки - ругаетсья , но работает
// Handlebars.registerHelper('notId', function (value) {
//   return value !== 'ID';
// });

// экземпляр класа для получения API
const moviesApiService = new MoviesApiService();

//пустой объект для записи в LocalStorage

export const valueLocalStorage = {
  id: '',
  markup: '',
};
console.log(valueLocalStorage);
//Переменная для смены бегдропа
let standardBackdrop = true;

// слушатель на галерею
refs.gallery.addEventListener('click', getMovieIdAndMarkupCardMovie);

//listner to SLIDER
// refs.sliderMovieInfo.addEventListener('click', getMovieId);

// Один слушатель на СЛАЙДЕР
refs.filmStrip.addEventListener('click', getMovieIdAndMarkupCardMovie);

//При клике на карточку фильма в gallery
function getMovieIdAndMarkupCardMovie(e) {
  const className = e.target.className;
  const tagName = e.target.nodeName;
  if (tagName !== 'IMG' && className !== 'gallery-image') {
    return;
  }
  getMovieId(e);
  getMarkupCardMovie(e);
}

//получение id фильма и записываем в объект;
function getMovieId(e) {
  const movieId = e.target.dataset.source;
  getDataMovieById(movieId);
  valueLocalStorage.id = movieId;
  return movieId;
}

//получение разметки карточки фильма и записываем в объект ;
function getMarkupCardMovie(e) {
  const markupCadrMovie = e.target.closest('LI').outerHTML;
  valueLocalStorage.markup = markupCadrMovie;
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
      // запретить скролл страницы при открытии модалки (hidden-без предоставления прокрутки)
      document.body.style.overflow = 'hidden';
      // Получаем объект данных из LocalStorage
      const watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));
      const queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
      // получаем id фильма чья карточка запущена
      const id = ModalCard.element().querySelector('IMG').dataset.set;
      //Получаем ссылки на елементы модального окна
      const ModalWindow = ModalCard.element().querySelector('.modal');
      const addWatchedBtn = ModalCard.element().querySelector('.js-watched');
      const addQueueBtn = ModalCard.element().querySelector('.js-queue');
      const moviePoster = ModalCard.element().querySelector('.modal__movie-poster');
      const closeBtn = ModalCard.element().querySelector('.modal__close-button');

      //Вешаем слушатели на елементы
      document.addEventListener('keydown', closeEsc);
      addWatchedBtn.addEventListener('click', onAddWachedBtm);
      addQueueBtn.addEventListener('click', onAddQueueBtn);
      moviePoster.addEventListener('click', can);
      closeBtn.addEventListener('click', modalClose);
      ModalWindow.addEventListener('click', SecretModal);

      function can(e) {
        launchMovieTrailer(e);
        SecretVideo(e);
      }

      //Проверка на пустой ли объект
      if (watchedFilmsIdInLocalStorage !== null && watchedFilmsIdInLocalStorage.length !== 0) {
        //Проверка на наличие id фильма в localeStorage для кнопки Watch
        if (watchedFilmsIdInLocalStorage.map(film => film.id).includes(id)) {
          //Ставит кнопке клас и меняет текст
          addWatchedBtn.innerText = 'REMOVE FROM WATCHED';
          addWatchedBtn.classList.add('modal__button-hover');
        }
      }
      if (queueFilmsIdInLocalStorage !== null && queueFilmsIdInLocalStorage.length !== 0) {
        //Проверка на наличие id фильма в localeStorage для кнопки Watch Queue
        if (queueFilmsIdInLocalStorage.map(film => film.id).includes(id)) {
          //Ставит кнопке клас и меняет текст
          addQueueBtn.innerText = 'REMOVE FROM QUEUE';
          addQueueBtn.classList.add('modal__button-hover');
        }
      }

      //закрытие через клик на крестик
      function modalClose() {
        ModalCard.close();
        document.removeEventListener('keydown', closeEsc);
      }
      //закрытие через нажатие кнопки Esc
      function closeEsc(e) {
        if (e.code === 'Escape') {
          ModalCard.close();
          document.removeEventListener('keydown', closeEsc);
        }
      }
    },
    onClose: ModlCard => {
      //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
      document.body.style.overflow = 'visible';

      // reloadLocalStorage();
      let queueFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('queue-films'));
      let watchedFilmsIdInLocalStorage = JSON.parse(localStorage.getItem('watched-films'));

      if (refs.myLibraryLink.classList.contains('site-nav__button--active')) {
        // ============== если везде пусто ==================================
        if (
          (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) &&
          (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0)
        ) {
          refs.myLibraryNotice.classList.remove('visually-hidden');
        }

        if (
          refs.watchedBtn.classList.contains('hero-buttons__btn--active') &&
          watchedFilmsIdInLocalStorage.length === 0
        ) {
          if (!queueFilmsIdInLocalStorage.length === 0) {
            renderQueueFilmStorage();
            refs.watchedBtn.classList.remove('hero-buttons__btn--active');
            refs.queueBtn.classList.add('hero-buttons__btn--active');
          }
          emptyWatchedStoragedNotice();
        } else {
          renderWatchedFilmStorage();
        }

        if (
          refs.queueBtn.classList.contains('hero-buttons__btn--active') &&
          queueFilmsIdInLocalStorage.length === 0
        ) {
          if (!watchedFilmsIdInLocalStorage.length === 0) {
            renderWatchedFilmStorage();
            refs.watchedBtn.classList.add('hero-buttons__btn--active');
            refs.queueBtn.classList.remove('hero-buttons__btn--active');
          }
          emptyQueueStoragedNotice();
        } else {
          renderQueueFilmStorage();
        }
      }
      reloadLocalStorage();
    },
  });

  ModalCard.show();
}

// отправляем запрос на сервер через id и получаем информацию о трейлерах
function launchMovieTrailer(e) {
  const idMoive = e.target.dataset.set;
  moviesApiService
    .fetchMovieTrtailer(idMoive)
    .then(video => {
      const idTrailer = video.results[0];
      trailerTemplate(idTrailer);
    })
    .catch(console.log);
}

function trailerTemplate(idTrailer) {
  const templateTrailer = tplModalTrailer(idTrailer);
  turnOnTheTrailer(templateTrailer);
}

//реализация выплывающего видео через библиотеку basicLightbox
function turnOnTheTrailer(trailerKey) {
  const ModalCardTrailer = basicLightbox.create(trailerKey, {
    onShow: ModalCardTrailer => {
      document.addEventListener('keydown', modalCloseVideo);
      const closeBtnVideo = ModalCardTrailer.element().querySelector('.modal__close-button-video');
      closeBtnVideo.addEventListener('click', modalCloseVideo);

      function modalCloseVideo() {
        ModalCardTrailer.close();
        // const x = document.querySelector('.basicLightbox');
        // x.style.removeProperty('background-size');
        // x.style.removeProperty('background-image');
        // x.style.removeProperty('animation');
        // const modalCloseBtn = document.querySelector('.modal__close-button');
        // console.log(modalCloseBtn);
        // modalCloseBtn.style.color = '#ff6b08';
      }
    },
    onClose: ModalCardTrailer => {
      //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
      // const x = document.querySelector('.basicLightbox');
      // x.style.removeProperty('background-size');
      // x.style.removeProperty('background-image');
      // x.style.removeProperty('animation');
    },
  });
  ModalCardTrailer.show();
}

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
      x.style.backgroundSize = 'cover';
      x.style.backgroundImage = `url(${Url})`;
      standardBackdrop = false;
    } else {
      x.style.removeProperty('background-size');
      x.style.removeProperty('background-image');
      x.style.removeProperty('animation');
      standardBackdrop = true;
    }
  }
}

function SecretVideo(e) {
  const x = document.querySelector('.basicLightbox');
  const modalCloseBtn = document.querySelector('.modal__close-button');
  const Url = e.currentTarget.dataset.img;
  x.style.backgroundSize = 'cover';
  // modalCloseBtn.style.color = '#ffffff';
  x.style.backgroundImage = `url(${Url})`;
}

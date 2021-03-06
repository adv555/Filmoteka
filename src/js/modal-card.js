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
  reloadHeroBtnStatus,
  onLibraryBtn,
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

//Переменная для смены бегдропа
let standardBackdrop = true;

// слушатель на галерею
refs.gallery.addEventListener('click', getMovieIdAndMarkupCardMovie);

// Один слушатель на СЛАЙДЕР
refs.filmStrip.addEventListener('click', getMovieIdAndMarkupCardMovie);

//При клике на карточку фильма в gallery
function getMovieIdAndMarkupCardMovie(e) {
  const className = e.target.className;
  const tagName = e.target.nodeName;
  if (e.target.tagName == 'IMG' && e.target.className == 'gallery-image') {
    getMovieId(e);
    getMarkupCardMovie('gallery');
  } else if (e.target.tagName == 'IMG' && e.target.className == 'false-image') {
    getMovieId(e);
    getMarkupCardMovie('slider');
  }
  return;
}

//получение id фильма и записываем в объект;
function getMovieId(e) {
  const movieId = e.target.dataset.source;
  getDataMovieById(movieId);
  valueLocalStorage.id = movieId;
  return movieId;
}

// ========= get movie current ID from localStorage and return array with 1 object {getMoviefromLS('galleryCardList')} ============
function getMoviefromLS(filmLS) {
  let arr = JSON.parse(localStorage.getItem(filmLS));
  return arr.filter(function (item, i, arr) {
    return item.id == valueLocalStorage.id;
  })[0];
}

//получение разметки карточки фильма и записываем в объект ;
function getMarkupCardMovie(section) {
  if (section == 'gallery') {
    return (valueLocalStorage.markup = getMoviefromLS('galleryCardList'));
  }
  if (section == 'slider') {
    //console.log(getMoviefromLS('UpcomingCollection'))
    return (valueLocalStorage.markup = getMoviefromLS('UpcomingCollection'));
  }
  return;
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
      let color = true;
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
      const movieImg = ModalCard.element().querySelector('.modal__video');
      const closeBtn = ModalCard.element().querySelector('.modal__close-button');

      //Вешаем слушатели на елементы
      document.addEventListener('keydown', closeEsc);
      addWatchedBtn.addEventListener('click', onAddWachedBtm);
      addQueueBtn.addEventListener('click', onAddQueueBtn);
      movieImg.addEventListener('click', can);
      moviePoster.addEventListener('mouseover', canColor);
      moviePoster.addEventListener('mouseout', canColor);
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

      function canColor(e) {
        if (color) {
          movieImg.style.color = 'red';
          color = false;
        } else {
          movieImg.style.removeProperty('color');
          color = true;
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
        if (!queueFilmsIdInLocalStorage) queueFilmsIdInLocalStorage = [];
        if (!watchedFilmsIdInLocalStorage) watchedFilmsIdInLocalStorage = [];
        if (
          (watchedFilmsIdInLocalStorage === null || watchedFilmsIdInLocalStorage.length === 0) &&
          (queueFilmsIdInLocalStorage === null || queueFilmsIdInLocalStorage.length === 0)
        ) {
          reloadLocalStorage();
          reloadHeroBtnStatus();
          onLibraryBtn();
          refs.myLibraryNotice.classList.remove('visually-hidden');
        } else {
          if (
            refs.watchedBtn.classList.contains('hero-buttons__btn--active') &&
            watchedFilmsIdInLocalStorage.length !== 0 &&
            queueFilmsIdInLocalStorage.length !== 0
          ) {
            refs.watchedBtn.classList.add('hero-buttons__btn--active');
            refs.queueBtn.classList.remove('hero-buttons__btn--active');
            reloadLocalStorage();
            // renderWatchedFilmStorage();
            onLibraryBtn();
          } else if (
            watchedFilmsIdInLocalStorage.length === 0 &&
            queueFilmsIdInLocalStorage.length !== 0
          ) {
            refs.watchedBtn.classList.remove('hero-buttons__btn--active');
            refs.queueBtn.classList.add('hero-buttons__btn--active');
            reloadLocalStorage();
            // renderQueueFilmStorage();
            onLibraryBtn();
          }

          if (
            refs.queueBtn.classList.add('hero-buttons__btn--active') &&
            watchedFilmsIdInLocalStorage.length !== 0 &&
            queueFilmsIdInLocalStorage.length !== 0
          ) {
            refs.watchedBtn.classList.remove('hero-buttons__btn--active');
            refs.queueBtn.classList.add('hero-buttons__btn--active');
            reloadLocalStorage();
            // renderQueueFilmStorage();
            onLibraryBtn();
          } else if (
            watchedFilmsIdInLocalStorage.length !== 0 &&
            queueFilmsIdInLocalStorage.length === 0
          ) {
            refs.watchedBtn.classList.add('hero-buttons__btn--active');
            refs.queueBtn.classList.remove('hero-buttons__btn--active');
            reloadLocalStorage();
            // renderWatchedFilmStorage();
            onLibraryBtn();
          }
          if (
            watchedFilmsIdInLocalStorage.length === 0 &&
            queueFilmsIdInLocalStorage.length !== 0
          ) {
            reloadLocalStorage();
            // renderQueueFilmStorage();
            onLibraryBtn();
          }
          if (
            watchedFilmsIdInLocalStorage.length !== 0 &&
            queueFilmsIdInLocalStorage.length === 0
          ) {
            reloadLocalStorage();
            // renderWatchedFilmStorage();
            onLibraryBtn();
          }
          onLibraryBtn();
        }
        onLibraryBtn();
      }
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
        const x = document.querySelector('.basicLightbox');
        if (x !== null) {
          x.style.removeProperty('background-size');
          x.style.removeProperty('background-image');
          x.style.removeProperty('animation');
        }
      }
    },
    onClose: ModalCardTrailer => {
      //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
      const x = document.querySelector('.basicLightbox');
      const modalCloseBtn = document.querySelector('.modal__close-button');

      const modalbackground = document.querySelector('.modal');
      const vote = document.querySelector('.modal__vote');
      const votes = document.querySelector('.modal__votes');

      if (x !== null || modalCloseBtn !== null) {
        x.style.removeProperty('background-size');
        x.style.removeProperty('background-image');
        x.style.removeProperty('animation');
        standardBackdrop = true;
      }
      if (x == !null || modalCloseBtn !== null) {
        modalCloseBtn.style.removeProperty('color');
        votes.classList.remove('opacity');
        vote.classList.remove('opacity');
        modalbackground.style.removeProperty('cursor');
        modalbackground.classList.remove('mobalbackground');
      }
    },
  });
  ModalCardTrailer.show();
}

let video = true;
//При нажатии на модалку вылазит постер вместо бегдропа
//При повторном нажатии на модалку бегдроп возращаеться
function SecretModal(e) {
  const x = document.querySelector('.basicLightbox');
  const modal = e.target.nodeName;
  const Url = e.currentTarget.dataset.set;
  const modalbackground = document.querySelector('.modal');
  const vote = document.querySelector('.modal__vote');
  const votes = document.querySelector('.modal__votes');
  const poster = document.querySelector('.modal__movie-poster');
  const posterexamination = e.currentTarget.dataset.post;

  if (modal !== 'DIV') {
    return;
  } else {
    if (standardBackdrop) {
      x.style.backgroundSize = 'cover';
      modalbackground.classList.add('mobalbackground');
      modalbackground.style.cursor = 'pointer';
      votes.classList.add('opacity');
      vote.classList.add('opacity');
      standardBackdrop = false;
      if (posterexamination === 'no') {
        x.style.backgroundImage = `url(${Url})`;
        poster.classList.add('opacity');
      } else {
        x.style.backgroundImage = `url(${Url})`;
      }
    } else {
      x.style.removeProperty('background-size');
      x.style.removeProperty('background-image');
      x.style.removeProperty('animation');
      votes.classList.remove('opacity');
      vote.classList.remove('opacity');
      poster.classList.remove('opacity');
      modalbackground.style.removeProperty('cursor');
      modalbackground.classList.remove('mobalbackground');
      standardBackdrop = true;
    }
  }
}

function SecretVideo(e) {
  const x = document.querySelector('.basicLightbox');
  const modalCloseBtn = document.querySelector('.modal__close-button');
  const Url = e.target.dataset.img;
  standardBackdrop = false;
  x.style.backgroundSize = 'cover';
  modalCloseBtn.style.color = 'transparent';
  x.style.backgroundImage = `url(${Url})`;
}

export { trailerTemplate, getMovieIdAndMarkupCardMovie };

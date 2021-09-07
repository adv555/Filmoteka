import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './api/api-service.js';
import tplModalCard from '../templates/modal-card.hbs';
import refs from './refs';
import cliSpinners from 'cli-spinners';

// экземпляр класа для получения API
const moviesApiService = new MoviesApiService();

//пустой объект для записи в LocalStorage
let valueLocalStorage = {
  id: '',
  markup: '',
};

//Переменная для бегдропа ( определяет ли )
let standardBackdrop = true;

// слушатель на галерею
refs.gallery.addEventListener('click', getMovieId);
refs.gallery.addEventListener('click', getMarkupCardMovie);

//listner to SLIDER
refs.filmStrip.addEventListener('click', getMovieId);
refs.filmStrip.addEventListener('click', getMarkupCardMovie);

//получение id фильма и записываем в объект;
function getMovieId(e) {
  const tagImg = e.target.nodeName;
  if (tagImg !== 'IMG') {
    return;
  }
  const movieId = e.target.dataset.source;
  getDataMovieById(movieId);
  valueLocalStorage.id = movieId;
}

//получение разметку карточки фильма и записываем в объект ;
function getMarkupCardMovie(e) {
  const tagImg = e.target.nodeName;
  if (tagImg !== 'IMG') {
    return;
  }
  const murkupCadrMovie = e.target.closest('LI').outerHTML;
  valueLocalStorage.markup = murkupCadrMovie;
}

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

// получение информации по фильму через id
function getDataMovieById(movieId) {
  moviesApiService.fetchFullInfoOfMovie(movieId).then(movie => {
    insertDataIntoTemplate(movie);
  });
}

//Генерация шаблона
function insertDataIntoTemplate(movie) {
  const templateMovie = tplModalCard(movie);
  addModal(templateMovie);
}

//реализация модального окна через библиотеку basicLightbox
function addModal(dataMovie) {
  const ModalCard = basicLightbox.create(dataMovie, {
    //Параметр из документации (позволяет нам что-то делать во время открытия модального окна)
    onShow: ModalCard => {
      // запретить скролл страницы при открытии модалки (hidden-без предоставления прокрутки)
      document.body.style.overflow = 'hidden';

      //_____________ссылки на елементы для смены бекдропа _____________
      const movieModal = ModalCard.element().querySelector('.modal');
      // const movieTitel = ModalCard.element().querySelector('[data-set]');
      // ________в modal-card.htb надо розкомментировать________________

      //ссылки елементы из шаблона
      const moviePoster = ModalCard.element().querySelector('.modal__movie-poster');
      const addToWatchedBtn = ModalCard.element().querySelector('.js-watched');
      const addToQueueBtn = ModalCard.element().querySelector('.js-queue');
      const closeBtn = ModalCard.element().querySelector('.modal-close-button');

      //_____________слушатели для смены бекдропа _____________
      movieModal.addEventListener('click', SecretModal);
      // movieTitel.addEventListener('click', SecretTitle);
      // _______________________________________________________________

      //Слушатели на елементы
      moviePoster.addEventListener('click', launchMovieTrailer);
      addToWatchedBtn.addEventListener('click', clgOk);
      addToQueueBtn.addEventListener('click', clgNo);
      closeBtn.addEventListener('click', modalClose);
      document.addEventListener('keydown', closeEsc);

      //закрытие через клик на крестик
      function modalClose() {
        ModalCard.close();
        console.log('close');
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
    },
    onClose: ModalCard => {
      //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
      document.body.style.overflow = 'visible';
    },
  });

  ModalCard.show();
}

function clgOk() {
  console.log(valueLocalStorage);
  console.log('button1-OK');
  //___________________________
}

function clgNo() {
  console.dir(valueLocalStorage);
  console.log('button2-NO');
  //___________________________
}

function launchMovieTrailer() {
  //____Костя убери console.log
  console.log('launch Movie Trailer');
  //___________________________
}

//При нажатии на модалку вылазит постер вместо бегдропа
//При повторном нажатии на модалку бегдроп возращаеться
function SecretModal(e) {
  const x = document.querySelector('.basicLightbox');
  const modal = e.target.nodeName;
  const backgroundIMG = e.currentTarget.firstElementChild.dataset.set;

  if (modal !== 'DIV') {
    return;
  } else {
    if (standardBackdrop) {
      setTimeout(() => {
        x.style.backgroundSize = 'cover';
        x.style.backgroundImage = `url(${backgroundIMG})`;
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

// document.body.clientWidth.onchange = Vchange();
// function Vchange() {
//   console.log('изменение');
// }

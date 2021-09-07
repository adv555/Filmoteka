import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './api/api-service.js';
import tplModalCard from '../templates/modal-card.hbs';
import refs from './refs';

// экземпляр класа для получения API
const moviesApiService = new MoviesApiService();

//пустой объект для записи в LocalStorage
let valueLocalStorage = {
  id: '',
  markup: '',
};

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

      //ссылки елементы из шаблона
      const movieModal = ModalCard.element().querySelector('.modal');
      const moviePoster = ModalCard.element().querySelector('.modal__movie-poster');
      const addToWatchedBtn = ModalCard.element().querySelector('.js-watched');
      const addToQueueBtn = ModalCard.element().querySelector('.js-queue');
      const closeBtn = ModalCard.element().querySelector('.modal-close-button');

      //Слушатели на елементы
      movieModal.addEventListener('click', Secret);
      moviePoster.addEventListener('click', launchMovieTrailer);
      addToWatchedBtn.addEventListener('click', clgOk);
      addToQueueBtn.addEventListener('click', clgNo);
      closeBtn.addEventListener('click', modalClose);
      document.addEventListener('keydown', closeEsc);

      //Делает секрет
      function Secret(e) {
        const x = document.querySelector('.basicLightbox');
        const backgroundIMG = e.currentTarget.firstElementChild.dataset.set;
        if (backgroundIMG === '') {
          return;
        }
        x.style.backgroundSize = 'cover';
        x.style.backgroundImage = `url(${backgroundIMG})`;
      }

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

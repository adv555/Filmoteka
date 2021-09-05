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

//получение id фильма ;
function getMovieId(e) {
  const tagImg = e.target.nodeName;
  if (tagImg !== 'IMG') {
    return;
  }
  const movieId = e.target.dataset.source;
  console.log('Id :', movieId);
  getDataMovieById(movieId);
  valueLocalStorage.id = movieId;
}

//получение разметку карточки фильма ;
function getMarkupCardMovie(e) {
  const tagImg = e.target.nodeName;
  if (tagImg !== 'IMG') {
    return;
  }
  const murkupCadrMovie = e.target.closest('.item').outerHTML;
  console.log(murkupCadrMovie);
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
    console.log(movie);
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
  //____Костя убери console.log
  //   console.log(dataMovie);
  const ModalCard = basicLightbox.create(dataMovie, {
    //Параметр из документации (позволяет нам получить ссылку на елемент и ставить слушатели событий во время появления модального окна)
    onShow: ModalCard => {
      //ссылки елементы из шаблона
      const moviePoster = ModalCard.element().querySelector('.movie-poster');
      const addToWatchedBtn = ModalCard.element().querySelector('.button1');
      const addToQueueBtn = ModalCard.element().querySelector('.button2');
      const closeBtn = ModalCard.element().querySelector('.close');
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

import * as basicLightbox from 'basiclightbox';
import MoviesApiService from './api/api-service.js';
import tplModalCard from '../templates/modal-card.hbs';
import refs from './refs';

import cliSpinners from 'cli-spinners';
import { onAddWachedBtm, onAddQueueBtn } from './library';

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
      if (queueFilmsIdInLocalStorage !== null && watchedFilmsIdInLocalStorage.length !== 0) {
        //Проверка на наличие id фильма в localeStorage для кнопки Watch Queue
        if (queueFilmsIdInLocalStorage.map(film => film.id).includes(id)) {
          //Ставит кнопке клас и меняет текст
          addQueueBtn.innerText = 'AREMOVE FROM WATCHED';
          addQueueBtn.classList.add('modal__button-hover');
          return;
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
      const idTrailer = video.results[0].key;
      turnOnTheTrailer(idTrailer);
    })
    .catch(console.log);
}

//реализация выплывающего видео через библиотеку basicLightbox
function turnOnTheTrailer(trailerKey) {
  const ModalCardTrailer = basicLightbox.create(
    `<button type='button' class='modal__close-button-video'>
  <i class='fa fa-times' aria-hidden='true'></i>
</button>
    <div class='modal__container__video'>
      <iframe class='video__modal' src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen ></iframe>
    </div>
  
`,
    {
      onShow: ModalCardTrailer => {
        document.addEventListener('keydown', modalCloseVideo);
        const closeBtnVideo = ModalCardTrailer.element().querySelector(
          '.modal__close-button-video',
        );
        closeBtnVideo.addEventListener('click', modalCloseVideo);

        function modalCloseVideo() {
          ModalCardTrailer.close();
          const x = document.querySelector('.basicLightbox');
          x.style.removeProperty('background-size');
          x.style.removeProperty('background-image');
          x.style.removeProperty('animation');
        }
      },
      onClose: ModalCardTrailer => {
        //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
        const x = document.querySelector('.basicLightbox');
        x.style.removeProperty('background-size');
        x.style.removeProperty('background-image');
        x.style.removeProperty('animation');
        const modalCloseBtn = document.querySelector('.modal__close-button');
        modalCloseBtn.style.color = '#ff6b08';
      },
    },
  );
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
  modalCloseBtn.style.color = '#ffffff';
  x.style.backgroundImage = `url(${Url})`;
}

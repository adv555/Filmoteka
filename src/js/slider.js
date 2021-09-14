import refs from './refs';
import MoviesApiService from './api/api-service';
import { trailerTemplate, getMovieIdAndMarkupCardMovie } from './modal-card'
import swiper from '../templates/swiper';

const moviesApiService = new MoviesApiService();

const isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);

if (!isMobile) {
  moviesApiService.fetchUpcomingMovies().then(renderUpcomingMovies)
} else {
  console.log('hello')
  return
};


//=========== get content =========== 

function renderUpcomingMovies(data) {
  refs.filmStrip.innerHTML = '';
  localStorage.setItem('UpcomingCollection', JSON.stringify([...data.results]));
  refs.filmStrip.innerHTML = swiper(JSON.parse(localStorage.getItem('UpcomingCollection')));
  sliderActions();
}

//============= init slider =============
function sliderActions() {
  const slider = new UpcomingCollectionEngine(document.querySelector('[data-component="slider"]'));
  const container = document.querySelectorAll('.switcher-wrapper');

  // ============= autoplay slider =============
  let deactivateTimeout;


  container.forEach(item => item.addEventListener('mouseover', () => {
    clearTimeout(deactivateTimeout);
    slider.deactivateSlider();
  }));

  container.forEach(item => item.addEventListener('mouseout', () => {
    clearTimeout(deactivateTimeout);
    deactivateTimeout = setTimeout(() => slider.activateSlider(), 6000)
  }));


  // ============= film-strip navigation =============

  //=== arrows ===
  document.querySelector('.arrow__previous').addEventListener('click', () => {
    slider.next()
  })
  document.querySelector('.arrow__next').addEventListener('click', () => {
    slider.previous()
  })

  document.querySelectorAll('.film-strip__item').forEach(item => {
    item.addEventListener('click', () => {
      const position = Number(item.getAttribute("data-position"));
      slider.jump(position);
    })
  })

  //=== film-strip btns ===

  document.querySelectorAll('.film-strip__item')
    .forEach(item => {

      const id = item.getAttribute('data-source')

      item.querySelector('.film-strip__play-video').addEventListener('click', () => {
        moviesApiService
          .fetchMovieTrtailer(id)
          .then(video => {
            const idTrailer = video.results[0];
            trailerTemplate(idTrailer);
          })
      });

    });
}


class UpcomingCollectionEngine {

  constructor() {
    this.items = [...document.querySelectorAll('[data-slider]')];
    this.length = this.items.length - 1;
    this.autoPlay();
  };

  next() {
    this.slide('next');
  }

  previous() {
    this.slide('previous');
  }

  slide(direction) {
    this.items.map(el => {
      const position = Number(el.getAttribute('data-position'));
      const next = (position + 1) > this.length ? 0 : position + 1;
      const previous = (position - 1) < 0 ? this.length : position - 1;
      const go = direction == "next" ? next : previous;

      el.setAttribute('data-position', go)

    })
  }

  jump(position) {
    for (let i = 0; i < position; i++) {
      const timeout = setTimeout(() => {
        this.slide('previous')
      }, 100);
    }
  };

  //=== autoPlay ====

  autoPlay() {
    if (this.autoPlayInterval) {
      return
    }
    this.active = true;
    this.autoPlayInterval = setInterval(() => {
      if (this.active) {
        this.next();
      }
    }, 5000);
  }

  deactivateSlider() {
    this.active = false;
  }

  activateSlider() {
    this.active = true;
  }

};
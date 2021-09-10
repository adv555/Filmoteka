import refs from './refs';
import swiper from '../templates/swiper.hbs'; import MoviesApiService from './api/api-service';

let UpcomingCollection = [];

function sliderActions() {
  const slider = new UpcomingCollectionEngine(document.querySelector('[data-component="slider"]'));

  document.querySelector('.arrow__previous').addEventListener('click', () => {
    slider.next()
  })
  document.querySelector('.arrow__next').addEventListener('click', () => {
    slider.previous()
  })

  document.querySelectorAll('.film-strip__item').forEach(sliderItem => {
    sliderItem.addEventListener('click', () => {
      const position = Number(sliderItem.getAttribute("data-position"));
      slider.jump(position)
    })
  })

  function startSlider() {
    let timer = setInterval(() =>
      slider.next(), 5000);
  }

  startSlider();

};

export default class UpcomingCollectionEngine {

  renderUpcomingMovies(data) {
    refs.filmStrip.innerHTML = '';
    UpcomingCollection = [...data.results];
    refs.filmStrip.innerHTML = swiper(UpcomingCollection);
    sliderActions();
    //console.log(UpcomingCollection)
  }

  constructor() {
    this.items = [...document.querySelectorAll('[data-slider]')],
      this.length = this.items.length - 1;
  }

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
      }, 100)
    }
  }

};





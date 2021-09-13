import refs from './refs';
import MoviesApiService from './api/api-service';
import { trailerTemplate, getDataMovieById } from './modal-card'
import swiper from '../templates/swiper'


const moviesApiService = new MoviesApiService();
moviesApiService.fetchUpcomingMovies().then(renderUpcomingMovies)

//=========== get content =========== 
//let UpcomingCollection = [];



function renderUpcomingMovies(data) {
  refs.filmStrip.innerHTML = '';
  //let UpcomingCollection = [...data.results];
  localStorage.setItem('UpcomingCollection', JSON.stringify([...data.results]));
  //refs.filmStrip.innerHTML = swiper(UpcomingCollection);
  refs.filmStrip.innerHTML = swiper(JSON.parse(localStorage.getItem('UpcomingCollection')));

  //document.querySelector('.slider-card-markup').innerHTML = libraryCardMarkup(UpcomingCollection);
  sliderActions();
}

function sliderActions() {
  const slider = new UpcomingCollectionEngine(document.querySelector('[data-component="slider"]'));
  const container = document.querySelectorAll('.switcher-wrapper');

  document.querySelector('.arrow__previous').addEventListener('click', () => {
    slider.next()
  })
  document.querySelector('.arrow__next').addEventListener('click', () => {
    slider.previous()
  })


  //const filmStrip = document.querySelect('.film-strip');

  //filmStrip.forEach(item => {
  //  item.setAttribute('data-position', '{{@index}}');
  //});


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



  document.querySelectorAll('.film-strip__item').forEach(item => {
    item.addEventListener('click', () => {
      const position = Number(item.getAttribute("data-position"));
      console.log('hello')
      slider.jump(position);
    })
  })

  //======== film btns ============
  document.querySelectorAll('.film-strip__item')
    .forEach(item => {
      //item.addEventListener('click', handle_click);
      const id = item.getAttribute('data-source')

      item.querySelector('.film-strip__info').addEventListener('click', () => {
        getDataMovieById(id);
        localStorage.setItem('currentCardID', id);
      });

      item.querySelector('.film-strip__play-video').addEventListener('click', () => {
        moviesApiService
          .fetchMovieTrtailer(id)
          .then(video => {
            const idTrailer = video.results[0];
            trailerTemplate(idTrailer);
          })
      });

      item.querySelector('.film-strip__add-to-lib').addEventListener('click', () => {
        console.log(id);
        localStorage.setItem('currentCardID', id); //write current movie ID
        function getMoviefromLS(filmsLS) {
          let arr = JSON.parse(localStorage.getItem(filmsLS));
          console.log((arr.filter(function (item, i, arr) {
            return (item.id == localStorage.getItem('currentCardID'));
          })))
        };

        if (getMoviefromLS('queue-films') !== id) {

        } return;

        console.log(getMoviefromLS('galleryCardList'))
        console.log(getMoviefromLS('galleryCardList'))
        let arr = JSON.parse(localStorage.getItem('galleryCardList'));
        console.log((arr.filter(function (item, i, arr) {
          return (item.id == localStorage.getItem('currentCardID'));
        })))

      });

    });



  //function handle_click(event) {
  //  console.log(event)
  //console.log(event.currentTarget.parentElement.getAttribute('data-source'));
  //getMovieId(event.currentTarget.parentElement.getAttribute('data-source'));
  //}

}


export default class UpcomingCollectionEngine {


  constructor() {
    this.items = [...document.querySelectorAll('[data-slider]')];
    //this.items = [...document.querySelectorAll('[data-position]')];
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


  //=========== Autoplay slider ===========
  //  var sliderOnPause = false;
  //  let pauseInterval = time + 3000;
  //  let intervalTimer = time + 500;
  //  let time = 0;

  //  function getCurrentTime() {
  //    return Date.now();
  //  }

  //  function SliderDelay() {
  //    sliderOnPause = true;
  //    let timer = getCurrentTime() + pauseInterval;
  //    let count = 0;
  //    if (timer > count) {
  //      count = getCurrentTime();
  //    }
  //    sliderOnPause = false;
  //  }

  //  function startSliderAutoPlay() {
  //    timer = getCurrentTime() + intervalTimer;
  //    let count = 0;
  //    if (timer > count) {
  //      count = getCurrentTime();
  //    }
  //    if (sliderOnPause = false)
  //      count = getCurrentTime();
  //  }
  //  this.slide('next')
  //  startSliderAutoPlay();
  //}
  //startSliderAutoPlay();






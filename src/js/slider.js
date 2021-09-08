import refs from './refs';
import swiper from '../templates/swiper.hbs'; import MoviesApiService from './api/api-service';

export default function renderUpcomingMovies(data) {
  refs.filmStrip.innerHTML = '';
  refs.filmStrip.innerHTML = swiper(data.results);
  //console.log(data.results);
};

//var strip = document.querySelector('.main-carousel');
//var flkty = new Flickity(strip, {
//  cellAlign: 'left',
//  contain: true,
//  freeScroll: true,
//  wrapAround: true,
//  autoPlay: true,
//  lazyLoad: true
//});





//====autoSeleckt

  //  let slides = document.querySelector('.film-strip__item');
  //  let slider = [];
  //  for (let i = 0; i < slides.length; i += 1) {
  //    slider[i] = slider[i].src;
  //    slider[i] = remove();
  //  }
  //}

  //let step = 0;
  //let offset = 0;
  //function draw() {
  //  let img = document.querySelector('img');
  //  img.src = slider[step];
  //  img.classList.add('.film - strip__item');
  //  document.querySelector('.film-strip').appendChild(img);
  //  step++;
  //}






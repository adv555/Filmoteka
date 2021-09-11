import renderCards from '../templates/gallery.hbs';
import refs from './refs.js';
import genres from '../genres.json';
import FilterContent from './filter/filterFetch';
let pagination = require('pagination');
import moviesApiService from './onSearch';
// Для импорта в  gallery import filterCards from '../filter.js'
// import filterCards from '../filter.js'

// const buttonFilterEl = document.querySelector('.filter-select');
// buttonFilterEl.addEventListener('change', onClick);
// function onClick(evt) {
//   // if (evt.target.value == genre) {
//   // }
//   console.log(evt.target.value);
// }

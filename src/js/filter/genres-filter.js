import moviesApiService from '../onSearch';
import genresFiltersTpl from '../../templates/genres-filters.hbs';
import genres from '../../genres.json';
import createGalleryMarkup from '../gallery/gallery';

const genresFilter = document.querySelector('.js-genres-filter');
const filterBtnSearchRef = document.querySelector('.filter-btn-search');
const filterBtnResetRef = document.querySelector('.filter-btn-reset');
let arrId = [];

filterBtnSearchRef.addEventListener('click', filterGenres);
filterBtnResetRef.addEventListener('click', resetFilter);

function resetFilter() {
  const checkBoxRefs = document.querySelectorAll('.filter__checkbox');
  checkBoxRefs.forEach(item => (item.checked = false));
  arrId = [];
  moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);
}

function filterGenres(e) {
  moviesApiService.fetchMoviesByGenre(arrId.join(',')).then(createGalleryMarkup).catch(console.log);
}

genresFilter.onclick = e => {
  const id = e.target.dataset.id;
  if (!id) return;
  moviesApiService.genres = id;
  moviesApiService.page = 1;
  if (!arrId.includes(id)) arrId.push(id);
  else arrId.splice(arrId.indexOf(id), 1);
  console.log(arrId);
};

const genresMarkup = genresFiltersTpl(genres);
genresFilter.innerHTML = genresMarkup;

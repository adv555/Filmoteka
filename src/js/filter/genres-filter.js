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



// async function renderGenresFilters() {
//   const genres = await moviesApiService.fetchGenresList();
// }

// async function onFilterClick(e) {
//   e.target.classList.toggle('checked');
//   const checkedLis = refs.genresFilter.querySelectorAll('li.checked');
//   const genresIds = [...checkedLis].map(li => li.dataset.id).join(',');
//   const { results: movies } = await moviesApiService.fetchMoviesByGenre(genresIds);

//   if (movies.length === 0) {
//     // onHideBtnClick();
//     // clearContainer(refs.gallery);
//     // refs.filterChooseBtn.classList.add('visually-hidden');
//     insertContentTpl(refs.gallery, errorTpl);
//     return;
//   }

//   const genresListObj = await moviesApiService.fetchGenresList();
//   const genresList = genresListObj.genres;

//   transformMoviesObjectFields(movies, genresList);

//   // const popularMoviesMarkup = renderCards(movies);
//   refs.gallery.innerHTML = popularMoviesMarkup;
// }

// function transformMoviesObjectFields(movies, genresList) {
//   movies.forEach(movie => {
//     movie.placeholder = !movie.poster_path ? true : false;

//     if (movie.release_date != undefined) {
//       movie.release_date = movie.release_date.slice(0, 4);
//     }

//     const genresIdsList = movie.genre_ids;

//     genresIdsList.forEach((genreId, index, array) => {
//       const genresListItem = genresList.find(genre => genre.id === genreId);
//       const idx = genresList.indexOf(genresListItem);
//       array[index] = genresList[idx].name;
//     });
//     movie.genre_ids = genresIdsList.join(', ');
//   });
// }

// function showResetBtn(e) {
//   refs.filterResetBtn.classList.remove('visually-hidden');
// }

// function onChooseBtnClick(e) {
//   e.target.classList.add('visually-hidden');
//   refs.filterHideBtn.classList.remove('visually-hidden');
//   refs.genresFilter.classList.remove('visually-hidden');
// }

// function onHideBtnClick(e) {
//   // refs.filterChooseBtn.classList.remove('visually-hidden');
//   // refs.filterHideBtn.classList.add('visually-hidden');
//   // refs.filterResetBtn.classList.add('visually-hidden');
//   // refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
//   // refs.genresFilter.classList.add('visually-hidden');
//   uncheckClass();
// }

// function onResetBtnClick(e) {
//   uncheckClass();
//   refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
//   e.target.classList.add('visually-hidden');
// }

// function uncheckClass() {
//   // const checkedList = refs.genresFilter.querySelectorAll('.checked');
//   // if (checkedList) {
//   //   checkedList.forEach(li => li.classList.toggle('checked'));
//   // }
// }

// async function addFilterListeners() {
//   await renderGenresFilters();
//   refs.genresFilter = document.querySelector('.js-genres-filter');
//   refs.genresFilter.addEventListener('click', onFilterClick);
//   refs.genresFilter.addEventListener('click', showResetBtn, { once: true });
//   refs.filterChooseBtn = document.querySelector('.js-choose-btn');
//   refs.filterHideBtn = document.querySelector('.js-hide-btn');
//   refs.filterResetBtn = document.querySelector('.js-reset-btn');
//   refs.filterChooseBtn.addEventListener('click', onChooseBtnClick);
//   refs.filterHideBtn.addEventListener('click', onHideBtnClick);
//   refs.filterResetBtn.addEventListener('click', onResetBtnClick);
// }

// function removeFilterListeners() {
//   onHideBtnClick();
//   // refs.genresFilter.removeEventListener('click', onFilterClick);
//   // refs.genresFilter.removeEventListener('click', showResetBtn);
//   // refs.filterChooseBtn.removeEventListener('click', onChooseBtnClick);
//   // refs.filterHideBtn.removeEventListener('click', onHideBtnClick);
//   // refs.filterResetBtn.removeEventListener('click', onResetBtnClick);
// }
// addFilterListeners();
// removeFilterListeners();

// // export { addFilterListeners, removeFilterListeners };

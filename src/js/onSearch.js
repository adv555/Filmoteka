import refs from './refs';
import MoviesApiService from './api/api-service';
import createGalleryMarkup from './gallery/gallery';
import { insertContentTpl, clearContainer, createNotice, createNotice404 } from './notification';
// import debounce from 'lodash.debounce';
import placeholder from './spinner';
import errorTpl from '../templates/error-not-found-film.hbs';
// import { addFilterListeners, removeFilterListeners } from './filter/genres-filter';
const moviesApiService = new MoviesApiService();
moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);
export default moviesApiService; /////////////////////

// =========== listeners
// refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.searchForm.addEventListener('submit', onSearch);
// =========== on Search

function onSearch(e) {
  e.preventDefault();
  let searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  moviesApiService.query = searchQuery;

  placeholder.spinner.show();
  refs.pagination.classList.remove('is-hidden');

  // // проверка если инпут пустой
  if (moviesApiService.query.length == 0) {
    placeholder.spinner.close();
    refs.searchForm.reset();

    return createNotice();
  }
  // отрисовка контента
  renderMoviesBySearch(searchQuery)
    .then(placeholder.spinner.close())
    .then(refs.searchForm.reset())
    .catch(error => {
      createNotice();
      console.log(error);
    });
}

// =========== render Content By Search Fn

async function renderMoviesBySearch(searchQuery) {
  const query = searchQuery || moviesApiService.query;
  let fetchMovies;

  if (query) {
    moviesApiService.page = 1;
    fetchMovies = moviesApiService.fetchMoviesBySearch();
  } else {
    fetchMovies = moviesApiService.fetchTrending();
  }

  const serverAnswer = await fetchMovies;
  const { results: movies, page, total_pages, total_results } = serverAnswer;

  moviesApiService.totalResults = total_results;

  // проверка если {} пустой
  if (movies.length === 0) {
    createNotice404();
    clearContainer(refs.gallery);
    insertContentTpl(refs.gallery, errorTpl);
    refs.pagination.classList.add('is-hidden');
    return;
  }

  createGalleryMarkup(serverAnswer);
}

// старая версия по event input

// // =========== listeners
// refs.searchInput.addEventListener('input', debounce(onSearch, 500));
// // =========== on Search
// let searchQuery = '';

// function onSearch(e) {
//   e.preventDefault();
//   let input = e.target;
//   searchQuery = input.value.trim();
//   moviesApiService.query = searchQuery;

//   placeholder.spinner.show();
//   refs.pagination.classList.remove('is-hidden');

//   // проверка если инпут пустой
//   if (moviesApiService.query.length == 0) {
//     placeholder.spinner.close();
//     input.value = '';
//     return createNotice();
//   }

//   renderMoviesBySearch(searchQuery)
//     .then(placeholder.spinner.close())
//     .then((input.value = ''))
//     .catch(error => {
//       createNotice();
//       console.log(error);
//     });
// }

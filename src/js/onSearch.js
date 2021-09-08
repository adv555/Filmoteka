import refs from './refs';
import MoviesApiService from './api/api-service';
import createGalleryMarkup from './gallery/gallery';
import { showTextError, insertContentTpl, clearContainer } from './notification';
import debounce from 'lodash.debounce';
import placeholder from './spinner';
import errorTpl from '../templates/error-not-found-film.hbs';

const moviesApiService = new MoviesApiService();

export default moviesApiService; /////////////////////

// =========== listeners

refs.searchForm.addEventListener('submit', onSearch);

const searchInput = document.querySelector('.js-search-field__input');
searchInput.addEventListener('input', debounce(onSearch, 500));

// // =========== search data

let searchQuery = '';
function onSearch(e) {
  e.preventDefault();
  placeholder.spinner.show();
  refs.gallery.innerHTML = '';

  const input = e.target;
  searchQuery = input.value;
  if (!searchQuery) {
    return;
  }

  placeholder.spinner.close();

  moviesApiService.query = searchQuery;
  renderMoviesBySearch(searchQuery).catch(error => console.log(error));
  input.value = '';
}

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

  if (movies.length === 0) {
    const notifyErrorHero = document.querySelector('.js-search-field__error-text');
    showTextError(
      notifyErrorHero,
      'Search result not successful. Enter the correct movie name and',
    );
    setTimeout(() => (notifyErrorHero.innerHTML = ''), 5500);
    clearContainer(refs.gallery);
    insertContentTpl(refs.gallery, errorTpl);
    return;
  }

  createGalleryMarkup(serverAnswer);
}

moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);

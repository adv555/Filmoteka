import renderCardsTPL from '../templates/gallery.hbs';
import refs from './refs';
import MoviesApiService from './api/api-service';
import createGalleryMarkup from './gallery/gallery';
import { showTextError, insertContentTpl, clearContainer } from './notification';
import debounce from 'lodash.debounce';

const moviesApiService = new MoviesApiService();

// =========== listeners
refs.searchForm.addEventListener('submit', onSearch);

// // =========== search data
let searchQuery = '';
function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';

  const input = e.target;
  searchQuery = input.value;
  if (!searchQuery) {
    return;
  }
  moviesApiService.query = searchQuery;
  renderMoviesBySearch(searchQuery).catch(error => console.log(error));
}

async function renderMoviesBySearch(searchQuery) {
  const query = searchQuery || moviesApiService.query;
  const fetchMovies = query
    ? moviesApiService.fetchMoviesBySearch()
    : moviesApiService.fetchPopularMovies();

  const { results: movies, page, total_pages, total_results } = await fetchMovies;

  if (movies.length === 0) {
    const notifyErrorHero = document.querySelector('.js-search-field__error-text');
    showTextError(
      notifyErrorHero,
      'Search result not successful. Enter the correct movie name and',
    );
    setTimeout(() => (notifyErrorHero.innerHTML = ''), 3500);
    clearContainer(refs.gallery);
    insertContentTpl(refs.gallery, errorTpl);
    return;
  }

  const moviesMarkup = renderCardsTPL(movies);

  refs.gallery.innerHTML = moviesMarkup;
}

moviesApiService.fetchPopularMovies().then(createGalleryMarkup).catch(console.log);

const searchInput = document.querySelector('.js-search-field__input');
searchInput.addEventListener('input', debounce(onSearch, 500));

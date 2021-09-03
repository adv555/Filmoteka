import getRefs from './api/refs';
import MoviesApiService from './api/api-service';
import { showTextError, insertContentTpl, clearContainer } from './notification';

const moviesApiService = new MoviesApiService();
const refs = getRefs();

let searchQuery = '';

function onSearch(event) {
  event.preventDefault();

  const input = event.target;
  searchQuery = input.value;
  if (!searchQuery) {
    return;
  }
  moviesApiService.query = searchQuery;
  renderPopularMoviesGrid(searchQuery).catch(error => console.log(error));
}

async function renderPopularMoviesGrid(searchQuery) {
  const query = searchQuery || moviesApiService.query;
  const fetchMovies = query
    ? moviesApiService.fetchMoviesBySearch()
    : moviesApiService.fetchPopularMovies();

  const { results: movies, page, total_pages, total_results } = await fetchMovies;

  if (movies.length === 0) {
    const notifyErrorHeader = document.querySelector('.js-search-field__error-text');
    showTextError(
      notifyErrorHeader,
      'Search result not successful. Enter the correct movie name and',
    );
    setTimeout(() => (notifyErrorHeader.innerHTML = ''), 3500);

    return;
  }
  // genresList - array of objects [{id: 23, name: "Drama"}, {id: 17, name: "Action"} ...]
  const genresListObj = await moviesApiService.fetchGenresList();
  const genresList = genresListObj.genres;
}

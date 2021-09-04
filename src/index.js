import './sass/main.scss';
import refs from './js/refs';
import backToTopBtn from './js/back-to-top-btn';
import MoviesApiService from './js/api/api-service';
//  import 'material-icons';
import './js/gallery/gallery.js';
import createGalleryMarkup from './js/gallery/gallery.js';

// =========== back-to-top-button
backToTopBtn();

// =========== new class instance
const moviesApiService = new MoviesApiService();

// =========== test by Popular / Genres / By Id
moviesApiService.fetchPopularMovies().then(data => console.log(data));
moviesApiService.fetchGenresList().then(data => console.log(data));

// =========== listeners
refs.searchForm.addEventListener('submit', onSearch);

// =========== search data
function onSearch(e) {
  e.preventDefault();
  console.log(e);
  moviesApiService.searchQuery = e.currentTarget.elements.query.value.trim();
  console.log(moviesApiService.searchQuery);
  // return moviesApiService
  //   .fetchMoviesBySearch(moviesApiService.searchQuery)
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));

  // return moviesApiService
  //   .fetchFullInfoOfMovie(moviesApiService.searchQuery)
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));

  return moviesApiService
    .fetchMoviesByGenre(moviesApiService.searchQuery)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

moviesApiService.fetchPopularMovies().then(createGalleryMarkup).catch(console.log);

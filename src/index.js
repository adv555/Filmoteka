import './sass/main.scss';
import refs from './js/refs';
import backToTopBtn from './js/back-to-top-btn';
import MoviesApiService from './js/api/api-service';
import 'material-icons';
import './js/changeTheme';

// =========== back-to-top-button
backToTopBtn();

// =========== new class instance
const moviesApiService = new MoviesApiService();

// =========== test by Popular / Genres / By Id
moviesApiService.fetchPopularMovies().then((data) => console.log(data));
moviesApiService.fetchGenresList().then((data) => console.log(data));

// ========= FILTER START =========
function filterFilm() {
  const buttonsFilter = document.querySelectorAll(".button-filter");
  const cards = document.querySelectorAll(".card");

  function filter(category, items) {
    items.forEach((item) => {
      const isItemFiltered = !item.classList.contains(category)
      const isShowAll = category.toLowerCase() === 'all'
      if (isItemFiltered && !isShowAll) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    });
  }

  buttonsFilter.forEach((button) => {
    button.addEventListener("click", () => {
      filter(button.dataset.filter, cards);
    });
  });
}
filterFilm();
// ========= FILTER END =========

// =========== listeners
refs.searchForm.addEventListener("submit", onSearch);

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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

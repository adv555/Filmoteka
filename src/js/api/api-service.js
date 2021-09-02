const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3d673b2d8e40eafc68577fae5a6a1f4b`;

//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPopularMovies() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      page: this.page,
    });

    const url = `${BASE_URL}movie/popular?${searchParams}`;

    return fetch(url).then(response => response.json());
  }

  fetchGenresList() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });

    const url = `${BASE_URL}/genre/movie/list?${searchParams}`;

    return fetch(url).then(response => response.json());
  }

  // fetchMoviesBySearchQuery
  fetchMoviesBySearch() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: this.searchQuery,
      page: this.page,
    });

    return fetch(`${BASE_URL}search/movie?${searchParams}`).then(response => response.json());
  }

  fetchFullInfoOfMovie(movieId) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });

    return fetch(`${BASE_URL}/movie/${movieId}?${searchParams}`).then(response => response.json());
  }

  fetchMoviesByGenre(genreId) {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      with_genres: genreId,
    });

    return fetch(`${BASE_URL}discover/movie?${searchParams}`).then(response => response.json());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(value) {
    this.page = value;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

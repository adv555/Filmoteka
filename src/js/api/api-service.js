const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3d673b2d8e40eafc68577fae5a6a1f4b`;
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&include_adult=false`;
const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
const MOVIE_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_KEYWORD = `${BASE_URL}/search/keyword?api_key=${API_KEY}&include_adult=false`;

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language = 'en-US';
  }

  // ======== фыльмы по популярности ======== //
  fetchPopularMovies() {
    const url = `${POPULAR_MOVIES_URL}&language=${this.language}&page=${this.page}`;

    return fetch(url).then(response => response.json());
  }

  // ======== список по жанрам ======== //
  fetchGenresList() {
    const url = `${GENRE_LIST_URL}&language=${this.language}`;

    return fetch(url).then(response => response.json());
  }

  // ======== поиск фильмов ======== //

  // fetchMoviesBySearch() {
  //   const url = `${MOVIE_BY_SEARCH}&language=${this.language}&page=${this.page}`;

  //   return fetch(url).then(response => response.json());
  // }

  // ======== поиск фильмов по id ======== //
  fetchFullInfoOfMovie(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${this.language}`;

    return fetch(url).then(response => response.json());
  }
  // ======== поиск по ключевому слову ======== //

  // fetchMoviesByKeyword() {
  //   const url = `${MOVIE_BY_KEYWORD}&language=${this.language}&page=${this.page}`;

  //   return fetch(url).then(response => response.json());
  // }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(value) {
    this.page = value;
  }
  setRuLang() {
    this.language = 'ru-RU';
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// ======== список запросов на сервер ======== //

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
//api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1

const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `3d673b2d8e40eafc68577fae5a6a1f4b`;
const TRENDING_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&include_adult=false`;
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&include_adult=false`;
const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
const MOVIE_BY_SEARCH = `${BASE_URL}/search/movie?api_key=${API_KEY}&include_adult=false`;
const MOVIE_BY_KEYWORD = `${BASE_URL}/search/keyword?api_key=${API_KEY}&include_adult=false`;
const UPCOMING_MOVIE_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&include_adult=false`;

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language = 'en-US';
    this.genres = '';
  }

  //========= скоро на экранах ======== //
  fetchUpcomingMovies() {
    const url = `${UPCOMING_MOVIE_URL}&language=${this.language}&page=${this.page}`;
    return fetch(url).then(response => {
      if (response.status === 404) {
        throw new Error('error');
      }
      return response.json();
    });
  }

  // ======== фыльмы в тренде ======== //
  fetchTrending() {
    this.genres = '';
    const url = `${TRENDING_URL}&language=${this.language}&page=${this.page}`;

    return fetch(url).then(response => response.json());
  }

  // ======== фыльмы по популярности ========
  fetchPopularMovies() {
    const url = `${POPULAR_MOVIES_URL}&language=${this.language}&page=${this.page}`;

    return fetch(url).then(response => response.json());
  }

  // ======== список по жанрам ======== //
  fetchGenresList() {
    const url = `${GENRE_LIST_URL}&language=${this.language}`;

    return fetch(url).then(response => response.json());
  }

  fetchMoviesByGenre(genreId = this.genres) {
    this.query = '';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      with_genres: genreId,
      page: this.page,
    });

    return fetch(`${BASE_URL}/discover/movie?${searchParams}`).then(response => response.json());
  }

  // ======== поиск фильмов ======== //
  fetchMoviesBySearch() {
    this.genres = '';
    return fetch(
      `${MOVIE_BY_SEARCH}&query=${this.searchQuery}&language=${this.language}&page=${this.page}`,
    ).then(response => response.json());
  }

  // ======== поиск фильмов по id ======== //
  fetchFullInfoOfMovie(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${this.language}`;

    return fetch(url).then(response => response.json());
  }
  // ======== поиск по id ======== //

  fetchMovieTrtailer(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${this.language}`;

    return fetch(url).then(response => response.json());
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
// https://api.themoviedb.org/3/discover/movie?api_key=3d673b2d8e40eafc68577fae5a6a1f4b&with_genres=28,12

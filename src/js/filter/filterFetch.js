import filterSettings from "./filterSettings"; //api для фильтра

const { BASE_URL, API_KEY } = filterSettings; // settings

export default class FilterContent {
  // MovieFilter
  constructor() {
    this.page = 1; //_page
  }
  contentFilter(genre) {
    //fetchMovies
    const url = `${BASE_URL}/discover/movie?with_genres=${genre}&sort_by=popularity.desc&api_key=${API_KEY}&page=${this.page}`;
    return fetch(url)
      .then((response) => (response.ok ? response.json() : []))
      .catch((error) => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  get page() {
    return this._page;
  }
  set page(value) {
    this.page = value;
  }
}

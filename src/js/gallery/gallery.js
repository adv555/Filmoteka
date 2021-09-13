import renderCards from '../../templates/gallery.hbs';
import refs from '../refs.js';
import genres from '../../genres.json';

var pagination = require('pagination');
import moviesApiService from '../onSearch';

export default function createGalleryMarkup(data) {
  moviesApiService.totalResults = data.total_results;
  let cardList = [];
  cardList = data.results.map(card => {
    const genreList = [];
    if (card.genre_ids) {
      card.genre_ids.forEach(id => {
        const genre = genres.find(genre => genre.id === id);
        if (genre && genreList.length <= 3) {
          if (genreList.length < 3) genreList.push(genre.name);
          else genreList[2] = 'others...';
        }
      });
    }

    const date = card.release_date ? card.release_date.slice(0, 4) : '';
    return {
      backdrop_path: card.backdrop_path,
      poster_path: card.poster_path,
      original_title: card.original_title,
      vote_average: card.vote_average,
      release_date: date,
      id: card.id,
      genres: genreList.join(', '),
    };
  });

  if (moviesApiService.page === 1) {
    var pag = new pagination(document.getElementsByClassName('pagination')[0], {
      currentPage: 1,
      totalItems: moviesApiService.totalResults,
      itemsPerPage: 20,
      step: 2,
    });

    pag.onPageChanged(changePage);
  }

  refs.gallery.innerHTML = renderCards(cardList);

  const arrowLeft = document.querySelector('.arrowLeft');
  const arrowRight = document.querySelector('.arrowRight');
  arrowLeft.innerHTML = '';
  arrowRight.innerHTML = '';
}

function changePage(currentPage) {
  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  moviesApiService.setPage(currentPage);
  if (moviesApiService.query !== '')
    moviesApiService.fetchMoviesBySearch().then(createGalleryMarkup).catch(console.log);
  else if (moviesApiService.genres !== '')
    moviesApiService.fetchMoviesByGenre().then(createGalleryMarkup).catch(console.log);
  else moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);
}

import refs from './refs.js';
import { createGalleryMarkup } from '../js/gallery/gallery';
import moviesApiService from '../js/onSearch';
import renderCards from './../templates/gallery.hbs';
import genres from './../genres.json';

refs.homeLink.addEventListener('click', onHomeBtn);

export function onHomeBtn() {
  console.log('Home Btn');
  refs.homeLink.classList.add('site-nav__button--active');
  refs.myLibraryLink.classList.remove('site-nav__button--active');

  //======= логика на onLibraryBTN ================
  refs.sliderSection.classList.remove('visually-hidden');
  refs.myLibraryLink.classList.remove('site-nav__button--active');
  refs.homeLink.classList.remove('site-nav__button--active');
  refs.removePagination.classList.remove('visually-hidden');
  refs.libraryBtnlist.classList.add('visually-hidden');
  refs.searchForm.classList.remove('visually-hidden');
  refs.filterSelect.classList.remove('visually-hidden');
  refs.headerSection.classList.add('header__container--home-bg');
  refs.headerSection.classList.remove('header__container--my-library-bg');

  createGalleryMarkup();
  // header__container--home-bg
  //   changePage();
  //======= старая логика на onLibraryBTN ================
  //   refs.sliderSection.remove();
  //   refs.myLibraryLink.classList.add('site-nav__button--active');
  //   refs.homeLink.classList.remove('site-nav__button--active');
  //   refs.removePagination.classList.add('display-none');
  //   refs.libraryBtnlist.classList.remove('display-none');
  //   refs.searchForm.remove();
  //   refs.filterSelect.remove();
}

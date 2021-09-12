import refs from './refs.js';
import createGalleryMarkup from '../js/gallery/gallery.js';
import moviesApiService from './onSearch';
refs.homeLink.addEventListener('click', onHomeBtn);

export function onHomeBtn() {
  console.log('Home Btn');
  refs.myLibraryNotice.classList.add('visually-hidden');
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

  moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);
}

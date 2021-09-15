import refs from './refs.js';
import createGalleryMarkup from '../js/gallery/gallery.js';
import moviesApiService from './onSearch';
refs.homeLink.addEventListener('click', onHomeBtn);
bounceNavBtn();
export function onHomeBtn() {
  bounceNavBtn();

  refs.myLibraryLink.classList.remove(
    'site-nav__button--active',
    'animate__animated',
    'animate__pulse',
    'animate__infinite',
  );
  refs.headerSection.classList.remove('header__container--my-library-bg');

  refs.homeLink.classList.add(
    'site-nav__button--active',
    'animate__animated',
    'animate__pulse',
    'animate__infinite',
  );

  refs.headerSection.classList.add('header__container--home-bg');

  refs.sliderSection.classList.remove('visually-hidden');
  refs.removePagination.classList.remove('visually-hidden');
  refs.searchForm.classList.remove('visually-hidden');
  refs.filterBox.classList.remove('visually-hidden');
  refs.heroWarningBox.classList.remove('visually-hidden');
  refs.libraryBtnlist.classList.add('visually-hidden');

  refs.myLibraryNotice.classList.add('visually-hidden');

  moviesApiService.fetchTrending().then(createGalleryMarkup).catch(console.log);
}

export function bounceNavBtn() {
  refs.logoText.classList.add('animate__animated', 'animate__bounceInLeft');
  setTimeout(
    () => refs.logoText.classList.remove('animate__animated', 'animate__bounceInLeft'),
    1000,
  );
}

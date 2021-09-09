import refs from './refs';
import searchFieldTpl from '../templates/search-field.hbs';
import heroBtnsTpl from '../templates/lib-btns.hbs';
import debounce from 'lodash.debounce';
import { insertContentTpl, clearContainer } from './notification';

refs.homeLink.addEventListener('click', onHomeClick);
refs.myLibraryLink.addEventListener('click', onMyLibraryClick);

insertContentTpl(refs.heroDynamicContainer, searchFieldTpl);

function onHomeClick(event) {
  toggleActiveClassOnMainPage(event);
  changeOnMainBg();
  const watchedMoviesBtn = document.querySelector("[data-header='watched']");
  const queueMoviesBtn = document.querySelector("[data-header='queue']");
  if (watchedMoviesBtn) {
    watchedMoviesBtn.removeEventListener('click', onHeaderBtnsClick);
  }
  if (queueMoviesBtn) {
    queueMoviesBtn.removeEventListener('click', onHeaderBtnsClick);
  }
  clearContainer(refs.heroDynamicContainer);
  insertContentTpl(refs.heroDynamicContainer, searchFieldTpl);
  const searchInput = document.querySelector('.js-search-field__input');
  searchInput.addEventListener('input', debounce(onSearch, 500));
}

function onHeaderBtnsClick(e) {
  switchActiveClass(e, 'header-buttons__btn--active');
  const itemName = e.target.dataset.header;
  renderLibraryMovies(1, itemName);
}

function switchActiveClass(e, className) {
  document.querySelector(`.${className}`).classList.remove(className);
  e.target.classList.add(className);
}

function changeOnMainBg() {
  const activeBgClass = refs.heroBackgroundContainer.classList.contains(
    'header__container--home-bg',
  );
  if (!activeBgClass) {
    refs.heroBackgroundContainer.classList.add('header__container--home-bg');
  }
  refs.heroBackgroundContainer.classList.remove('header__container--my-library-bg');
}

function toggleActiveClassOnMainPage(e) {
  const activeClass = e.target.classList.contains('site-nav__button--active');
  if (!activeClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.myLibrary.classList.remove('site-nav__button--active');
}

function changeOnSecondaryBg() {
  const activeBgClass = refs.heroBackgroundContainer.classList.contains(
    'header__container--my-library-bg',
  );
  if (!activeBgClass) {
    refs.heroBackgroundContainer.classList.add('header__container--my-library-bg');
  }
  refs.heroBackgroundContainer.classList.remove('header__container--home-bg');
}

function toggleActiveClassOnSecondPage(e) {
  const activeClass = e.target.classList.contains('site-nav__button--active');
  if (!activeClass) {
    e.target.classList.add('site-nav__button--active');
  }
  refs.home.classList.remove('site-nav__button--active');
}

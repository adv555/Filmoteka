function showTextError(nameContainer, messageError) {
  nameContainer.textContent = messageError;
}

function insertContentTpl(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}
function createNotice() {
  const notifyErrorHero = document.querySelector('.js-search-field__error-text');
  showTextError(
    notifyErrorHero,
    'Search result not successful. Enter the correct movie name and try again',
  );
  setTimeout(() => (notifyErrorHero.innerHTML = ''), 5500);
}

function emptyWatchedStoragedNotice() {
  const notifyLibrary = document.querySelector('.my-Library__notice');
  showTextError(notifyLibrary, 'Watched film storage is empty');
}
function emptyQueueStoragedNotice() {
  const notifyLibrary = document.querySelector('.my-Library__notice');
  showTextError(notifyLibrary, 'Queue film storage is empty');
}

function createNotice404() {
  const notifyErrorHero = document.querySelector('.js-search-field__error-text');
  showTextError(notifyErrorHero, 'Search result not successful. Film not found');
  setTimeout(() => (notifyErrorHero.innerHTML = ''), 5500);
}
export {
  showTextError,
  insertContentTpl,
  clearContainer,
  createNotice,
  createNotice404,
  emptyWatchedStoragedNotice,
  emptyQueueStoragedNotice,
};

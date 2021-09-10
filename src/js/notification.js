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

function createNotice404() {
  const notifyErrorHero = document.querySelector('.js-search-field__error-text');
  showTextError(notifyErrorHero, 'Search result not successful. Film not found');
  setTimeout(() => (notifyErrorHero.innerHTML = ''), 5500);
}
export { showTextError, insertContentTpl, clearContainer, createNotice, createNotice404 };

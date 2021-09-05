function showTextError(nameContainer, messageError) {
  nameContainer.textContent = messageError;
}

function insertContentTpl(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}

export { showTextError, insertContentTpl, clearContainer };

function showTextError(nameConrainer, messageError) {
  nameConrainer.textContent = messageError;
}

function insertContentTpl(nameContainer, fnTemplates) {
  nameContainer.insertAdjacentHTML('beforeend', fnTemplates());
}

function clearContainer(nameContainer) {
  nameContainer.innerHTML = '';
}
// function insertContent(nameContainer, content) {
//   nameContainer.insertAdjacentHTML('beforeend', content);
// }

export { showTextError, insertContentTpl, clearContainer };

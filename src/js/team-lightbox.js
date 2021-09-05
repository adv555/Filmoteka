import * as basicLightbox from 'basiclightbox';
import data from '../team.json';
import teamCardTpl from '../templates/team-card';

// =========== создает модалку по шаблону ===========//

export default function onClick(e) {
  const instance = basicLightbox.create(document.querySelector('template'));

  instance.show();
  instance.element().querySelector('.basicLightbox__placeholder').onclick = instance.close;

  const cardsContainer = document.querySelector('.js-team');
  const menuMarkup = createMenuMarkup(data);
  // console.log(typeof menuMarkup);
  // console.log(menuMarkup);

  function createMenuMarkup(data) {
    return data.map(teamCardTpl).join('');
  }

  cardsContainer.insertAdjacentHTML('afterbegin', menuMarkup);
}

import * as basicLightbox from 'basiclightbox';
import data from '../team.json';
import teamCardTpl from '../templates/team-card';

// =========== создает модалку по шаблону ===========//

// export default function onClick(e) {
//   const instance = basicLightbox.create(document.querySelector('template'));

//   instance.show();
//   instance.element().querySelector('.basicLightbox__placeholder').onclick = instance.close;

//   const cardsContainer = document.querySelector('.js-team');
//   const menuMarkup = createMenuMarkup(data);
//   // console.log(typeof menuMarkup);
//   // console.log(menuMarkup);

//   function createMenuMarkup(data) {
//     return data.map(teamCardTpl).join('');
//   }

//   cardsContainer.insertAdjacentHTML('afterbegin', menuMarkup);
// }

// =========== version 2 ===========//
// =========== markup===========//

// export default function onClick(e) {
//   const teamCardsMarkup = teamCardTpl(data);
//   showModal(teamCardsMarkup);
// }

// // ======== show modal
// function showModal(template) {
//   const instance = basicLightbox.create(template);

//   instance.show();
//   // instance.element().querySelector('.basicLightbox__placeholder').onclick = instance.close;
// }

// =========== version 3 ===========//

// export default function onTeamModalShow(e) {
//   const teamCardsMarkup = teamCardTpl(data);
//   const teamModal = basicLightbox.create(teamCardsMarkup);

//   teamModal.show();
// }

// // _____________________________________________________________________________________________________
//Убрать скролл за модалкой
// export default function onTeamModalShow(e) {
//   const teamCardsMarkup = teamCardTpl(data);
//   const teamModal = basicLightbox.create(teamCardsMarkup, {
//     onShow: teamModal => {
//       // запретить скролл страницы при открытии модалки (hidden-без предоставления прокрутки)
//       document.body.style.overflow = 'hidden';
//     },
//     onClose: teamModal => {
//       //разрешает скролл страницы при закрытии модалки (visible - значение, принятое по умолчанию)
//       document.body.style.overflow = 'visible';
//     },
//   });

//   teamModal.show();
// }
// =========== version 4 (убран скрол)===========//

export default function onTeamModalShow(e) {
  const teamCardsMarkup = teamCardTpl(data);
  const teamModal = basicLightbox.create(teamCardsMarkup, {
    onShow: () => (document.body.style.overflow = 'hidden'),
    onClose: () => (document.body.style.overflow = 'visible'),
  });

  teamModal.show();
  teamModal.element().querySelector('.card__content').onclick = teamModal.close;
}

import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import data from '../team.json';
import teamCardTpl from '../templates/team-card';

// =========== version 4 (убран скрол)===========//
// =========== listeners
refs.teamLink.addEventListener('click', onTeamModalShow);

// =========== on click
function onTeamModalShow(e) {
  // create marckup
  const teamCardsMarkup = teamCardTpl(data);

  // create modal from marckup
  const teamModal = basicLightbox.create(teamCardsMarkup, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', onClick);
      document.addEventListener('keydown', closEsc);

      //=== close modal onClick on imgBox
      function onClick(e) {
        console.log(e.target.classList.value);
        e.target.classList.value === 'cards-container js-team list' ||
        e.target.classList.value === 'basicLightbox'
          ? teamModal.close()
          : teamModal.show();
        document.removeEventListener('click', onClick);
      }

      //=== close modal onEsc Btn
      function closEsc(e) {
        console.log(e);
        e.code === 'Escape' ? teamModal.close() : teamModal.show();
        document.removeEventListener('keydown', closEsc);
      }
    },
    onClose: () => (document.body.style.overflow = 'visible'),
  });

  teamModal.show();
}

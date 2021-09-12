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
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onCloseEsc);

  //=== close modal onClick on imgBox
  function onClick(e) {
    // console.log(e.target.classList.value);
    e.target.classList.value === 'cards-container js-team list' ||
    e.target.classList.value === 'imgBx__img' ||
    e.target.classList.value === 'basicLightbox'
      ? teamModal.close()
      : teamModal.show();
  }

  //=== close modal onEsc Btn
  function onCloseEsc(e) {
    // console.log(e);
    e.code === 'Escape' ? teamModal.close() : teamModal.show();
  }
  // create modal from marckup
  const teamModal = basicLightbox.create(teamCardsMarkup, {
    onShow: () => {
      document.body.style.overflow = 'hidden';
    },
    onClose: () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onCloseEsc);
    },
  });

  teamModal.show();
}

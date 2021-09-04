export default function filterFilm() {
  const buttonsFilter = document.querySelectorAll('.button-filter');
  const cards = document.querySelectorAll('.card');

  function filter(category, items) {
    items.forEach(item => {
      const isItemFiltered = !item.classList.contains(category);
      const isShowAll = category.toLowerCase() === 'all';
      if (isItemFiltered && !isShowAll) {
        item.classList.add('hide');
      } else {
        item.classList.remove('hide');
      }
    });
  }

  buttonsFilter.forEach(button => {
    button.addEventListener('click', () => {
      filter(button.dataset.filter, cards);
    });
  });
}

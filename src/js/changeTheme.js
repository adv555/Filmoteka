const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  switcher: document.querySelector('.theme-switch__toggle'),
  body: document.body,
  slider: document.querySelector('.switcher-wrapper'),
};

function changeTheme({ target: { checked } }) {
  checked ? toggleTheme(Theme.DARK, Theme.LIGHT) : toggleTheme(Theme.LIGHT, Theme.DARK);
}

function toggleTheme(add, rem) {
  refs.body.classList.replace(rem, add);
  localStorage.setItem('theme', add);
}

(function () {
  refs.switcher.addEventListener('change', changeTheme);

  refs.body.classList.add(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : Theme.LIGHT,
  );
  refs.switcher.checked = localStorage.getItem('theme') === Theme.DARK;
})();

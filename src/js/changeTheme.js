const Theme = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
};

const refs = {
  //   menuList: document.querySelector(".js-menu"),
  switcher: document.querySelector(".theme-switch__toggle"),
  body: document.body
};

function changeTheme({ target: { checked } }) {
  checked
    ? toggleTheme(Theme.DARK, Theme.LIGHT)
    : toggleTheme(Theme.LIGHT, Theme.DARK);
}

function toggleTheme(add, rem) {
  refs.body.classList.replace(rem, add);
  refs.slider.classList.replace(rem, add);
  localStorage.setItem("theme", add);
}

(function () {
  //   refs.menuList.innerHTML = createMenu(menu);
  refs.switcher.addEventListener("change", changeTheme);

  refs.body.classList.add(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : Theme.LIGHT
  );
  refs.switcher.checked = localStorage.getItem("theme") === Theme.DARK;
})();
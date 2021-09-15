export default function showBanner() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return;
  } else {
    bannerOn();
  }
}

function bannerOn() {
  let bannerBox = document.querySelector('.banner');
  let dice = document.getElementsByClassName('.dice');
  const ulItem = document.querySelector('.js-gallery > li:last-child');

  function render() {
    ulItem.insertAdjacentHTML(
      'afterend',
      '<li class="item"><span class="material-icons-outlined dice"> casino </span><div class="banner"></div></li> ',
    );
    bannerBox = document.querySelector('.banner');
    setTimeout(makeRandom(), 700);
  }
  render();

  //========Functions for run =======

  document.querySelector('.dice').addEventListener('click', () => {
    setTimeout(makeRandom(), 500);
  });

  function showAD() {
    bannerBox.insertAdjacentHTML(
      'afterbegin',
      ' <div class="wrapper-ad-place"><span class="ad-place"> PLACE <br> FOR YOUR <br> ADD </span></div>',
    );
  }

  function icecream() {
    bannerBox.insertAdjacentHTML(
      'afterbegin',
      ' <div class="wrapper-icecream"><a href="https://anastasiia-kisil.github.io/best-icecream/" class="icecream-logo"><img src="https://anastasiia-kisil.github.io/best-icecream/logo.a8c3877f.png" alt="so testy"></img><span>Visit our friends</span><img src="https://anastasiia-kisil.github.io/best-icecream/so-tasty-desktop.80c45100.png" alt="so testy"></img></a></div>',
    );
  }

  //======== randomiser =============

  function makeRandom() {
    bannerBox.innerHTML = '';
    const array = [showAD, icecream];
    const min = 0;
    const max = array.length - 1;
    const randomIntegerFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    let randomResult = randomIntegerFromInterval(min, max);

    let runIt = array[randomResult];
    setTimeout(runIt(), 300);
  }
}

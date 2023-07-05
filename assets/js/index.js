/* Aos.js */
AOS.init({
  once: true,
  delay: 0,
  offset: 120,
  duration: 500,
});

/* Menu */
const $menu = document.querySelector('.menu');
if ($menu) {
  const $menuToggle = $menu.querySelector('.menu__toggle');
  $menuToggle.addEventListener('click', () => {
    $menu.classList.toggle('menu--active');
    document.body.classList.toggle('body--lock');

    if ($menu.classList.contains('menu--active')) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  });

  $menu.addEventListener('click', e => {
    if ($menu === e.target && $menu.classList.contains('menu--active')) {
      $menu.classList.remove('menu--active');
      document.body.classList.remove('body--lock');
    }
  });

  const $menuLinks = $menu.querySelectorAll('.menu__link');
  $menuLinks.forEach($link => {
    $link.addEventListener('click', () => {
      if ($menu.classList.contains('menu--active')) {
        $menu.classList.remove('menu--active');
        document.body.classList.remove('body--lock');
      }
    });
  });
}

/* Banner */
const $downBtn = document.querySelector('.banner__down');
$downBtn.addEventListener('click', () => {
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
});

/* Smooth scroll for anchors */
const $anchors = document.querySelectorAll('a[href*="#"]');
$anchors.forEach($anchor => {
  $anchor.addEventListener('click', e => {
    const id = $anchor.getAttribute('href');
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (id[0] === '#') {
      e.preventDefault();
    }

    if (id === '#') {
      return;
    }

    const $elem = document.querySelector(id);
    if ($elem) {
      const offsetTop = $elem.getBoundingClientRect().top - headerHeight;
      window.scrollBy({ top: (offsetTop), left: 0, behavior: 'smooth' });
    }
  });
});

/* Dynamic images */
window.addEventListener('load', () => {
  const vwSizeCount = 1;
  const defaultWidth = 1600;
  const divider = vwSizeCount / (defaultWidth / 100);
  const minWindowWidth = 991;

  const $dynamicImages = document.querySelectorAll('.dynamic-img');
  $dynamicImages.forEach($img => setDynamicImage($img));

  window.addEventListener('resize', () => {
    $dynamicImages.forEach($img => setDynamicImage($img, true));
  });

  function setDynamicImage($img, resize = false) {
    if (window.innerWidth <= minWindowWidth) {
      if (resize) {
        $img.style.width = '';
        $img.style.height = '';
      }

      return;
    }

    const imgWidth = $img.naturalWidth;
    const imgHeight = $img.naturalHeight;

    const imgWidthRem = divider * imgWidth;
    const imgHeightRem = divider * imgHeight;

    $img.style.width = `${imgWidthRem}rem`;
    $img.style.height = `${imgHeightRem}rem`;
  }
})

/* Partners */
new Swiper('.partners__list', {
  enabled: true,
  slidesPerView: 1,
  breakpoints: {
    660.01: {
      enabled: false,
      slidesPerView: 'auto',
    },
    560: {
      slidesPerView: 2,
    }
  },
  pagination: {
    el: '.partners__pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.partners__next',
    prevEl: '.partners__prev',
  },
});

/* Team */
new Swiper('.team__slider', {
  enabled: true,
  slidesPerView: 1,
  spaceBetween: 15,
  breakpoints: {
    660.01: {
      enabled: false,
      slidesPerView: 'auto',
      spaceBetween: 0,
    },
    560: {
      slidesPerView: 2,
      spaceBetween: 15,
    }
  },
  pagination: {
    el: '.team__pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.team__next',
    prevEl: '.team__prev',
  },
});

/* Popup */
const $openBtns = document.querySelectorAll('.js-open-popup');
$openBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const name = $btn.dataset.popupName;
    const $popup = document.querySelector(`.popup[data-name="${name}"`);
    if (!name || !$popup) {
      return;
    }

    $popup.classList.add('popup--active');
    lockBody();
  });
});

const $popups = document.querySelectorAll('.popup');
$popups.forEach($popup => {
  $popup.classList.add('popup--show');

  const $closeBtn = $popup.querySelector('.popup__close');
  $closeBtn.addEventListener('click', () => {
    $popup.classList.remove('popup--active');
    $popup.addEventListener('transitionend', unlockBody, { once: true });
  });

  $popup.addEventListener('click', (e) => {
    if ($popup === e.target || e.target.classList.contains('popup__dialog')) {
      $popup.classList.remove('popup--active');
      $popup.addEventListener('transitionend', unlockBody, { once: true });
    }
  });
});

/* Helpers */
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

function lockBody() {
  const scrollbarWidthPX = `${getScrollbarWidth()}px`;

  document.body.classList.add('body--lock');
  document.body.style.paddingRight = scrollbarWidthPX;
}

function unlockBody() {
  document.body.classList.remove('body--lock');
  document.body.style.paddingRight = '';
}
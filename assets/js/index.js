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
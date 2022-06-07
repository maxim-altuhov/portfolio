import smoothscroll from 'smoothscroll-polyfill';

function setSmothScroll() {
  smoothscroll.polyfill();

  const navigationLinks = document.querySelectorAll('[data-scroll]');

  navigationLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idLink = link.getAttribute('href');

      document.querySelector(idLink).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

export default setSmothScroll;

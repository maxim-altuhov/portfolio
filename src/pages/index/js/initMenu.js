import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

function initMenu() {
  const menuBlock = document.querySelector('.js-menu__wrapper');
  const menuLink = document.querySelectorAll('.js-menu__link');
  const menuOverlay = document.querySelector('.js-menu__overlay');
  const hamburger = document.querySelector('.js-menu__hamburger');
  const CONTROLLED_WIDTH = 575;
  const state = {
    MENU_OPEN: 'menu__wrapper_active',
    HAMBURGER_ACTIVE: 'menu__hamburger_active',
  };

  const menuToggle = () => {
    hamburger.classList.toggle(state.HAMBURGER_ACTIVE);
    menuBlock.classList.toggle(state.MENU_OPEN);
    menuOverlay.classList.toggle('show');
  };

  const handleHamburgerClick = () => {
    if (hamburger.classList.contains(state.HAMBURGER_ACTIVE)) {
      menuToggle();
      enableBodyScroll(menuBlock);
    } else if (window.matchMedia(`(max-width: ${CONTROLLED_WIDTH}px)`).matches && !hamburger.classList.contains(state.HAMBURGER_ACTIVE)) {
      menuToggle();
      disableBodyScroll(menuBlock);
    } else {
      menuToggle();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === menuOverlay) menuToggle();
  };

  const handleLinkClick = () => {
    menuToggle();
    enableBodyScroll(menuBlock);
  };

  const handleWindowResize = () => {
    if (window.matchMedia(`(min-width: ${CONTROLLED_WIDTH + 1}px)`).matches) {
      enableBodyScroll(menuBlock);
    } else if (hamburger.classList.contains(state.HAMBURGER_ACTIVE)) {
      disableBodyScroll(menuBlock);
    }
  };

  hamburger.addEventListener('click', handleHamburgerClick);
  menuOverlay.addEventListener('click', handleOverlayClick);
  menuLink.forEach((link) => link.addEventListener('click', handleLinkClick));
  window.addEventListener('resize', handleWindowResize);
}

export default initMenu;

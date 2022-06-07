import blockCards from './js/block-cards';
import initMenu from './js/initMenu';
import toggleTabs from './js/toggleTabs';
import setSmothScroll from './js/setSmothScroll';
import scrollCheker from './js/scrollCheker';

import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  blockCards();
  initMenu();
  toggleTabs();
  setSmothScroll();
  scrollCheker();
});

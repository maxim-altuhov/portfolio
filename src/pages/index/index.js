import renderCards from './js/renderCards';
import initMenu from './js/initMenu';
import setSmothScroll from './js/setSmothScroll';
import scrollCheker from './js/scrollCheker';

import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  renderCards();
  initMenu();
  setSmothScroll();
  scrollCheker();
});

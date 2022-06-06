import blockCards from './js/block-cards.js';
import webp from './js/webp.js';
import menu from './js/menu.js';
import forms from './js/forms.js';
import tabs from './js/tabs.js';
import scroll from './js/scroll.js';

import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  blockCards();
  webp();
  menu();
  forms({
    formName: '#contacts-form',
    submitButton: '#button-form',
  });
  tabs();
  scroll();
});

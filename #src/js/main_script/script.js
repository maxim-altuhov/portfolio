'use strict';

import 'nodelist-foreach-polyfill';
require('es6-promise').polyfill();
require('formdata-polyfill');
import '../modules/remove-polyfill.js';
import '../modules/append-polyfill.js';
import '../modules/prepend-polyfill.js';

import webp from '../modules/webp.js';
import menu from '../modules/menu.js';
import forms from '../modules/forms.js';
import tabs from '../modules/tabs.js';
import scroll from '../modules/scroll.js';
import objectFit from '../modules/ofi.js';
import blockCards from '../modules/block-cards.js';

window.addEventListener('DOMContentLoaded', () => {

	webp();
	menu();
	forms({
		formName: '#contacts-form',
		submitButton: '#button-form'
	});
	tabs();
	scroll();
	objectFit();
	blockCards();

});
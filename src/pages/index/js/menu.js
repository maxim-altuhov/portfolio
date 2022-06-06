import {
	disableBodyScroll,
	enableBodyScroll,
} from 'body-scroll-lock';

function menu() {

	// меню и бургер
	const menu = document.querySelector('.menu__wrapper'),
		menuItem = document.querySelectorAll('.menu__link'),
		menuOverlay = document.querySelector('.menu__overlay'),
		hamburger = document.querySelector('#hamburger');

	function menuToggle() {
		hamburger.classList.toggle('active');
		menu.classList.toggle('menu__wrapper_active');
		menuOverlay.classList.toggle('show');
		// document.querySelector('body').classList.toggle('lock');
	}

	hamburger.addEventListener('click', () => {
		if (hamburger.classList.contains('active')) {
			menuToggle();
			enableBodyScroll(menu);
		} else if (window.matchMedia("(max-width: 575px)").matches && !hamburger.classList.contains('active')) {
			menuToggle();
			disableBodyScroll(menu);
		} else {
			menuToggle();
		}
	});

	menuOverlay.addEventListener('click', (e) => {
		if (e.target == menuOverlay) {
			menuToggle();
		}
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			menuToggle();
			enableBodyScroll(menu);
		});
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia("(min-width: 576px)").matches) {
			enableBodyScroll(menu);
		} else if (hamburger.classList.contains('active')) {
			disableBodyScroll(menu);
		}
	});

}

export default menu;
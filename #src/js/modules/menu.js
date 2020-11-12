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
		menuToggle();
	});

	menuOverlay.addEventListener('click', (e) => {
		if (e.target == menuOverlay) {
			menuToggle();
		}
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			menuToggle();
		});
	});

}

export default menu;
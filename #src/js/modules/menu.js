function menu() {

	// меню и бургер
	const menu = document.querySelector('.menu__wrapper'),
		menuItem = document.querySelectorAll('.menu__link'),
		hamburger = document.querySelector('#hamburger');

	function menuToggle() {
		hamburger.classList.toggle('active'); //для hamburger2
		menu.classList.toggle('menu__wrapper_active');
		document.querySelector('body').classList.toggle('lock');
	}

	hamburger.addEventListener('click', () => {
		menuToggle();
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			menuToggle();
		});
	});

}

export default menu;
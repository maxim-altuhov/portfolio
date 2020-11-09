function menu() {

	// зафиксировать меню, нужно внести изменения в файл menu.scss position!
	const headerMenu = document.querySelector('.header'),
		doFix = document.querySelector('#block_a'); //fix padding чтобы не скакал блок под меню

	let position = headerMenu.offsetTop,
		scroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);


	window.addEventListener('resize', () => {
		headerMenu.classList.remove('fixed');
		position = headerMenu.offsetTop;

		if (scroll > position) {
			headerMenu.classList.add('fixed');
		}

	});

	document.addEventListener('scroll', () => {

		scroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);

		if (scroll > position) {
			headerMenu.classList.add('fixed');
			doFix.classList.add('do-fix'); //fix padding чтобы не скакал блок под меню
		} else {
			headerMenu.classList.remove('fixed');
			doFix.classList.remove('do-fix'); //fix padding чтобы не скакал блок под меню
		}

	});

	// меню и бургер
	const menu = document.querySelector('.menu__wrapper'),
		menuItem = document.querySelectorAll('.menu__link'),
		hamburger = document.querySelector('#hamburger');

	function menuToggle() {
		hamburger.classList.toggle('hamburger_active'); //для hamburger1
		// hamburger.classList.toggle('active'); //для hamburger2
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
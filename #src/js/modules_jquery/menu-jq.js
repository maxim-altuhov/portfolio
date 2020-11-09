function menuJq() {

	// зафиксировать меню, нужно внести изменения в файл menu.scss position!
	var postion = $('.menu').offset().top;

	$(document).on('scroll', function () {

		var scroll = $(document).scrollTop();
		if (scroll > postion) {

			$('.menu').addClass('fixed');
		} else {
			$('.menu').removeClass('fixed');
		}

	});

	// меню и бургер
	const menu = document.querySelector('.menu__wrapper'),
		menuItem = document.querySelectorAll('.menu__link'),
		hamburger = document.querySelector('.hamburger');

	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('hamburger_active');
		menu.classList.toggle('menu__wrapper_active');
		$('body').toggleClass('lock');
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger_active');
			menu.classList.toggle('menu__wrapper_active');
			$('body').toggleClass('lock');
		});
	});

}

export default menuJq;
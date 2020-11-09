import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

function scroll() {

	// кнопка вверх (нужно добавить стили в pageup.scss, если не отображается)
	const pageUp = document.querySelector('.pageup');

	window.addEventListener('scroll', function () {

		let scroll = Math.round(window.pageYOffset || document.documentElement.scrollTop);

		if (scroll > 800) {
			pageUp.classList.add('pageup-show');
		} else {
			pageUp.classList.remove('pageup-show');
		}
	});

	// плавный скролл к блоку
	const navigationLinks = document.querySelectorAll('nav a');

	navigationLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const idLink = link.getAttribute('href');
			document.querySelector(idLink).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});

}

export default scroll;
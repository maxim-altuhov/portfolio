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

	// подсвечивание активного пункта меню
	const sectionBlock = document.querySelectorAll('[data-section]');

	window.addEventListener('scroll', function () {
		let scrollInfo = Math.round(window.pageYOffset || document.documentElement.scrollTop);

		sectionBlock.forEach((elem) => {
			let topBlock = elem.offsetTop - 100, // здесь нужно скорректировать значение на высоту меню
				bottomBlock = topBlock + elem.scrollHeight,
				idBlock = elem.getAttribute('id');

			if (scrollInfo > topBlock && scrollInfo < bottomBlock && idBlock !== null) {
				document.querySelector('.menu a.active').classList.remove('active');
				document.querySelector(`.menu a[href="#${idBlock}"]`).classList.add('active');
			}
		});
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
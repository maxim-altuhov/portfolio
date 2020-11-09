function custom() {

	/*прелоадер*/
	const status = document.querySelector('#status'),
		preloader = document.querySelector('#preloader');

	setTimeout(() => {
		status.classList.add('hide-main');
	}, 1000);
	setTimeout(() => {
		preloader.classList.add('hide-main');
	}, 1500);

	/* главная страница фон на весь экран*/
	let main = document.querySelector('.main');

	function setHeight() {
		main.style.height = `${document.documentElement.clientHeight}px`;
	}

	if (document.documentElement.clientWidth > 767) {
		setHeight();

		window.addEventListener('resize', () => {
			setHeight();
		});
	}

}

export default custom;
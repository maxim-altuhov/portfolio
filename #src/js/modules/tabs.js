function tabs() {

	// переключение табов
	const tabsElements = document.querySelectorAll('.works__tabs div'),
		workBody = document.querySelectorAll('.works__tab-body');

	tabsElements.forEach(elem => {
		elem.addEventListener('click', (e) => {

			if (!elem.classList.contains('tab-active')) {
				workBody.forEach((elem) => {
					elem.classList.toggle('body-active');
				});
			}

			tabsElements.forEach((elem) => {
				elem.classList.remove('tab-active');
			});

			e.target.classList.add('tab-active');
		});
	});
}

export default tabs;
function tabs() {

	// переключение табов (свойство классов смотреть в 4webcode)
	const tabsElements = document.querySelectorAll('.work__tabs div'),
		workBody = document.querySelectorAll('.work__tab-body');

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
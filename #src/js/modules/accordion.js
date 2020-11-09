function accordion() {

	const selector = document.querySelectorAll('.questions__block-top');

	selector.forEach(function (item) {

		function openTabs() {

			if (item.classList.contains('active-style')) {
				item.nextElementSibling.style.maxHeight = item.nextElementSibling.scrollHeight + 'px';
			} else {
				item.nextElementSibling.style.maxHeight = '0px';
			}

		}

		openTabs();

		window.addEventListener('resize', () => {
			openTabs();
		});

		item.addEventListener('click', function () {

			//скрывает все остальные табы, если нужен только один активный класс
			// selector.forEach((elem) => {
			// 	elem.classList.remove('active-style');
			// 	elem.nextElementSibling.classList.remove('active-content');
			// 	elem.nextElementSibling.style.maxHeight = '0px';
			// });

			this.classList.toggle('active-style');
			this.nextElementSibling.classList.toggle('active-content');

			if (this.classList.contains('active-style')) {
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
			} else {
				this.nextElementSibling.style.maxHeight = '0px';
			}
		});
	});

}

export default accordion;
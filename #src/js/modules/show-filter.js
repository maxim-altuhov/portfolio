function showFilter() {

	const selector = document.querySelectorAll('.big-catalog__col-title');

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

			this.classList.toggle('active-style');
			this.nextElementSibling.classList.toggle('active-content');

			if (this.classList.contains('active-style')) {
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 'px';
			} else {
				this.nextElementSibling.style.maxHeight = '0px';
			}
			if (!this.classList.contains('big-catalog__col-title_empty')) {
				this.classList.toggle('big-catalog__col-title_close');
			}
		});
	});
}

export default showFilter;
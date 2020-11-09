function filter() {

	const filterTrigger = document.querySelector('#open_filter'),
		closeTrigger = document.querySelector('#close_filter'),
		filterMain = document.querySelector('.big-catalog__col');

	function filterToggle() {

		if (!filterTrigger.classList.contains('big-catalog__col_active') && filterTrigger.textContent == 'Открыть фильтр') {
			filterMain.classList.toggle('big-catalog__col_active');
			filterTrigger.textContent = 'Закрыть фильтр';
			document.querySelector('body').classList.toggle('lock');
		} else {
			filterMain.classList.toggle('big-catalog__col_active');
			filterTrigger.textContent = 'Открыть фильтр';
			document.querySelector('body').classList.toggle('lock');
		}
	}

	try {
		filterTrigger.addEventListener('click', (e) => {
			e.preventDefault();
			filterToggle();
		});

		closeTrigger.addEventListener('click', (e) => {
			e.preventDefault();
			filterToggle();
		});
	} catch (e) {}

}

export default filter;
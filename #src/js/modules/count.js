function countAnimated() {

	// счётчик цифр 
	const countElem = document.querySelectorAll('.count__number');

	function countStart() {
		countElem.forEach(elem => {

			let num = elem.textContent;

			function iterate(i) {
				if (i < num) {
					setTimeout(function () {
						iterate(i + 1);
					}, 10);
				}
				elem.textContent = i;
			}
			iterate(0);
		});
	}
	// countStart(); //Запуск функции отдельно


	// Запуск счётчика при скролле
	function startCount() {
		let startCountElem = document.querySelector('#count'),
			countStatus = true;

		window.addEventListener('scroll', () => {
			let scrollInfo = Math.round(window.pageYOffset || document.documentElement.scrollTop),
				scrollEvent = (scrollInfo > (startCountElem.offsetTop - window.innerHeight));

			if (scrollEvent && countStatus) {
				countStatus = false;
				if (window.matchMedia("(min-width: 992px)").matches) {
					countStart();
				}
			}
		});
	}
	startCount();

}

export default countAnimated;
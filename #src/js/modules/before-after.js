function beforeJS({
	selector,
	wrapper
}) {

	const comparison = document.querySelectorAll(selector),
		wrapperBlock = document.querySelector(wrapper);
	let wrapperBlockW = wrapperBlock.offsetWidth;

	comparison.forEach((elem) => {
		const imgFirst = elem.firstElementChild;

		elem.classList.add('image-comparison');
		elem.insertAdjacentHTML('afterBegin', '<div class="image-comparison__after"></div>');
		elem.insertAdjacentHTML('beforeEnd', '<button class="image-comparison__slider"></button>');

		elem.children.forEach((item) => {
			if (item.tagName == 'IMG') {
				item.classList.add('image-comparison__image');
				item.style.maxWidth = `${wrapperBlockW}px`;
			}
		});

		document.querySelectorAll('.image-comparison__after').forEach((elem) => {
			elem.insertAdjacentElement('afterbegin', imgFirst);
		});

	});

	window.addEventListener('resize', () => {
		wrapperBlockW = wrapperBlock.offsetWidth;

		document.querySelectorAll('.image-comparison__image').forEach((elem) => {

			if (elem.tagName == 'IMG') {
				elem.style.maxWidth = `${wrapperBlockW}px`;
			}

		});

	});

	wrapperBlock.addEventListener('dragstart', (e) => {
		e.preventDefault();
		return false;
	});

	document.querySelectorAll('.image-comparison__slider').forEach((elem) => {

		elem.addEventListener('mousedown', function () {
			const slider = this;
			const sliderStart = function (e) {
				let offset = e.pageX - wrapperBlock.offsetLeft;

				if (offset < 0) {
					offset = 0;
				}
				if (offset > wrapperBlockW) {
					offset = wrapperBlockW;
				}

				slider.style.left = `${offset}px`;
				elem.previousElementSibling.previousElementSibling.style.width = `${offset}px`;
			};

			wrapperBlock.addEventListener('mousemove', sliderStart);

			slider.addEventListener('mouseup', () => {
				wrapperBlock.removeEventListener('mousemove', sliderStart);
			});
		});

		elem.addEventListener('touchstart', function () {
			const slider = this;
			const sliderStart = function (e) {
				let i;
				let touchPageX;
				for (i = 0; i < e.changedTouches.length; i++) {
					touchPageX = e.changedTouches[i].pageX;
				}

				let offset = touchPageX - wrapperBlock.offsetLeft;

				if (offset < 0) {
					offset = 0;
				}
				if (offset > wrapperBlockW) {
					offset = wrapperBlockW;
				}

				slider.style.left = `${offset}px`;
				elem.previousElementSibling.previousElementSibling.style.width = `${offset}px`;
			};

			wrapperBlock.addEventListener('touchmove', sliderStart);

			slider.addEventListener('touchend', () => {
				wrapperBlock.removeEventListener('touchmove', sliderStart);
			});
		});

	});

}

export default beforeJS;
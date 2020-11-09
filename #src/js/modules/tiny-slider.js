import {
	tns
} from 'tiny-slider/src/tiny-slider';

function tinySlider({
	selector,
	previousButton,
	nextButton,
	naviButton,
	blockCounter,
	blockCounterCurrent,
	blockCounterTotal
}) {

	const prevBtn = document.querySelector(previousButton),
		nextBtn = document.querySelector(nextButton),
		naviBtn = document.querySelector(naviButton),
		settings = {
			container: selector,
			items: 1,
			controlsText: ["Назад", "Вперед"],
			// prevButton: prevBtn,
			// nextButton: nextBtn,
			// loop: false,
			mouseDrag: true,
			swipeAngle: false,
			nav: true,
			navPosition: 'bottom',
			controls: true,
			controlsPosition: 'bottom',
			speed: 400
		};


	let slider = tns(settings);

	const info = slider.getInfo();

	// удаляем блок с подсчётом слайдов, если слайд один
	const tnsCounter = document.querySelector(blockCounter);

	if (info.slideCount == 1) {
		tnsCounter.style = 'display: none';
		naviBtn.style = 'display: none';
	}

	//считаем слайды, инициализация
	let counterCurrent = document.querySelector(blockCounterCurrent),
		counterTotal = document.querySelector(blockCounterTotal);

	function sliderInit() {
		counterCurrent.textContent = info.displayIndex;
		counterTotal.textContent = info.slideCount;
	}

	sliderInit();

	//считаем изменение слайдов, в случае изменения на свои кнопки использовать в селекторе ${naviButton}

	document.querySelector(`[data-controls="prev"]`).addEventListener('click', () => {

		if (counterCurrent.textContent > 1) {
			counterCurrent.textContent = +counterCurrent.textContent - 1;
		} else {
			counterCurrent.textContent = info.slideCount;
		}

	});

	document.querySelector(`[data-controls="next"]`).addEventListener('click', () => {

		if (counterCurrent.textContent < info.slideCount) {
			counterCurrent.textContent = +counterCurrent.textContent + 1;
		} else {
			counterCurrent.textContent = 1;
		}

	});

	//изменение слайдов по dots

	const dotsChange = document.querySelectorAll('.tns-nav button');

	dotsChange.forEach((item, i) => {
		item.addEventListener('click', function () {
			counterCurrent.textContent = i + 1;
		});
	});

	//indexChanged fix баг, если кол-во слайдов 2 + drag event

	const indexCurrent = document.querySelector('span.current');

	function changeIndex() {

		if (counterCurrent.textContent < 1) {
			counterCurrent.textContent = info.slideCount;
		}

		if (counterCurrent.textContent > info.slideCount) {
			counterCurrent.textContent = 1;
		}

	}

	function setIndex() {
		if (info.slideCount !== 2) {

			if (settings.loop == false) {
				counterCurrent.textContent = +indexCurrent.textContent;
			} else {
				counterCurrent.textContent = +indexCurrent.textContent - 1;
			}

			changeIndex();

		} else {

			if (settings.loop == false) {
				counterCurrent.textContent = +indexCurrent.textContent;
			} else {
				counterCurrent.textContent = +counterCurrent.textContent + 1;
			}

			changeIndex();

		}
	}

	slider.events.on('dragEnd', setIndex);

	// document.querySelector('.tns-liveregion').classList.remove('tns-visually-hidden');

}

export default tinySlider;
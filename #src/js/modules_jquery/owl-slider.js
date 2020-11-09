import 'owl.carousel';

function sliderOwl({
	selector,
	arrowNext,
	arrowPrev,
	counterCurrent,
	counterTotal
}) {

	// стандартная настройка слайдера

	// $(document).ready(function () {
	// 	$(".owl-carousel").owlCarousel();
	// });

	//задаём переменные

	const headerSlider = $(selector);

	// показывает кол-ва слайдов и какой сейчас слайдер

	headerSlider.on('initialized.owl.carousel', function (event) {

		if (event.relatedTarget.settings.loop) {
			$(counterCurrent).text(event.page.index + 2);
			$(counterTotal).text(event.item.count);
		} else {
			$(counterCurrent).text(event.item.index + 1);
			$(counterTotal).text(event.item.count);
		}

	});

	// подкючение слайдера через переменную

	headerSlider.owlCarousel({
		items: 1,
		dots: true,
		nav: true,
		// loop: true,
		smartSpeed: 2000,
		margin: 30

	});

	// настраиваем стрелки

	$(arrowPrev).click(function () {
		headerSlider.trigger('prev.owl.carousel');
	});

	$(arrowNext).click(function () {
		headerSlider.trigger('next.owl.carousel');
	});

	// меняем надписи в поле кол-во слайдов

	headerSlider.on('changed.owl.carousel', function (event) {
		if (event.relatedTarget.settings.loop) {
			$(counterCurrent).text(event.page.index + 1);
			$(counterTotal).text(event.item.count);
		} else {
			$(counterCurrent).text(event.item.index + 1);
			$(counterTotal).text(event.item.count);
		}
	});

}

export default sliderOwl;
 import 'slick-carousel';

 function sliderSlick({
 	selector,
 	arrowNext,
 	arrowPrev,
 	counter
 }) {

 	const $slider = $(selector);

 	const settings = {
 		centerMode: true,
 		dots: true,
 		slidesToShow: 3,
 		autoplay: true,
 		// infinite: false,
 		autoplaySpeed: 5000,
 		adaptiveHeight: true,
 		// prevArrow: '<img src="img/icons/arrows_left.svg" class="prev">',
 		// nextArrow: '<img src="img/icons/arrows_right.svg" class="next">',
 		nextArrow: document.querySelector(arrowNext),
 		prevArrow: document.querySelector(arrowPrev),
 		responsive: [{
 				breakpoint: 992,
 				settings: {
 					slidesToShow: 1,
 				}
 			},
 			{
 				breakpoint: 576,
 				settings: "unslick"
 			}
 		]
 	};

 	if ($slider.length) {
 		let currentSlide;
 		let slidesCount;
 		const sliderCounter = document.querySelector(counter);

 		const updateSliderCounter = function (slick, currentIndex) {
 			currentSlide = slick.slickCurrentSlide() + 1;
 			slidesCount = slick.slideCount;
 			$(sliderCounter).text(currentSlide + '/' + slidesCount);
 		};

 		$slider.on('init', function (event, slick) {
 			updateSliderCounter(slick);
 		});


 		$slider.on('afterChange', function (event, slick, currentSlide) {
 			updateSliderCounter(slick, currentSlide);
 		});
 	}

 	const sl = $slider.slick(settings);

 	$(window).on('resize', function () {
 		if ($(window).width() >= 575 && !sl.hasClass('slick-initialized')) {
 			$slider.slick(settings);
 		}
 	});
 }

 export default sliderSlick;
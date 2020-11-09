function countAnimatedJq() {

	// счётчик цифр 
	function countStart() {
		$('.standarts__projects-number').each(function () {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).text()
			}, {
				duration: 2000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	}

	// Запуск счётчика при скролле
	$(function () {
		var startCount = $('#count');
		var countStatus = true;
		$(window).scroll(function () {
			var scrollEvent = ($(window).scrollTop() > (startCount.position().top - $(window).height()));
			if (scrollEvent && countStatus) {
				countStatus = false;
				if (window.matchMedia("(min-width: 992px)").matches) {
					countStart();
				}
			}
		});
	});

}

export default countAnimatedJq;
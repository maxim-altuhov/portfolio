function scrollJq() {

	// scroll up
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	// плавный скролл, отключить если используем другой

	$('a[href ^="#scroll_"]').on("click", function (e) {
		e.preventDefault();
		var anchor = $(this).attr('href');
		$('html, body').stop().animate({
			// scrollTop: $(anchor).offset().top - 60
			scrollTop: $(anchor).offset().top
		}, 800);
	});

	// добавление класса active, если скролим блок

	$(window).scroll(function () {
		var $sections = $('section');

		$sections.each(function (i, el) {
			var top = $(el).offset().top - 200;
			var bottom = top + $(el).height();
			var scroll = $(window).scrollTop();
			var id = $(el).attr('id');
			if (scroll > top && scroll < bottom) {
				$('a.active').removeClass('active');
				$('a[href="#' + id + '"]').addClass('active');

			}
		});

	});

	// плавный скролл всех ссылок в блоке nav

	$('nav').on('click', 'a', function (event) {
		event.preventDefault();
		// получем идентификатор блока из атрибута href
		var id = $(this).attr('href'),
			// находим высоту, на которой расположен блок
			top = $(id).offset().top;
		// анимируем переход к блоку, время: 800 мс
		$('body,html').animate({
			scrollTop: top
		}, 800);
	});

}

export default scrollJq;
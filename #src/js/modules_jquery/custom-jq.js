function customJq() {

	// /* прелоадер при загрузке, смотри 4webcode*/
	$(window).ready(function () {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

	// /* главная страница, фон на весь экран*/

	$(".main").height($(window).height());

	$(window).resize(function () {
		$(".main").height($(window).height());
	});

}

export default customJq;
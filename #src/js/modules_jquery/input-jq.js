function inputJq() {

	// Jquery
	// исчезновение placeholder при клике, можно сделать только на CSS смотри IT-project subscribe.scss
	$('#subscribe-input').on('click', function () {
		$(this).attr("placeholder", "");
	});

}

export default inputJq;
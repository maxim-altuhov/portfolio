function uiJq() {

	$(".price").slider({
		min: 0,
		max: 15990,
		values: [1990, 15990],
		range: true,
		animate: "fast",
		slide: function (event, ui) {
			$(".price__input-left").val(ui.values[0]);
			$(".price__input-right").val(ui.values[1]);
		}
	});
	$(".price__input-left").val($(".price").slider("values", 0));
	$(".price__input-right").val($(".price").slider("values", 1));

	$('.price-container').focusout(function () {
		let inputLeft = $(".price__input-left").val().replace(/[^0-9]/g, ''),
			ioptLeft = $(".price").slider("option", "min"),
			whereRight = $(".price").slider("values", 1),
			inputRight = $(".price__input-right").val().replace(/[^0-9]/g, ''),
			optRight = $(".price").slider("option", "max"),
			whereLeft = $(".price").slider("values", 0);

		if (inputLeft > whereRight) {
			inputLeft = whereRight;
		}
		if (inputLeft < ioptLeft) {
			inputLeft = ioptLeft;
		}
		if (inputLeft == "") {
			inputLeft = 0;
		}
		if (inputRight < whereLeft) {
			inputRight = whereLeft;
		}
		if (inputRight > optRight) {
			inputRight = optRight;
		}
		if (inputRight == "") {
			inputRight = 0;
		}
		$(".price__input-left").val(inputLeft);
		$(".price__input-right").val(inputRight);
		$(".price").slider("values", [inputLeft, inputRight]);
	});
}

export default uiJq;
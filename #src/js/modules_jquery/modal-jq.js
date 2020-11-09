function modalJq() {

	$('#open_modal').on('click', function (e) {
		e.preventDefault();
		$('#overlay_modal, #feedback_modal').fadeIn('slow');
	});

	$('.modal-main__close').on('click', function () {
		$('#overlay_modal, #feedback_modal, #modal_thankyou, #modal_error').fadeOut('slow');
	});

	$(document).mouseup(function (e) {
		let modalctr = $("#overlay_modal"),
			modal = $(".modal-main"),
			thankyou = $("#modal_thankyou"),
			modalError = $("#modal_error");

		if (!modal.is(e.target) && modal.has(e.target).length === 0) {
			modalctr.fadeOut('slow');
			thankyou.fadeOut('slow');
			modalError.fadeOut('slow');
		}
	});


}

export default modalJq;
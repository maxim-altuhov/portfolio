import 'jquery-mask-plugin';

function formsJq() {
	$('#form_id').submit(function (e) {
		e.preventDefault();
		$(this).find('#button_modal').prop('disabled', true);
		$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			})
			.done(function () {
				$(this).find("input, textarea").val("");
				$('#button_modal').prop('disabled', false);
				$('#feedback_modal').fadeOut();
				$('#overlay_modal, #modal_thankyou').fadeIn('slow');

				$('#form_id').trigger('reset');
				$('#modal_thankyou').trigger('reset');

			})
			.fail(function () {
				$(this).find("input, textarea").val("");
				$('#button_modal').prop('disabled', false);
				$('#feedback_modal').fadeOut();
				$('#overlay_modal, #modal_error').fadeIn('slow');

				$('#form_id').trigger('reset');
				$('#modal_error').trigger('reset');
			});

		return false;
	});

	$('input[name=phone]').mask('+7 (999) 999-99-99');
}

export default formsJq;
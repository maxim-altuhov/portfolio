import 'jquery-validation';

function validator() {

	// Initialize form validation on the registration form.
	// It has the name attribute "registration"
	$('#form_id').validate({

		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			name: "required",
			phone: "required",
			email: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true
			},
			textForm: "required"
			//    password: {
			//    required: true,
			//    minlength: 5
			//    }
		},
		// Specify validation error messages
		messages: {
			name: "Пожалуйста, введите свое имя",
			phone: "Пожалуйста, введите свой телефон",
			email: "Пожалуйста, введите действительный E-mail",
			textForm: "Пожалуйста, введите сообщение"
			//    lastname: "Please enter your lastname",
			//    password: {
			//    required: "Please provide a password",
			//    minlength: "Your password must be at least 5 characters long"
			//    },
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		errorPlacement: function (error, element) {
			element.before(error);
		},
		submitHandler: function (form) {
			$(form).find('#subscribe-btn').prop('disabled', true);
			$.ajax({
					type: "POST",
					url: "mailer/smart.php",
					data: $(form).serialize()
				})
				.done(function () {
					$(form).find("input").val("");
					$('#subscribe-btn').prop('disabled', false);
					$('#overlay_modal, #modal_thankyou').fadeIn('slow');
					$('#subscribe-form').trigger('reset');
					$('#modal_thankyou').trigger('reset');

				})
				.fail(function () {
					$(form).find("input").val("");
					$('#subscribe-btn').prop('disabled', false);
					$('#overlay_modal, #modal_error').fadeIn('slow');
					$('#subscribe-form').trigger('reset');
					$('#modal_error').trigger('reset');
				});

			return false;
		}
	});
}

export default validator;
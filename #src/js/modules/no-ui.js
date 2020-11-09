import noUiSlider from 'nouislider';

function noUi() {

	var stepsSlider = document.querySelector('#slider');
	var input0 = document.querySelector('#input-0');
	var input1 = document.querySelector('#input-1');
	var inputs = [input0, input1];

	noUiSlider.create(stepsSlider, {
		start: [2000, 14000],
		connect: true,
		range: {
			'min': 0,
			'max': 16000
		}
	});

	stepsSlider.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = Math.round(values[handle]);
	});

	inputs.forEach(function (input, handle) {

		input.addEventListener('change', function () {
			stepsSlider.noUiSlider.setHandle(handle, this.value);
		});

		input.addEventListener('keydown', function (e) {

			var values = stepsSlider.noUiSlider.get();
			var value = Number(values[handle]);

			var steps = stepsSlider.noUiSlider.steps();

			// [down, up]
			var step = steps[handle];

			var position;

			switch (e.which) {

				case 13:
					stepsSlider.noUiSlider.setHandle(handle, this.value);
					break;

				case 38:

					// Get step to go increase slider value (up)
					position = step[1];

					// false = no step is set
					if (position === false) {
						position = 1;
					}

					// null = edge of slider
					if (position !== null) {
						stepsSlider.noUiSlider.setHandle(handle, value + position);
					}

					break;

				case 40:

					position = step[0];

					if (position === false) {
						position = 1;
					}

					if (position !== null) {
						stepsSlider.noUiSlider.setHandle(handle, value - position);
					}

					break;
			}
		});
	});

}

export default noUi;
import Inputmask from "inputmask";

function inMask() {

	let selectorPhone = document.querySelector('[name="phone"]'),
		selectorName = document.querySelector('[name="name"]');

	Inputmask({
		regex: "[а-яёА-ЯЁ a-zA-Z -]*",
		showMaskOnHover: false
	}).mask(selectorName);

	Inputmask({
		"mask": "+7 999 999 99 99",
		showMaskOnHover: false
	}).mask(selectorPhone);

}

export default inMask;
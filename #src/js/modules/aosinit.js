import AOS from 'aos';

function aosinit() {

	//определяем какой браузер
	function getNameBrowser() {
		var ua = navigator.userAgent;
		if (ua.search(/YaBrowser/) > 0) {
			return 'Яндекс Браузер';
		}
		if (ua.search(/rv:11.0/) > 0) {
			return 'Internet Explorer 11';
		}
		if (ua.search(/MSIE/) > 0) {
			return 'Internet Explorer';
		}
		if (ua.search(/Edge/) > 0) {
			return 'Edge';
		}
		if (ua.search(/Chrome/) > 0) {
			return 'Google Chrome';
		}
		if (ua.search(/Firefox/) > 0) {
			return 'Firefox';
		}
		if (ua.search(/Opera/) > 0) {
			return 'Opera';
		}
		if (ua.search(/Safari/) > 0) {
			return 'Safari';
		}
		return 'Не определен';
	}

	let browser = getNameBrowser(),
		allElementsAos = document.querySelectorAll('[data-aos]');

	if (browser == 'Internet Explorer 11' || browser == 'Internet Explorer') {
		allElementsAos.forEach(elem => {
			elem.removeAttribute('data-aos');
		});
	} else {
		AOS.init({
			once: 'true',
			disable: 'mobile'
		});
	}

}

export default aosinit;
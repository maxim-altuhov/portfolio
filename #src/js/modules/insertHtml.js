/* показываем карту только когда докрутили до неё */

function insertHtml() {

	const startPostiton = document.querySelector('#cantagion'),
		selectorDiv = document.querySelector('.map__group'),
		startPostitonY = startPostiton.offsetTop;

	function showHTMLByScroll() {
		let scroll = window.pageYOffset || document.documentElement.scrollTop;

		if (scroll > startPostitonY) {
			selectorDiv.innerHTML = '<iframe src = "https://ourworldindata.org/grapher/total-cases-covid-19?tab=map"></iframe>';
			window.removeEventListener('scroll', showHTMLByScroll);
		}
	}

	window.addEventListener('scroll', showHTMLByScroll);
}

export default insertHtml;
function getDate() {

	let dataInfo = document.querySelector('#date');

	function formatDate(now) {

		var dd = now.getDate();
		if (dd < 10) {
			dd = '0' + dd;
		}
		var mm = now.getMonth() + 1;
		if (mm < 10) {
			mm = '0' + mm;
		}

		var yy = now.getFullYear();
		if (yy < 10) {
			yy = '0' + yy;
		}

		return dd + '/' + mm + '/' + yy;
	}

	dataInfo.textContent = formatDate(new Date());


}

export default getDate;
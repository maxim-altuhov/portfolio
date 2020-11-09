function inputJs() {

	document.querySelector('#subscribe-input').addEventListener('click', function (e) {
		this.setAttribute("placeholder", "");
	});

}

export default inputJs;
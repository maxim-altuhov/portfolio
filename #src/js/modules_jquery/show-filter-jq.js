function showFilterJq() {

	$(".big-catalog__col-title").click(function () {
		$(this).siblings(".big-catalog__col-tab-content").slideToggle(400);
		if (!$(this).hasClass("big-catalog__col-title_empty")) {
			$(this).toggleClass("big-catalog__col-title_close");
		}
	});
}

export default showFilterJq;
function showJq() {

	// показ блока (в инлайн стилях нужно прописывать display:none)

	function showBlockJq(selector, block, nameBtn, nameBtnOrigin) {
		$(selector).click(function () {
			$(block).slideToggle('800');
			let textBtn = $(selector).text();
			if (textBtn !== nameBtn) {
				$(selector).text(nameBtn);
			} else {
				$(selector).text(nameBtnOrigin);
			}
		});
	}
	showBlockJq('#show_projects', '#projects__block', 'Свернуть', 'Все проекты');


	//показать следующий таб

	$("[data-tab]").click(function () {
		$(this).siblings(".questions__block-cont").slideToggle(400);
		$(this).toggleClass("questions__block-top_noline");
		$(this).parent(".questions__block").toggleClass("questions__block_noline");
	});

}

export default showJq;
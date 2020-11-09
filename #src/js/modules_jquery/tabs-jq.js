function tabsJq() {

	// Jquery 
	// переключение табов
	$('.work__tabs').on('click', 'div:not(.tab-active)', function () {
		$(this)
			.addClass('tab-active').siblings().removeClass('tab-active')
			.closest('div.container').find('div.work__tab-body').removeClass('body-active').eq($(this).index()).addClass('body-active');
	});
}

export default tabsJq;
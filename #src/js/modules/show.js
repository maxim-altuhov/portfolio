function show({
	selector,
	block,
	nameBtn,
	nameBtnOrigin,
	hiddenClass
}) {

	// показ блока (нужно прописывать дополнительные свойства и классы в html,
	//  в том числе click-hide, и ставить z-index), смотри IT-project

	const selectorElem = document.querySelector(selector),
		selectorBlock = document.querySelector(block);

	selectorBlock.style.overflow = 'hidden';

	selectorElem.addEventListener('click', () => {
		if (selectorBlock.classList.contains(hiddenClass) && selectorElem.textContent !== nameBtn) {
			selectorBlock.style.opacity = 1;
			selectorBlock.style.maxHeight = selectorBlock.scrollHeight + 'px';
			selectorBlock.classList.remove(hiddenClass);
			selectorElem.textContent = nameBtn;
		} else {
			selectorBlock.style.opacity = 0;
			selectorBlock.style.maxHeight = 0;
			selectorBlock.classList.add(hiddenClass);
			selectorElem.textContent = nameBtnOrigin;
		}
	});

	window.addEventListener('resize', () => {
		if (!selectorBlock.classList.contains(hiddenClass)) {
			selectorBlock.style.maxHeight = selectorBlock.scrollHeight + 'px';
		}
	});

}

export default show;
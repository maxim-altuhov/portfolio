function closeModal(selector) {
	selector.classList.add('hide');
	selector.classList.remove('show');
}

function openModal(selector) {
	selector.classList.add('show');
	selector.classList.remove('hide');
}

function modal({
	trigger,
	overlay,
	modalName,
	thankyou,
	error,
	closeBtn
}) {

	const modalTrigger = document.querySelectorAll(trigger),
		overlayModal = document.querySelector(overlay),
		modal = document.querySelector(modalName),
		modalThankyou = document.querySelector(thankyou),
		modalError = document.querySelector(error),
		modalCloseBtn = document.querySelectorAll(closeBtn);

	const fixedMenu = document.querySelectorAll('[data-lock_scroll]'); //если фиксированно верхнее меню и есть page-up

	function lock() {
		let w = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.marginRight = `${w}px`;
		fixedMenu.forEach((elem) => { //если fixed верхнее меню
			if (!elem.classList.contains('pageup')) {
				elem.style.left = `-${w/2}px`;
			} else {
				const pageUpR = parseInt(window.getComputedStyle(elem).right, 10);
				elem.style.right = (pageUpR + w) + 'px';
			}
		});
	}

	function unlock() {
		setTimeout(() => {
			document.body.style.overflow = '';
			document.body.style.marginRight = '';
			fixedMenu.forEach((elem) => { //если fixed верхнее меню
				if (!elem.classList.contains('pageup')) {
					elem.style.left = '';
				} else {
					elem.style.right = '';
				}
			});
		}, 300);
	}

	function fixHeight() {
		// const modalHeight = modal.offsetHeight; //для IE <=8
		const modalObj = modal.getBoundingClientRect();
		const modalHeight = modalObj.height;
		let clientHeight = document.body.clientHeight;

		if (modalHeight >= clientHeight) {
			modal.style.cssText = 'top: 10%; transform: translate(-50%, 0%);';
		} else {
			modal.style.cssText = '';
		}
	}

	fixHeight();

	window.addEventListener('resize', () => {
		let clientHeight = document.body.clientHeight;
		fixHeight(clientHeight);
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			e.preventDefault();
			closeModal(overlayModal);
			closeModal(modal);
			closeModal(modalThankyou);
			closeModal(modalError);
			unlock();
		}
	});

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			openModal(overlayModal);
			openModal(modal);
			lock();
		});
	});

	modalCloseBtn.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			closeModal(overlayModal);
			closeModal(modal);
			closeModal(modalThankyou);
			closeModal(modalError);
			unlock();
		});
	});

	overlayModal.addEventListener('click', (e) => {
		if (e.target === overlayModal) {
			closeModal(overlayModal);
			closeModal(modal);
			closeModal(modalThankyou);
			closeModal(modalError);
			unlock();
		}
	});

}

export default modal;
export {
	closeModal,
	openModal
};
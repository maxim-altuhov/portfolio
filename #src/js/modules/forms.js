import {
	closeModal,
	openModal
} from './modal';

function forms({
	formName,
	IdPassword,
	IdPasswordConf,
	overlay,
	modalName,
	thankyou,
	error,
	uploadFile,
	submitButton
}) {

	//Основной блок настройки валидации
	let isSubmit = true;

	const forms = document.querySelectorAll(formName),
		pass = document.querySelector(IdPassword),
		passConf = document.querySelector(IdPasswordConf),
		regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
		regExpName = /[a-z а-яё]/ig,
		regExpPhone = /^([+]?[0-9\s-\(\)]{3,25})*$/i,
		regExpPass = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

	const validate = (elem) => {

		if (elem.hasAttribute('data-valid') && elem.type !== "checkbox") {

			if (elem.value == "") {
				elem.style.border = '0.5px solid #a33737';
				elem.nextElementSibling.textContent = 'Поле обязательно для заполнения';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "name" && elem.hasAttribute('data-valid')) {

			if (!regExpName.test(elem.value) || elem.value == "") {
				elem.style.border = '0.5px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите ваше имя';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "phone" && elem.hasAttribute('data-valid')) {

			if (!regExpPhone.test(elem.value) || elem.value == "") {
				elem.style.border = '0.5px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите корректный телефон';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "email" && elem.hasAttribute('data-valid')) {

			if (!regExpEmail.test(elem.value) || elem.value == "") {
				elem.style.border = '0.5px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите корректный e-mail адрес';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "textForm" && elem.hasAttribute('data-valid')) {

			if (elem.value === "") {
				elem.style.border = '0.5px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите сообщение в форму';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "password" && elem.hasAttribute('data-valid')) {

			if (!regExpPass.test(elem.value) || elem.value == "") {
				elem.nextElementSibling.textContent = "Введите корректный пароль";
				elem.style.border = '0.5px solid #a33737';
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

		if (elem.name === "password-conf" && elem.hasAttribute('data-valid')) {

			if (passConf.value !== pass.value) {
				elem.style.border = '0.5px solid #a33737';
				passConf.nextElementSibling.textContent = "Пароли не совпадают";
				isSubmit = false;
			} else {
				elem.style.border = '';
				passConf.nextElementSibling.textContent = "";
				isSubmit = true;
			}

		}

	};

	const checked = (elem) => {

		if (elem.type === "checkbox" && elem.hasAttribute('data-valid')) {
			if (elem.value === "") {
				isSubmit = false;
			} else {
				elem.nextElementSibling.classList.remove('error__before');
				isSubmit = true;
			}
		}

		if (elem.type === "file" && elem.hasAttribute('data-valid')) {
			if (elem.value === "") {
				elem.previousElementSibling.style.cssText = 'color:#a33737; font-weight: 700;';
				isSubmit = false;
			} else {
				elem.previousElementSibling.style.cssText = '';
				isSubmit = true;
			}
		}

	};

	forms.forEach((form) => {

		for (let elem of form.elements) {

			if (elem.tagName != "BUTTON") {
				elem.addEventListener("blur", () => {
					validate(elem);
				});
			}

			if (elem.type === "checkbox" || elem.type === "file") {
				elem.addEventListener("change", () => {
					checked(elem);
				});
			}

		}

	});

	//Блок отправки формы + валидация
	const overlayModal = document.querySelector(overlay),
		modal = document.querySelector(modalName),
		modalThankyou = document.querySelector(thankyou),
		modalError = document.querySelector(error),
		upload = document.querySelector(uploadFile);

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			// headers: {
			// 	'Content-type': 'application/json'
			// },
			body: data
		});

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
		// return await res.text();
	};


	const clearForm = () => {
		forms.forEach(item => {
			item.reset();
		});

		if (upload) {
			upload.previousElementSibling.textContent = "Файл не выбран";
		}
	};

	const checkUploadFile = (file) => {

		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			upload.value = '';
			upload.previousElementSibling.textContent = 'Разрешены только изображения';

			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			upload.value = '';
			upload.previousElementSibling.textContent = 'Файл должен быть менее 2Мб';
			return;
		}

	};

	if (upload) {
		upload.addEventListener("change", () => {
			let dots;

			if (upload.files[0] !== undefined) {
				const arr = upload.files[0].name.split('.');

				arr[0].length > 6 ? dots = "..." : dots = '.';
				const name = arr[0].substring(0, 6) + dots + arr[1];
				upload.previousElementSibling.textContent = name;

				//проверяем разрешение файла и его размер(2мб)
				checkUploadFile(upload.files[0]);
			} else {
				upload.previousElementSibling.textContent = 'Файл не выбран';
			}

		});
	}

	forms.forEach((form) => {
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			for (let elem of form.elements) {

				if (elem.tagName != "BUTTON" && elem.value === "" && elem.type !== "file" && elem.hasAttribute('data-valid')) {
					elem.style.border = '0.5px solid #a33737';
					elem.nextElementSibling.textContent = 'Поле обязательно для заполнения';
					isSubmit = false;
				} else if (elem.type === "file" && elem.value === "" && elem.hasAttribute('data-valid')) { //условие для инпута с файлом, т.к. он имеет другую структуру
					elem.previousElementSibling.style.cssText = 'color:#a33737; font-weight: 700;';
					isSubmit = false;
				} else if (elem.type === "checkbox" && !elem.checked && elem.hasAttribute('data-valid')) { //условие для инпута с чекбоксом
					elem.nextElementSibling.classList.add('error__before');
					isSubmit = false;
				}

			}

			const btnSubmit = form.querySelector(submitButton);

			if (isSubmit == true) {

				const btnText = btnSubmit.textContent;
				btnSubmit.textContent = 'Подождите...';
				btnSubmit.setAttribute('disabled', true);
				const formData = new FormData(form);

				postData('mailer/sendmail.php', formData)
					.then(() => {
						clearForm();
						closeModal(modal);
						openModal(overlayModal);
						openModal(modalThankyou);
					})
					.catch(() => {
						closeModal(modal);
						openModal(overlayModal);
						openModal(modalError);
					})
					.finally(() => {
						btnSubmit.removeAttribute('disabled');
						btnSubmit.textContent = btnText;
					});
			}
		});
	});

}

export default forms;
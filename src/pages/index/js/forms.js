function forms({
	formName,
	submitButton
}) {

	//Основной блок настройки валидации
	let isSubmit = true;

	const forms = document.querySelectorAll(formName),
		regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
		regExpName = /[a-z а-яё]/ig;

	const validate = (elem) => {

		if (elem.name === "name" && elem.hasAttribute('data-valid')) {

			if (!regExpName.test(elem.value) || elem.value == "") {
				elem.style.border = '1px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите ваше имя';
				elem.previousElementSibling.classList.add('error');
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				elem.previousElementSibling.classList.remove('error');
				isSubmit = true;
			}

		}

		if (elem.name === "email" && elem.hasAttribute('data-valid')) {

			if (!regExpEmail.test(elem.value) || elem.value == "") {
				elem.style.border = '1px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите корректный e-mail адрес';
				elem.previousElementSibling.classList.add('error');
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				elem.previousElementSibling.classList.remove('error');
				isSubmit = true;
			}

		}

		if (elem.name === "textform" && elem.hasAttribute('data-valid')) {

			if (elem.value === "") {
				elem.style.border = '1px solid #a33737';
				elem.nextElementSibling.textContent = 'Введите сообщение в форму';
				elem.previousElementSibling.classList.add('error');
				isSubmit = false;
			} else {
				elem.style.border = '';
				elem.nextElementSibling.textContent = "";
				elem.previousElementSibling.classList.remove('error');
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

		}

	});

	//Блок отправки формы + валидация
	const status = document.querySelector('.status'),
		message = {
			ok: 'Сообщение отправлено',
			error: 'Ошибка отправки'
		};

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
	};

	forms.forEach((form) => {
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			for (let elem of form.elements) {

				if (elem.tagName != "BUTTON" && elem.value === "" && elem.type !== "file" && elem.hasAttribute('data-valid')) {
					elem.style.border = '0.5px solid #a33737';
					elem.nextElementSibling.textContent = 'Поле обязательно для заполнения';
					elem.previousElementSibling.classList.add('error');
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
						status.classList.add('status_ok');
						status.textContent = message.ok;
					})
					.catch(() => {
						status.classList.add('status_error');
						status.textContent = message.error;
					})
					.finally(() => {
						btnSubmit.removeAttribute('disabled');
						btnSubmit.textContent = btnText;
						setTimeout(() => {
							status.classList.remove('status_ok');
							status.classList.remove('status_error');
							status.textContent = '';
						}, 2000);
					});
			}
		});
	});

}

export default forms;
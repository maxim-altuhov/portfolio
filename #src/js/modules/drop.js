const drop = (uploadFile) => {
	// drag *
	// dragend *
	// dragenter - объект над dropArea
	// dragexit *
	// dragleave - объект за пределами dropArea
	// dragover - объект зависает над dropArea
	// dragstart *
	// drop - объект отправлен в dropArea

	const fileInputs = document.querySelector(uploadFile);

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight(item) {
		item.closest('.file-upload').style.backgroundColor = "#e0e0e0a1";
	}

	function unhighlight(item) {
		item.closest('.file-upload').style.backgroundColor = "";
	}

	if (fileInputs) {

		['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
			fileInputs.addEventListener(eventName, preventDefaults, false);
		});


		['dragenter', 'dragover'].forEach(eventName => {
			fileInputs.addEventListener(eventName, () => highlight(fileInputs), false);
		});

		['dragleave', 'drop'].forEach(eventName => {
			fileInputs.addEventListener(eventName, () => unhighlight(fileInputs), false);
		});

		const checkUploadFile = (file) => {
			if (!['image/jpeg', 'image/png'].includes(file.type)) {
				fileInputs.value = '';
				fileInputs.previousElementSibling.textContent = 'Разрешены только изображения';
				return;
			}
			if (file.size > 2 * 1024 * 1024) {
				fileInputs.value = '';
				fileInputs.previousElementSibling.textContent = 'Файл должен быть менее 2Мб';
				return;
			}
			if (fileInputs.files.length > 1) {
				fileInputs.value = '';
				fileInputs.previousElementSibling.textContent = 'Выберите только один файл';
				return;
			}
		};



		fileInputs.addEventListener('drop', (e) => {
			fileInputs.files = e.dataTransfer.files;
			let dots;
			if (fileInputs.files[0] !== undefined) {
				const arr = fileInputs.files[0].name.split('.');

				arr[0].length > 6 ? dots = "..." : dots = '.';
				const name = arr[0].substring(0, 6) + dots + arr[1];
				fileInputs.previousElementSibling.textContent = name;

				//проверяем разрешение файла и его размер(2мб)
				checkUploadFile(fileInputs.files[0]);
			} else {
				fileInputs.previousElementSibling.textContent = 'Файл не выбран';
			}
		});

	}

};

export default drop;
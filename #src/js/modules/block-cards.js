function blockCards() {

	class WorkCards {
		constructor(href, webp, src, alt, descr, parent, ...classes) {
			this.href = href;
			this.webp = webp;
			this.src = src;
			this.alt = alt;
			this.descr = descr;
			this.parent = document.querySelector(parent);
			this.classes = classes;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'works__wrapper-block';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(nameClass => element.classList.add(nameClass));
			}

			element.innerHTML = `<div class="works__element">
			<a href=${this.href} target="_blank">
			<picture>
			<source srcset=${this.webp} type="image/webp">
			<img src=${this.src} alt=${this.alt}>
			</picture>
				</a>
		</div>
		<div class="works__descr">${this.descr}</div>`;

			this.parent.append(element);

			setTimeout(() => {
				this.parent.classList.add('animation');
			});
		}
	}

	const getRes = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetsh ${url}, status ${res.status}`);
		}

		return await res.json();
	};

	function startRender(url, number, numberPage = 1) {
		getRes(url)
			.then(data => {
				data.forEach(({
					href,
					webp,
					src,
					alt,
					descr,
					parent
				}, i) => {
					if (numberPage == 1 && i <= number - 1) {
						new WorkCards(href, webp, src, alt, descr, parent).render();
					} else if (numberPage == 2 && i > number - 1 && i <= (number * numberPage) - 1) {
						new WorkCards(href, webp, src, alt, descr, parent).render();
					}
				});
			});
	}

	startRender('./files/works.json', 9);
	startRender('./files/works-other.json', 9);

	function deleteWorks() {
		const wrapperBlock = document.querySelectorAll('.works__wrapper');

		wrapperBlock.forEach((elem) => {
			elem.classList.remove('animation');
			const array = [...elem.children];
			array.forEach((item) => {
				item.remove();
			});
		});
	}

	const workPages = document.querySelectorAll('.works__page');

	workPages.forEach((elem) => {
		elem.addEventListener('click', (e) => {

			if (e.target && e.target.tagName == "SPAN") {
				const numberPage = +e.target.textContent;

				if (!e.target.classList.contains('page_active')) {
					deleteWorks();
					startRender('./files/works.json', 9, numberPage);
					startRender('./files/works-other.json', 9);
				}

				elem.children.forEach((item) => {
					item.classList.remove('page_active');
				});
				e.target.classList.add('page_active');
			}

		});
	});

}

export default blockCards;
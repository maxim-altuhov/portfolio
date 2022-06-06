function blockCards() {

  const MAX_NUMBER_PAGES = 9;

  const blocksSait = document.querySelector('#tab1'),
    blocksOther = document.querySelector('#tab2'),
    pageBlockSait = document.querySelector('#pageBlock1'),
    pageBlockOther = document.querySelector('#pageBlock2'),
    loader = document.querySelectorAll('.works__loading'),
    worksPage = document.querySelectorAll('.works__page');

  //класс для карточки блоков
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

      element.insertAdjacentHTML('afterbegin', `<div class="works__element">
			<a href=${this.href} target="_blank" rel="noopener noreferrer">
			<picture>
			<source srcset=${this.webp} type="image/webp">
			<img src=${this.src} alt=${this.alt}>
			</picture>
			</a>
			</div>
			<div class="works__descr">${this.descr}</div>`);

      this.parent.insertAdjacentElement('beforeend', element);
      loader.forEach((elem) => {
        elem.style.display = 'none';
      });

      setTimeout(() => {
        this.parent.classList.add('animation');
      });
    }
  }

  //получаем данные из файла json
  const getRes = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetsh ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  //рендер карточек и пагинации в зависимости от условий
  function startRender(url, selectorPages, numberPage = 1) {
    getRes(url)
      .then(data => {

        function createPage(indexPagesSait, pageBlock) {
          for (let i = 1; i <= indexPagesSait; i++) {
            let page = document.createElement('span');
            page.classList.add('page');
            pageBlock.append(page);
            page.textContent = i;
          }
          pageBlock.firstElementChild.classList.add('page_active');
        }

        try {

          if (selectorPages.getAttribute('id') == 'tab1') {

            let i = data.length,
              indexPagesSait = Math.ceil(i / MAX_NUMBER_PAGES);
            if (indexPagesSait !== 1) {
              createPage(indexPagesSait, pageBlockSait);
            }
          }

          if (selectorPages.getAttribute('id') == 'tab2') {

            let i = data.length,
              indexPagesSait = Math.ceil(i / MAX_NUMBER_PAGES);
            if (indexPagesSait !== 1) {
              createPage(indexPagesSait, pageBlockOther);
            }
          }

        } catch (error) {}

        data.forEach(({
          href,
          webp,
          src,
          alt,
          descr,
          parent
        }, i) => {
          if (numberPage == 1 && i <= MAX_NUMBER_PAGES - 1) {
            new WorkCards(href, webp, src, alt, descr, parent).render();
          } else if (numberPage == 2 && i > MAX_NUMBER_PAGES - 1 && i <= (MAX_NUMBER_PAGES * numberPage) - 1) {
            new WorkCards(href, webp, src, alt, descr, parent).render();
          } else if (i > (MAX_NUMBER_PAGES * (numberPage - 1)) - 1 && i <= (MAX_NUMBER_PAGES * numberPage) - 1) {
            new WorkCards(href, webp, src, alt, descr, parent).render();
          }
        });
      });
  }

  startRender('./files/works.json', blocksSait);
  startRender('./files/works-other.json', blocksOther);

  //функция удаления блоков
  function deleteWorks(selector) {
    loader.forEach((elem) => {
      elem.style.display = 'flex';
    });
    selector.classList.remove('animation');
    const array = [...selector.children];
    array.forEach((item) => {
      item.remove();
    });
  }

  // навешиваем события клика, переключение страниц
  worksPage.forEach((elem) => {
    elem.addEventListener('click', (e) => {

      if (e.target && e.target.tagName == "SPAN") {
        const numberPage = +e.target.textContent;

        if (!e.target.classList.contains('page_active') && e.currentTarget == pageBlockSait) {
          deleteWorks(blocksSait);
          startRender('./files/works.json', null, numberPage);
        } else if (!e.target.classList.contains('page_active') && e.currentTarget == pageBlockOther) {
          deleteWorks(blocksOther);
          startRender('./files/works-other.json', null, numberPage);
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

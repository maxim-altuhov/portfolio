import { useHttp } from '@services/useHttp';
import '@json/works.json';

function renderCards() {
  const { request } = useHttp();

  const URL = './json/works.json';
  const MAX_CARDS_FOR_PAGE = 9;
  const style = {
    WORKS_BLOCK: 'works__wrapper-block',
    PAGE: 'works__page',
    TAB_ACTIVE: 'works__tab-item_active',
    PAGE_ACTIVE: 'works__page_active',
  };

  const loader = document.querySelector('.js-works__loading');
  const navBlock = document.querySelector('.js-works__nav');
  const blockForRendering = document.querySelector('.js-works__wrapper');
  const tabElements = document.querySelectorAll('.js-works__tab-item');
  const activeTab = document.querySelector('.js-works__tab-item_active');
  const fragmentWithCards = document.createDocumentFragment();
  const fragmentWithPage = document.createDocumentFragment();
  let currentTarget = activeTab.dataset.target;

  const createCards = (objWithCard) => {
    const {
      href,
      src,
      alt,
      descr,
    } = objWithCard;
    const card = document.createElement('div');
    card.classList.add(style.WORKS_BLOCK);

    const HTMLBlock = `
      <a class="works__element" href=${href} target="_blank" rel="noopener noreferrer">
        <img src=${src} alt=${alt}>
      </a>
      <div class="works__descr">${descr}</div>
    `;

    card.insertAdjacentHTML('afterbegin', HTMLBlock);
    fragmentWithCards.append(card);
  };

  const createPage = (totalCards) => {
    navBlock.innerHTML = '';
    const numOfPages = Math.ceil(totalCards / MAX_CARDS_FOR_PAGE);

    if (numOfPages !== 1) {
      for (let num = 1; num <= numOfPages; num++) {
        const page = document.createElement('button');
        page.classList.add(style.PAGE);
        page.textContent = num;

        if (num === 1) page.classList.add(style.PAGE_ACTIVE);

        fragmentWithPage.append(page);
      }
    }
  };

  const initRequest = (page = 1, useCreatePage = true, targetRequest = currentTarget) => {
    loader.style.display = '';
    blockForRendering.innerHTML = '';

    request(URL)
      .then((data) => {
        const upLimit = MAX_CARDS_FOR_PAGE * page;
        const downLimit = (MAX_CARDS_FOR_PAGE * page) - MAX_CARDS_FOR_PAGE;
        const checkerLimitRender = (index) => (index >= downLimit && index + 1 <= upLimit);

        data[targetRequest].map((elem, index) => {
          if (checkerLimitRender(index)) createCards(elem);

          return false;
        });

        if (useCreatePage) createPage(data[targetRequest].length);
      })
      .then(() => {
        loader.style.display = 'none';
        blockForRendering.append(fragmentWithCards);
        navBlock.append(fragmentWithPage);
      })
      .catch((err) => {
        loader.style.display = 'none';
        navBlock.textContent = 'Ошибка загрузки данных!';
        throw new Error(`Could not fetch, status: ${err}`);
      });
  };

  const setEventForTabs = () => {
    tabElements.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        if (!e.target.classList.contains(style.TAB_ACTIVE)) {
          tabElements.forEach((elem) => {
            elem.classList.remove(style.TAB_ACTIVE, `js-${style.TAB_ACTIVE}`);
          });

          e.target.classList.add(style.TAB_ACTIVE, `js-${style.TAB_ACTIVE}`);
          currentTarget = e.target.dataset.target;

          initRequest(1, true, currentTarget);
        }
      });
    });
  };

  const setEventForNav = () => {
    navBlock.addEventListener('click', (e) => {
      if (
        e.target.classList.contains(style.PAGE)
        && !e.target.classList.contains(style.PAGE_ACTIVE)
      ) {
        [...navBlock.children].forEach((elem) => {
          elem.classList.remove(style.PAGE_ACTIVE);
        });

        e.target.classList.add(style.PAGE_ACTIVE);
        initRequest(Number(e.target.textContent), false);
      }
    });
  };

  setEventForTabs();
  setEventForNav();
  initRequest();
}

export default renderCards;

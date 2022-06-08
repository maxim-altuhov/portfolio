import { useHttp } from '../../../services/useHttp';

function renderCards() {
  const MAX_CARDS_FOR_PAGE = 9;
  const loader = document.querySelector('.js-works__loading');
  const navBlock = document.querySelector('.js-works__nav');
  const blockForRendering = document.querySelector('.js-works__wrapper');
  const tabElements = document.querySelectorAll('.js-works__tab-item');
  const targetRequest = document.querySelector('.works__tab-item_active').dataset.target;
  const fragmentWithCards = document.createDocumentFragment();
  const fragmentWithPage = document.createDocumentFragment();
  const { request } = useHttp();

  const createCards = (objWithCard) => {
    const {
      href,
      src,
      alt,
      descr,
    } = objWithCard;
    const card = document.createElement('div');
    card.classList.add('works__wrapper-block');

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
        const page = document.createElement('span');
        page.classList.add('works__page');
        page.textContent = num;

        if (num === 1) page.classList.add('works__page_active');

        fragmentWithPage.append(page);
      }
    }
  };

  const initRequest = (page = 1, useCreatePage = true, target = 'web') => {
    loader.style.display = '';
    blockForRendering.innerHTML = '';

    request(`http://localhost:3000/${target}`)
      .then((data) => {
        const upLimitRender = MAX_CARDS_FOR_PAGE * page;
        const downLimitRender = (MAX_CARDS_FOR_PAGE * page) - MAX_CARDS_FOR_PAGE;
        const isRenderedCard = (index) => (index >= downLimitRender && index + 1 <= upLimitRender);

        data.map((elem, index) => {
          if (isRenderedCard(index)) createCards(elem);

          return false;
        });

        if (useCreatePage) createPage(data.length);
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
        if (!e.target.classList.contains('works__tab-item_active')) {
          tabElements.forEach((elem) => {
            elem.classList.remove('works__tab-item_active');
          });

          e.target.classList.add('works__tab-item_active');
          initRequest(1, true, e.target.dataset.target);
        }
      });
    });
  };

  const setEventForNav = () => {
    navBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('works__page') && !e.target.classList.contains('works__page_active')) {
        [...navBlock.children].forEach((elem) => {
          elem.classList.remove('works__page_active');
        });

        e.target.classList.add('works__page_active');
        initRequest(Number(e.target.textContent), false);
      }
    });
  };

  setEventForTabs();
  setEventForNav();
  initRequest(1, true, targetRequest);
}

export default renderCards;

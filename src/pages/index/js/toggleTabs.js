function toggleTabs() {
  const tabsElements = document.querySelectorAll('.js-works__tab-item');

  tabsElements.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      tabsElements.forEach((elem) => {
        elem.classList.remove('works__tab-item_active');
      });

      e.target.classList.add('works__tab-item_active');
    });
  });
}

export default toggleTabs;

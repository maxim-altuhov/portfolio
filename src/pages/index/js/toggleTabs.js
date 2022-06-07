function toggleTabs() {
  const tabsElements = document.querySelectorAll('.js-works__tab-item');
  const workBody = document.querySelectorAll('.js-works__tab-body');

  tabsElements.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      if (!tab.classList.contains('works__tab-item_active')) {
        workBody.forEach((elem) => {
          elem.classList.toggle('works__tab-body_active');
        });
      }

      tabsElements.forEach((elem) => {
        elem.classList.remove('works__tab-item_active');
      });

      e.target.classList.add('works__tab-item_active');
    });
  });
}

export default toggleTabs;

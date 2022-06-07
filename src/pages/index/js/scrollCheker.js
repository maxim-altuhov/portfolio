function scrollCheker() {
  const pageUp = document.querySelector('.js-pageup');
  const offsetTarget = 800;

  const handlePageupScroll = () => {
    const scrollValue = Math.round(window.pageYOffset || document.documentElement.scrollTop);

    if (scrollValue >= offsetTarget) {
      pageUp.classList.add('pageup_show');
    } else {
      pageUp.classList.remove('pageup_show');
    }
  };

  window.addEventListener('scroll', handlePageupScroll);
}

export default scrollCheker;

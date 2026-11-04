/* Hlulani Digital Solutions - shared navigation behaviour (Part 3) */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.primary-navigation');

  if (toggle && navigation) {
    toggle.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? 'Close menu' : 'Menu';
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a') && window.matchMedia('(max-width: 760px)').matches) {
        navigation.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-navigation a[data-page]').forEach(function (link) {
    if (link.dataset.page === currentFile) {
      link.setAttribute('aria-current', 'page');
    }
  });
});

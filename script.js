/* Hlulani Digital Solutions - navigation and Part 3 interactions */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.primary-navigation');
  if (toggle && navigation) {
    toggle.addEventListener('click', function () {
      const open = navigation.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close menu' : 'Menu';
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
    if (link.dataset.page === currentFile) link.setAttribute('aria-current', 'page');
  });

  // Services search and category filter
  const search = document.getElementById('service-search');
  const filter = document.getElementById('service-filter');
  const serviceItems = Array.from(document.querySelectorAll('.service-item'));
  const count = document.getElementById('service-count');
  function filterServices() {
    if (!search || !filter) return;
    const term = search.value.trim().toLowerCase();
    const category = filter.value;
    let visible = 0;
    serviceItems.forEach(function (item) {
      const matchesText = (item.dataset.search + ' ' + item.textContent).toLowerCase().includes(term);
      const matchesCategory = category === 'all' || item.dataset.category === category;
      const show = matchesText && matchesCategory;
      item.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = 'Showing ' + visible + ' of ' + serviceItems.length + ' services.';
  }
  if (search) search.addEventListener('input', filterServices);
  if (filter) filter.addEventListener('change', filterServices);

  // Image gallery lightbox
  const galleryButtons = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  let galleryIndex = 0;
  function showGalleryImage(index) {
    if (!galleryButtons.length || !lightbox) return;
    galleryIndex = (index + galleryButtons.length) % galleryButtons.length;
    const button = galleryButtons[galleryIndex];
    const thumb = button.querySelector('img');
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = thumb ? thumb.alt : 'Gallery image';
    caption.textContent = lightboxImage.alt + ' (' + (galleryIndex + 1) + ' of ' + galleryButtons.length + ')';
  }
  function closeLightbox() {
    if (lightbox) lightbox.hidden = true;
  }
  galleryButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      showGalleryImage(index);
      lightbox.hidden = false;
      lightbox.querySelector('.lightbox-close').focus();
    });
  });
  if (lightbox) {
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { showGalleryImage(galleryIndex - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { showGalleryImage(galleryIndex + 1); });
    lightbox.addEventListener('click', function (event) { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (event) {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
      if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
    });
  }

  // Prefill service when a visitor follows an enquiry link from Services.
  const serviceSelect = document.getElementById('service');
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (serviceSelect && requestedService) {
    Array.from(serviceSelect.options).forEach(function (option) {
      if (option.text.trim().toLowerCase() === requestedService.trim().toLowerCase()) {
        serviceSelect.value = option.value;
      }
    });
  }

  // Accessible client-side validation and email-compose submission.
  // Static hosting has no server-side inbox; this opens the visitor's email app.
  document.querySelectorAll('.js-mail-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (!form.reportValidity()) {
        if (feedback) feedback.textContent = 'Please check the highlighted fields and complete the form.';
        return;
      }
      const data = new FormData(form);
      const isEnquiry = form.dataset.formType === 'enquiry';
      const subject = isEnquiry ? 'HDS Website Enquiry - ' + data.get('service') : 'HDS Website Contact - ' + data.get('subject');
      const bodyLines = [
        'Name: ' + data.get('name'),
        'Email: ' + data.get('email'),
        data.get('phone') ? 'Phone: ' + data.get('phone') : '',
        isEnquiry ? 'Service: ' + data.get('service') : '',
        isEnquiry ? 'Enquiry type: ' + data.get('enquiryType') : '',
        '',
        'Message:',
        data.get('message')
      ].filter(function (line) { return line !== ''; });
      const mailto = 'mailto:HlulaniNdlovu23@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
      if (feedback) feedback.textContent = 'Your email application should open with your details. Review the message and press Send to submit it to HDS.';
      window.location.href = mailto;
    });
  });
});

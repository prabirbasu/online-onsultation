(() => {
  'use strict';
  document.documentElement.classList.add('js');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile disclosure menu. Without JavaScript the links simply wrap below the brand.
  const menuButton = document.querySelector('.menu-button');
  const nav = document.getElementById('site-nav');
  const mobile = window.matchMedia('(max-width: 760px)');
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  menuButton.hidden = false;
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuButton.focus(); }
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('is-open') && !event.target.closest('.header-inner')) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));

  // Sticky mobile booking bar: after the hero, hidden near the final booking
  // section and while an expanded story or FAQ answer is being read.
  const hero = document.getElementById('hero');
  const finalSection = document.getElementById('book');
  const sticky = document.getElementById('mobile-booking');
  const expandable = document.querySelectorAll('.faq-list details, .story-details');
  function updateSticky() {
    const heroPassed = hero.getBoundingClientRect().bottom <= 0;
    const finalVisible = finalSection.getBoundingClientRect().top < window.innerHeight;
    const readingAnswer = [...expandable].some(detail => {
      if (!detail.open) return false;
      const rect = detail.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    sticky.hidden = !mobile.matches || !heroPassed || finalVisible || readingAnswer;
  }
  window.addEventListener('scroll', updateSticky, {passive:true});
  window.addEventListener('resize', updateSticky, {passive:true});
  expandable.forEach(detail => detail.addEventListener('toggle', updateSticky));
  window.addEventListener('pageshow', updateSticky);
  updateSticky();

  // Local hooks only. No analytics SDK, network request, identifiers, symptoms,
  // query strings, form data, or storage. Booking events need provider integration.
  function emit(name, placement) {
    const detail = placement ? {name, placement} : {name};
    window.dispatchEvent(new CustomEvent('consultation:measurement', {detail}));
  }
  document.querySelectorAll('[data-booking]').forEach(link => {
    link.addEventListener('click', () => emit('primary_cta_click', link.dataset.booking));
  });
  emit('page_view');
})();

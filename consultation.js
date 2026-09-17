(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const hero = document.getElementById('hero');
  const finalSection = document.getElementById('book');
  const sticky = document.getElementById('mobile-booking');
  const mobile = window.matchMedia('(max-width: 760px)');
  function updateSticky() {
    const heroPassed = hero.getBoundingClientRect().bottom <= 0;
    const finalVisible = finalSection.getBoundingClientRect().top < window.innerHeight;
    const readingAnswer = [...document.querySelectorAll('.faq-list details[open]')].some(detail => {
      const rect = detail.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    });
    sticky.hidden = !mobile.matches || !heroPassed || finalVisible || readingAnswer;
  }
  window.addEventListener('scroll', updateSticky, {passive:true});
  window.addEventListener('resize', updateSticky, {passive:true});
  document.querySelectorAll('.faq-list details').forEach(detail => detail.addEventListener('toggle', updateSticky));
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

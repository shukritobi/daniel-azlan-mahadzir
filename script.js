(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
    header?.classList.toggle('scrolled', scrollTop > 16);
  };

  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-delay]').forEach((element) => {
    element.style.setProperty('--delay', `${element.dataset.delay}ms`);
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
})();

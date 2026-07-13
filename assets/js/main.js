(() => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      mobileNav.hidden = !isOpen;
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileNav.hidden = true;
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal — progressive enhancement: content is visible by default
  // (see CSS), JS opts in to the hidden/animated state only once it can
  // guarantee every element will be revealed again.
  const revealTargets = document.querySelectorAll('.division-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-init');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  // Front-end-only forms: acknowledge submission without a backend
  document.querySelectorAll('.proposal-form, .newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      if (!button) return;
      const original = button.textContent;
      button.textContent = 'Received — thank you';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
        form.reset();
      }, 3000);
    });
  });
})();

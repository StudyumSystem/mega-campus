document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.remove('active'));
    });
  }

  // Navbar scroll shadow
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // Scroll fade-up
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Counter animation
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const end = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const inc = end / 50;
        const timer = setInterval(() => {
          cur += inc;
          if (cur >= end) { cur = end; clearInterval(timer); }
          el.textContent = Math.floor(cur).toLocaleString() + suffix;
        }, 25);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stats__number').forEach(el => counterObs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        const y = t.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Newsletter form
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button,a.hero__cta');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#22c55e';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2500);
      }
      form.reset();
    });
  });
});

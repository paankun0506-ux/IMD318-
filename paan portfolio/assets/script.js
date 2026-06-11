/* Y2K Portfolio — shared JS */
(function () {
  'use strict';

  // ============ Preloader ============
  window.addEventListener('load', function () {
    const pre = document.querySelector('.preloader');
    if (pre) setTimeout(() => pre.classList.add('hidden'), 600);
  });

  // ============ Theme toggle ============
  const themeKey = 'y2k-theme';
  const saved = localStorage.getItem(themeKey);
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  document.addEventListener('click', function (e) {
    const t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(themeKey, 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(themeKey, 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((b) => {
      b.innerHTML = isDark ? '☀️' : '🌙';
      b.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  updateThemeIcon();

  // ============ Hamburger ============
  document.addEventListener('click', function (e) {
    const h = e.target.closest('[data-hamburger]');
    if (h) {
      h.classList.toggle('open');
      document.querySelector('.nav-links')?.classList.toggle('open');
      return;
    }
    // close menu when clicking a link
    if (e.target.closest('.nav-links a')) {
      document.querySelector('[data-hamburger]')?.classList.remove('open');
      document.querySelector('.nav-links')?.classList.remove('open');
    }
  });

  // ============ Active link ============
  const path = location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // ============ Scroll reveal ============
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.reveal, .glitch, .chrome-sweep').forEach((el) => observer.observe(el));

  // ============ Back to top ============
  const backTop = document.querySelector('.back-top');
  window.addEventListener('scroll', () => {
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);
    const nav = document.querySelector('.navbar');
    if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.06)' : 'none';
  });
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ============ Counters ============
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(p * target).toLocaleString() + (el.dataset.suffix || '');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => counterObs.observe(el));

  // ============ Skill bars ============
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target;
      fill.style.width = (fill.dataset.level || '0') + '%';
      skillObs.unobserve(fill);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.skill-fill').forEach((el) => skillObs.observe(el));

  // ============ Carousel ============
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.children;
    const dots = carousel.querySelector('.carousel-dots');
    let idx = 0;
    for (let i = 0; i < slides.length; i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => go(i));
      dots.appendChild(b);
    }
    function go(n) {
      idx = n;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      [...dots.children].forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    setInterval(() => go((idx + 1) % slides.length), 5000);
  });

  // ============ Lightbox ============
  const lb = document.querySelector('.lightbox');
  const lbImg = lb?.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach((el) => {
    el.addEventListener('click', () => {
      if (!lb || !lbImg) return;
      lbImg.src = el.dataset.lightbox;
      lbImg.alt = el.querySelector('img')?.alt || 'Gallery image';
      lb.classList.add('open');
    });
  });
  lb?.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('lightbox-close')) lb.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lb?.classList.remove('open');
  });

  // ============ Parallax ============
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.backgroundPositionY = (-y * speed) + 'px';
      });
    }, { passive: true });
  }

  // ============ Form ============
  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const orig = btn.textContent;
      btn.textContent = 'Transmitting…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        form.reset();
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2200);
      }, 900);
    });
  });

  // Set current year
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
})();

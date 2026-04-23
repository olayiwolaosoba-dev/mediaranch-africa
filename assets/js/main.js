/* =====================================================
   MEDIARANCH AFRICA — INTERACTIONS
   ===================================================== */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.querySelector('.mr-loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('is-done');
      setTimeout(() => loader.remove(), 700);
    }, 700);
  });

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.mr-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.mr-nav-toggle');
  const menu = document.querySelector('.mr-mobile-menu');
  const closeBtn = document.querySelector('.mr-mobile-close');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.add('is-open'));
  }
  if (closeBtn && menu) {
    closeBtn.addEventListener('click', () => menu.classList.remove('is-open'));
  }
  document.querySelectorAll('.mr-mobile-menu a').forEach(a => {
    a.addEventListener('click', () => menu && menu.classList.remove('is-open'));
  });

  /* ---------- Custom cursor (desktop only) ---------- */
  if (window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    const cursor = document.createElement('div');
    cursor.className = 'mr-cursor';
    document.body.appendChild(cursor);

    let targetX = 0, targetY = 0, x = 0, y = 0;
    window.addEventListener('mousemove', e => { targetX = e.clientX; targetY = e.clientY; });
    const loop = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    const hoverTargets = 'a, button, .mr-work-tile, .mr-forte-card, .mr-res-card, .mr-service-tile, [data-cursor]';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) cursor.classList.remove('is-hover');
    });
  }

  /* ---------- Intersection reveal ---------- */
  const revealTargets = document.querySelectorAll('.mr-reveal, .mr-reveal-x, [data-stagger]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-inview'));
  }

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('.mr-counter');
  if (counters.length && 'IntersectionObserver' in window) {
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.to || '0');
        const duration = parseInt(el.dataset.duration || '1600', 10);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        const ease = t => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const val = target * ease(t);
          el.textContent = prefix + val.toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cIo.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cIo.observe(c));
  }

  /* ---------- Parallax (data-parallax) ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    const onScrollParallax = () => {
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${center * speed * -1}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    onScrollParallax();
  }

  /* ---------- Resource filters (Resources page) ---------- */
  const filters = document.querySelectorAll('.mr-res-filter');
  const resItems = document.querySelectorAll('[data-res-cat]');
  if (filters.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filters.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        resItems.forEach(item => {
          const show = cat === 'all' || item.dataset.resCat === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Work filters ---------- */
  const workFilters = document.querySelectorAll('.mr-work-filter');
  const workItems = document.querySelectorAll('[data-work-cat]');
  if (workFilters.length) {
    workFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        workFilters.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        workItems.forEach(item => {
          const cats = (item.dataset.workCat || '').split(',');
          const show = cat === 'all' || cats.includes(cat);
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Contact form (dummy submit) ---------- */
  const form = document.querySelector('#mr-contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent';
        btn.style.background = '#1b8f2e';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 2400);
      }, 900);
    });
  }

  /* ---------- Hero video fallback (if video fails) ---------- */
  document.querySelectorAll('.mr-hero-bg video').forEach(v => {
    v.addEventListener('error', () => { v.style.display = 'none'; });
  });

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.mr-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (href.length < 2) return;
    a.addEventListener('click', e => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();

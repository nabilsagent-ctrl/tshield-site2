/* ============================================================
   T-Shield — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── BURGER MENU ── */
  const burger     = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Accessibility: allow closing the mobile menu with the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ── NAV SCROLL SHADOW ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── HERO IMAGE ZOOM ── */
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    setTimeout(() => heroImg.classList.add('loaded'), 100);
  }

  /* ── SCROLL REVEAL ── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  const allReveals = document.querySelectorAll(revealSelectors);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.style.transitionDelay || 0) * 1000;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  allReveals.forEach(el => revealObserver.observe(el));

  /* ── PROCESS STEPS ── */
  document.querySelectorAll('.pstep').forEach(step => {
    step.addEventListener('click', () => {
      document.querySelectorAll('.pstep').forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── GENERIC COLLAPSIBLES (LONG-FORM CONTENT) ── */
  document.querySelectorAll('.collapsible-trigger').forEach(trigger => {
    const key = trigger.getAttribute('data-collapsible-toggle');
    const body = document.querySelector(`.collapsible-body[data-collapsible="${key}"]`);
    if (!body) return;

    const open = () => {
      trigger.classList.add('is-open');
      body.classList.add('is-open');
    };
    const close = () => {
      trigger.classList.remove('is-open');
      body.classList.remove('is-open');
    };

    // Start collapsed on load
    close();

    trigger.addEventListener('click', () => {
      const isOpen = trigger.classList.contains('is-open');
      if (isOpen) {
        close();
      } else {
        open();
      }
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');

      // Handle "back to top" links (e.g. href="#") safely
      if (!href || href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      let target;
      try {
        target = document.querySelector(href);
      } catch {
        // Invalid selector (e.g. malformed ID) – fail silently
        return;
      }

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sectionIds = ['about', 'surfaces', 'technology', 'applications', 'franchise', 'contact'];

  window.addEventListener('scroll', () => {
    let current = '';
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ── STAT COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll('.snum');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el  = entry.target;
      const raw = el.textContent.trim();

      // Skip non-numeric values
      if (raw === '∞' || raw === '0') return;

      const num    = parseFloat(raw);
      const suffix = raw.replace(/[\d.]/g, '');
      const duration = 1200;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(num * eased) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = raw; // ensure exact final value
        }
      };

      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  /* ── CONTACT FORM: IMPROVE SELECT READABILITY ── */
  const propertySelect = document.querySelector('#contact select.inp');
  if (propertySelect) {
    const updateSelectColor = () => {
      propertySelect.style.color = propertySelect.value ? 'var(--charcoal)' : 'var(--mid-gray)';
    };

    // Initialise on load
    updateSelectColor();

    // Update when the user chooses a property type
    propertySelect.addEventListener('change', updateSelectColor);
  }

});

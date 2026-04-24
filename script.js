/* ============================================================
   T-Shield — script.js
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   HubSpot tracking loader (NAB-215 — Snippet 1)
   Guarded on window.TOPAZ_HS_PORTAL_ID (set by /config.js at build
   time). When unset → no script injected, zero page weight.
   ────────────────────────────────────────────────────────────── */
(function installHubSpot() {
  if (typeof window === 'undefined') return;
  if (!window.TOPAZ_HS_PORTAL_ID) return;
  if (document.getElementById('hs-script-loader')) return;
  var s = document.createElement('script');
  s.id = 'hs-script-loader';
  s.async = true;
  s.defer = true;
  s.type = 'text/javascript';
  s.src = '//js.hs-scripts.com/' + window.TOPAZ_HS_PORTAL_ID + '.js';
  (document.head || document.documentElement).appendChild(s);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── BURGER MENU ── */
  const burger     = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let lastFocusedBeforeMenu = null;

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to the element that opened the menu, if still in the DOM
    if (lastFocusedBeforeMenu && document.contains(lastFocusedBeforeMenu)) {
      lastFocusedBeforeMenu.focus();
    }
  };

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      // Remember what was focused before opening, then move focus into the menu
      lastFocusedBeforeMenu = document.activeElement;
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Accessibility: allow closing the mobile menu with the Escape key and trap focus inside the menu when open
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
      return;
    }

    // Basic focus trap for the mobile menu when it is open
    if (event.key === 'Tab' && mobileMenu.classList.contains('open')) {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(',');

      const focusable = Array.from(mobileMenu.querySelectorAll(focusableSelectors))
        .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        // Shift+Tab on first element → wrap to last
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        // Tab on last element → wrap to first
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ── NAV SCROLL SHADOW ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── RESPONSIVE SAFETY: CLOSE MOBILE MENU ON DESKTOP RESIZE ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
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
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-a');

    if (!question) return;

    // Make questions keyboard-focusable and announce state to assistive tech
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');

    if (answer) {
      const id = answer.id || `faq-answer-${index + 1}`;
      answer.id = id;
      question.setAttribute('aria-controls', id);
    }

    const setExpanded = (isExpanded) => {
      question.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    };

    const toggle = () => {
      const isOpen = item.classList.contains('open');

      // Close all items and reset aria-expanded
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-item .faq-q').forEach(q => q.setAttribute('aria-expanded', 'false'));

      // Re-open clicked/activated item if it was previously closed
      if (!isOpen) {
        item.classList.add('open');
        setExpanded(true);
      }
    };

    // Initialise aria-expanded based on existing open state
    setExpanded(item.classList.contains('open'));

    question.addEventListener('click', toggle);

    // Keyboard support (Enter / Space)
    question.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
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
      trigger.setAttribute('aria-expanded', 'true');
      body.setAttribute('aria-hidden', 'false');
    };
    const close = () => {
      trigger.classList.remove('is-open');
      body.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      body.setAttribute('aria-hidden', 'true');
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

  /* ── HERO SPLIT PANELS: KEYBOARD ACTIVATION ── */
  // Allow Enter/Space to activate any element that looks like a custom button
  // (role="button" + tabindex="0") and already has an onclick handler.
  document.querySelectorAll('[role="button"][tabindex="0"][onclick]').forEach(el => {
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        // Delegate to the existing click handler so behaviour stays in one place
        el.click();
      }
    });
  });

  /* ── SMOOTH SCROLL (ACCOUNT FOR STICKY NAV) ── */
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

        // Compensate for the sticky nav + top bar so headings are not hidden
        const nav = document.getElementById('navbar');
        const topbar = document.querySelector('.topbar');
        const navHeight = nav ? nav.offsetHeight : 0;
        const topbarHeight = topbar ? topbar.offsetHeight : 0;
        const offset = navHeight + topbarHeight + 16; // small breathing room

        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const scrollTo = Math.max(targetTop - offset, 0);

        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK HIGHLIGHT (ON LOAD + SCROLL) ── */
  const sectionIds = ['about', 'surfaces', 'technology', 'applications', 'franchise', 'contact'];

  const updateActiveNav = () => {
    let current = '';

    // If the URL already contains a hash (e.g. /index.html#contact),
    // prefer that as the initial active section.
    const hash = window.location.hash && window.location.hash.replace('#', '');

    if (hash && sectionIds.includes(hash)) {
      current = hash;
    } else {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', isActive);

      // Improve accessibility: expose the active section to assistive tech
      if (isActive) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };

  // Run once on load (handles deep links) and then on scroll
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav);

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
    const rootStyles = getComputedStyle(document.documentElement);
    const colorSelected = rootStyles.getPropertyValue('--charcoal').trim() || '#2A2A2A';
    const colorPlaceholder = rootStyles.getPropertyValue('--mid-gray').trim() || '#CCCCCC';

    const updateSelectColor = () => {
      propertySelect.style.color = propertySelect.value ? colorSelected : colorPlaceholder;
    };

    // Initialise on load
    updateSelectColor();

    // Update when the user chooses a property type
    propertySelect.addEventListener('change', updateSelectColor);
  }

});

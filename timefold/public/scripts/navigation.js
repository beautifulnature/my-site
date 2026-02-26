(() => {
  const links = Array.from(document.querySelectorAll('[data-main-nav] [data-section-link]'));
  if (!links.length) return;

  const mobileButton = document.querySelector('[data-mobile-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const mobileBackdrop = document.querySelector('[data-mobile-backdrop]');
  let lastFocusedElement = null;

  /**
   * Returns focusable elements inside the mobile navigation panel.
   * @returns {HTMLElement[]}
   */
  const getFocusableMenuElements = () => {
    if (!mobileNav) return [];
    return Array.from(
      mobileNav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  };

  /**
   * Closes mobile navigation and restores focus to the previous element.
   * @returns {void}
   */
  const closeMobileMenu = () => {
    if (!mobileButton || !mobileNav) return;
    const wasOpen = !mobileNav.classList.contains('hidden');
    mobileNav.classList.add('hidden');
    mobileBackdrop?.classList.add('hidden');
    mobileButton.setAttribute('aria-expanded', 'false');
    if (wasOpen) {
      const focusTarget = lastFocusedElement instanceof HTMLElement ? lastFocusedElement : mobileButton;
      focusTarget.focus();
    }
  };

  /**
   * Initializes mobile menu behavior:
   * toggle button, backdrop close, outside click, Escape, and focus trap.
   * @returns {void}
   */
  const initMobileMenu = () => {
    if (!mobileButton || !mobileNav) return;

    mobileButton.addEventListener('click', () => {
      const isHidden = mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden', !isHidden);
      mobileBackdrop?.classList.toggle('hidden', !isHidden);
      mobileButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      if (isHidden) {
        lastFocusedElement = document.activeElement;
        const focusable = getFocusableMenuElements();
        focusable[0]?.focus();
      }
    });

    mobileBackdrop?.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (event) => {
      if (mobileNav.classList.contains('hidden')) return;
      if (event.key === 'Escape') closeMobileMenu();

      if (event.key === 'Tab') {
        const focusable = getFocusableMenuElements();
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const clickInsideButton = mobileButton.contains(target);
      const clickInsideMenu = mobileNav.contains(target);
      if (!clickInsideButton && !clickInsideMenu) closeMobileMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) closeMobileMenu();
    });
  };

  /**
   * Initializes section spy behavior for in-page nav links.
   * Keeps aria-current and active styles in sync with visible section/hash.
   * @returns {void}
   */
  const initSectionSpy = () => {
    const byId = new Map(
      links
        .map((link) => {
          const hash = link.getAttribute('href');
          if (!hash || !hash.startsWith('#')) return null;
          const section = document.querySelector(hash);
          return section ? [section.id, link] : null;
        })
        .filter(Boolean)
    );

    /**
     * Marks links for the active section id.
     * @param {string} id
     * @returns {void}
     */
    const setActive = (id) => {
      links.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
        link.classList.toggle('text-slate-900', isActive);
        link.classList.toggle('underline', isActive);
        link.classList.toggle('underline-offset-4', isActive);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.1, 0.3, 0.6] }
    );

    for (const id of byId.keys()) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    const initial = window.location.hash?.replace('#', '') || links[0].getAttribute('href')?.replace('#', '');
    if (initial) setActive(initial);

    window.addEventListener('hashchange', () => {
      const next = window.location.hash?.replace('#', '');
      if (next) setActive(next);
    });
  };

  initMobileMenu();
  initSectionSpy();
})();

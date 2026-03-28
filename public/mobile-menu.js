document.addEventListener('DOMContentLoaded', () => {
  const debugDiv = document.getElementById('script-debug');
  if (debugDiv) debugDiv.textContent = 'SCRIPT LOADED';
  const menuBtn = document.querySelector('[data-mobile-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileNav.classList.contains('hidden') && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileNav.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

// Retain sidebar open/close state using localStorage
let lastKey = null;

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');

  // Restore sidebar state
  if (sidebar && localStorage.getItem('sidebar-open') === 'false') {
    sidebar.classList.add('sidebar-hidden');
  }

  // Toggle sidebar with button
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-hidden');
      localStorage.setItem('sidebar-open', !sidebar.classList.contains('sidebar-hidden'));
    });
  }
});

// Keyboard shortcut (t+l) to toggle sidebar
// Also persists state
// (Retain original shortcut feature)
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  const sidebar = document.getElementById('sidebar');
  if (lastKey === 't' && key === 'l' && sidebar) {
    sidebar.classList.toggle('sidebar-hidden');
    localStorage.setItem('sidebar-open', !sidebar.classList.contains('sidebar-hidden'));
  }
  lastKey = key;
});
let lastKey = null;

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if (lastKey === 't' && key === 'l') {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        // Toggle the Tailwind `hidden` class
        sidebar.classList.toggle('hidden');
    }

    lastKey = key;
});
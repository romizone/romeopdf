(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('romeopdf-theme'); } catch (_) {}
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  const system = matchMedia('(prefers-color-scheme: light)');
  const isLight = () => root.dataset.theme ? root.dataset.theme === 'light' : system.matches;
  const sync = () => {
    const button = document.querySelector('.theme');
    if (!button) return;
    button.textContent = isLight() ? '☾' : '☀';
    button.setAttribute('aria-label', isLight() ? 'Aktifkan tema gelap' : 'Aktifkan tema terang');
    button.title = button.getAttribute('aria-label');
  };
  document.addEventListener('DOMContentLoaded', () => {
    sync();
    document.querySelector('.theme').addEventListener('click', () => {
      root.dataset.theme = isLight() ? 'dark' : 'light';
      try { localStorage.setItem('romeopdf-theme', root.dataset.theme); } catch (_) {}
      sync();
    });
    system.addEventListener('change', sync);
  });
})();

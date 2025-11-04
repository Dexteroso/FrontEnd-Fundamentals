function include(file, target) {
  fetch(file)
    .then(r => r.text())
    .then(html => document.querySelector(target).innerHTML = html)
}

include("header.html", "#header");
include("footer.html", "#footer");

// 1) Carga de parciales + callback al terminar
async function loadPartial(targetId, url, onDone) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const html = await fetch(url).then(r => r.text());
  el.innerHTML = html;
  if (typeof onDone === 'function') onDone();
}

// 2) Función que marca el item activo (nav-link + nav-link2 con href real)
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('#header .nav-item').forEach(li => {
    const a = li.querySelector('a[href]');    // SOLO los que tienen href
    if (!a) return;

    const linkFile = (a.getAttribute('href') || '').split('/').pop();
    const active =
      linkFile === current ||
      (current === '' && linkFile === 'index.html');

    li.classList.toggle('active', active);
    a.toggleAttribute('aria-current', active);
  });
}

// 3) Cargar header y footer; marcar activo DESPUÉS de inyectar el header
document.addEventListener('DOMContentLoaded', () => {
  loadPartial('header', 'header.html', setActiveNav);  // <- callback
  loadPartial('footer', 'footer.html');
});

// 4) Fallback por si ya tenías el header incrustado directo
window.addEventListener('load', setActiveNav);
function include(file, target) {
  fetch(file)
    .then(r => r.text())
    .then(html => document.querySelector(target).innerHTML = html)
}

include("header.html", "#header");
include("footer.html", "#footer");

// normaliza path para que netlify "/" sea igual a "index.html"
function normalizePath(p){
  if(p === '/' || p === '' || p === null || p === 'index') return 'index.html';
  return p.replace(/^\//,''); // quita slash inicial
}

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

  const current = normalizePath(location.pathname.split('/').pop());

  document.querySelectorAll('#header .nav-item').forEach(li => {
    const a = li.querySelector('a[href]');
    if (!a) return;

    const linkFile = normalizePath( (a.getAttribute('href') || '').split('/').pop() );

    const active = linkFile === current;

    li.classList.toggle('active', active);
    a.toggleAttribute('aria-current', active);
  });
}

// 3) Cargar header y footer; marcar activo DESPUÉS de inyectar el header
document.addEventListener('DOMContentLoaded', () => {
  loadPartial('header', 'header.html', setActiveNav);
  loadPartial('footer', 'footer.html');
});

// 4) Fallback por si ya tenías el header incrustado directo
window.addEventListener('load', setActiveNav);
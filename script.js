/* ═══════════════════════════════════════════
   PORTFOLIO DATA
   ▶ Replace each url: "#" with the direct YouTube link for that project
═══════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "BOND\n60 YEARS",
    tag: "Retrospective Supercut",
    cat: "supercut",
    url: "#",
    color: "#1a0808"
  },
  {
    title: "OSCARS\nSUPERCUT",
    tag: "Award Season Cut",
    cat: "supercut",
    url: "#",
    color: "#100c0e"
  },
  {
    title: "DAVID BOWIE\nRETROSPECTIVE",
    tag: "Artist Retrospective",
    cat: "supercut",
    url: "#",
    color: "#0e090e"
  },
  {
    title: "PROJECT\nBALLHAUSPLATZ",
    tag: "Documentary Trailer",
    cat: "trailer",
    url: "#",
    color: "#080c12"
  },
  {
    title: "WEIYENA",
    tag: "Film Trailer",
    cat: "trailer",
    url: "#",
    color: "#080e0a"
  },
  {
    title: "VOICES\nUPRISING",
    tag: "Documentary Trailer",
    cat: "trailer",
    url: "#",
    color: "#120809"
  },
  {
    title: "UNIVERSAL\nMUSIC REEL",
    tag: "Music Label Reel",
    cat: "reel",
    url: "#",
    color: "#09090e"
  },
  {
    title: "AUSTRIAN\nWORLD SUMMIT",
    tag: "Event Promo",
    cat: "reel",
    url: "#",
    color: "#080e09"
  }
];

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
(function () {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  const dot  = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .filter, .tile, .logo-slot').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
})();

/* ═══════════════════════════════════════════
   PORTFOLIO RENDER + FILTER
═══════════════════════════════════════════ */
const grid = document.getElementById('grid');

function renderPortfolio(filter) {
  grid.innerHTML = '';
  const visible = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === filter);

  visible.forEach((p, i) => {
    const a = document.createElement('a');
    a.className = 'tile reveal';
    a.href = p.url;
    if (p.url !== '#') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    a.style.setProperty('--tile-color', p.color);
    a.style.setProperty('--d', `${(i % 3) * 0.07}s`);
    a.setAttribute('role', 'listitem');
    a.setAttribute('aria-label', p.title.replace('\n', ' ') + ' — ' + p.tag);

    a.innerHTML = `
      <div class="tile-inner">
        <span class="tile-tag">${p.tag}</span>
        <h3 class="tile-title">${p.title.replace('\n', '<br>')}</h3>
      </div>
      <div class="tile-play" aria-hidden="true">
        <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor"><path d="M0 0l9 5.5L0 11z"/></svg>
      </div>
    `;

    grid.appendChild(a);
  });

  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    revealInViewport();
  });
}

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.cat);
  });
});

/* ═══════════════════════════════════════════
   SCROLL REVEAL — INTERSECTION OBSERVER
═══════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════
   NAV — SCROLL STATE
═══════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ═══════════════════════════════════════════
   MOBILE MENU TOGGLE
═══════════════════════════════════════════ */
const toggle    = document.getElementById('nav-toggle');
const navDrawer = document.getElementById('nav-drawer');

toggle.addEventListener('click', () => {
  const isOpen = navDrawer.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navDrawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
renderPortfolio('all');

function revealInViewport() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50) {
      el.classList.add('visible');
    }
  });
}
revealInViewport();
setTimeout(revealInViewport, 120);

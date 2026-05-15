/* ═══════════════════════════════════════════
   PORTFOLIO DATA
   ▶ Replace each url: "#" with the direct YouTube link for that project
   ▶ Replace tile-color hex with a subtle tint that fits the project's mood
═══════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "BOND\n60 YEARS",
    tag: "Retrospective Supercut",
    cat: "supercut",
    url: "#", // ▶ e.g. "https://youtu.be/XXXXXXXX"
    color: "#0e0d09"
  },
  {
    title: "OSCARS\nSUPERCUT",
    tag: "Award Season Cut",
    cat: "supercut",
    url: "#",
    color: "#0c0c0e"
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
    color: "#090c0e"
  },
  {
    title: "WEIYENA",
    tag: "Film Trailer",
    cat: "trailer",
    url: "#",
    color: "#0a0e0c"
  },
  {
    title: "VOICES\nUPRISING",
    tag: "Documentary Trailer",
    cat: "trailer",
    url: "#",
    color: "#0e0b09"
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
    color: "#0a0e09"
  }
];

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

  // Observe newly rendered tiles
  requestAnimationFrame(() => {
    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
renderPortfolio('all');

// Immediately reveal any .reveal elements already in the viewport
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

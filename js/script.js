// ============================================================
// SCRIPT.JS — Marcelo Viagens
// Funcionalidades e interações do site
// ============================================================

// ─── Hero: efeito de digitação ────────────────────────────
const typingEl = document.getElementById('hero-typing');

if (typingEl) {
  const phrases = [
    'Viajem com conforto',
    'Viagens saindo de Palmas',
    'Faça seu orçamento',
  ];

  const TYPE_MIN  = 55;   // ms por caractere ao digitar
  const TYPE_MAX  = 110;
  const DELETE_MS = 35;   // ms por caractere ao apagar
  const HOLD_MS   = 1800; // pausa com a frase completa
  const GAP_MS    = 500;  // pausa antes da próxima frase

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typingEl.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = phrase.slice(0, charIndex);

        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(tick, HOLD_MS);
          return;
        }
        setTimeout(tick, TYPE_MIN + Math.random() * (TYPE_MAX - TYPE_MIN));
      } else {
        charIndex--;
        typingEl.textContent = phrase.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, GAP_MS);
          return;
        }
        setTimeout(tick, DELETE_MS);
      }
    };

    setTimeout(tick, 600);
  }
}

// ─── Ano dinâmico no footer ───────────────────────────────
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ─── Header: Menu mobile & Scroll ─────────────────────────
const header     = document.querySelector('.header');
const menuToggle = document.getElementById('menu-toggle');
const mainNav    = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu ao clicar fora do header
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('is-open') && header && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // Fecha o menu ao pressionar a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) {
      closeMenu();
    }
  }, { passive: true });
}

// Sombra ao rolar a página
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });
}

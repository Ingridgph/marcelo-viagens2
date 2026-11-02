// ============================================================
// SCRIPT.JS — Marcelo Viagens
// Funcionalidades e interações do site
// ============================================================

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

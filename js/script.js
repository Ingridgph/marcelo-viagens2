// ============================================================
// SCRIPT.JS — Marcelo Viagens
// Funcionalidades e interações do site
// ============================================================

// ─── Utilidades de layout ─────────────────────────────────
// Lê uma variável CSS numérica (ex.: --header-height) em px
const cssNumber = (el, prop, fallback) => {
  const raw = getComputedStyle(el).getPropertyValue(prop);
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
};

// Altura visível da página descontando o header fixo
const viewportWithoutHeader = () =>
  (window.innerHeight || 640) -
  cssNumber(document.documentElement, "--header-height", 70);

// ─── Hero: efeito de digitação ────────────────────────────
const typingEl = document.getElementById("hero-typing");

if (typingEl) {
  const phrases = [
    "Viajem com conforto",
    "Faça seu orçamento",
    "Viagens saindo de Palmas-TO.",
  ];

  const TYPE_MIN = 55; // ms por caractere ao digitar
  const TYPE_MAX = 110;
  const DELETE_MS = 35; // ms por caractere ao apagar
  const HOLD_MS = 1800; // pausa com a frase completa
  const GAP_MS = 500; // pausa antes da próxima frase

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ─── Header: Menu mobile & Scroll ─────────────────────────
const header = document.querySelector(".header");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu ao clicar fora do header
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("is-open") &&
      header &&
      !header.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Fecha o menu ao pressionar a tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Fecha o menu ao redimensionar para desktop
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768 && mainNav.classList.contains("is-open")) {
        closeMenu();
      }
    },
    { passive: true },
  );
}

// Sombra ao rolar a página
if (header) {
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("header--scrolled", window.scrollY > 10);
    },
    { passive: true },
  );
}

// ─── Galeria: carrossel (desktop) e pilha de 3 fotos (mobile) ───
const carousel = document.getElementById("gallery-carousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".gallery__slide"));
  const prevBtn = carousel.querySelector(".gallery__nav--prev");
  const nextBtn = carousel.querySelector(".gallery__nav--next");
  const dotsWrap = carousel.querySelector(".gallery__dots");

  // Abaixo de 768px o carrossel vira uma pilha de 2 fotos
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  const STACK_SIZE = 2; // fotos empilhadas visíveis no celular

  let current = 0;
  let autoTimer = null;
  const AUTOPLAY_MS = 5000;

  const mod = (n, len) => ((n % len) + len) % len;

  // Cria as bolinhas de navegação
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery__dot";
    dot.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
    dot.addEventListener("click", () => {
      current = i;
      render();
      restartAutoplay();
    });
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  // Distribui as classes de posição
  // Desktop: central + laterais (carrossel)
  // Mobile: 2 fotos empilhadas (a de cima na frente), o resto escondido
  const render = () => {
    const total = slides.length;
    const isMobile = mobileQuery.matches;

    slides.forEach((slide, i) => {
      const diff = mod(i - current, total);
      slide.classList.remove("is-center", "is-left", "is-right", "is-hidden");
      slide.classList.remove("is-stack-1", "is-stack-2");

      if (isMobile) {
        if (diff < STACK_SIZE) {
          slide.classList.add(`is-stack-${diff + 1}`);
        } else {
          slide.classList.add("is-hidden");
        }
        slide.setAttribute("aria-hidden", diff < STACK_SIZE ? "false" : "true");
      } else {
        if (diff === 0) {
          slide.classList.add("is-center");
        } else if (diff === 1) {
          slide.classList.add("is-right");
        } else if (diff === total - 1) {
          slide.classList.add("is-left");
        } else {
          slide.classList.add("is-hidden");
        }
        slide.setAttribute("aria-hidden", diff === 0 ? "false" : "true");
      }

      slide.setAttribute("aria-label", `${i + 1} de ${total}`);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });

    carousel.classList.toggle("is-stack", isMobile);

    // No celular, mede a altura da foto da frente para posicionar
    // a segunda foto e as setas logo abaixo dela.
    if (isMobile) {
      // altura das fotos = espaço da tela menos textos e bolinhas;
      // as duas fotos ficam coladas (vão de --stack-gap)
      const gap = cssNumber(carousel, "--stack-gap", 6);
      const reserved = 190; // textos + bolinhas + respiros
      const available = viewportWithoutHeader() - reserved;
      const photoHeight = Math.max(110, Math.floor((available - gap) / 2));
      carousel.style.setProperty("--gallery-stack-height", `${photoHeight}px`);
    } else {
      carousel.style.removeProperty("--gallery-stack-height");
    }
  };

  const go = (step) => {
    current = mod(current + step, slides.length);
    render();
  };

  const stopAutoplay = () => {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
  };

  // Um único timer encadeado: o próximo giro só é agendado depois
  // que a transição termina, evitando trocas pela metade.
  const scheduleAutoplay = () => {
    stopAutoplay();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;
    autoTimer = setTimeout(() => {
      go(1);
      scheduleAutoplay();
    }, AUTOPLAY_MS);
  };

  // startAutoplay e restartAutoplay têm o mesmo efeito:
  // reiniciam a contagem do próximo giro.
  const startAutoplay = scheduleAutoplay;
  const restartAutoplay = scheduleAutoplay;

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      go(-1);
      restartAutoplay();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      go(1);
      restartAutoplay();
    });

  // No desktop, clicar numa foto lateral a traz para o centro
  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      if (!mobileQuery.matches && i !== current) {
        current = i;
        render();
        restartAutoplay();
      }
    });
  });

  // Navegação por teclado
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
      restartAutoplay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
      restartAutoplay();
    }
  });

  // Pausa o autoplay ao passar o mouse ou focar
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  // Swipe no mobile — arrastar para o lado revela as próximas fotos
  let touchStartX = null;
  let touchStartY = null;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );
  carousel.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - (touchStartY || 0);
      // só considera swipe horizontal
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        go(deltaX < 0 ? 1 : -1);
        restartAutoplay();
      }
      touchStartX = null;
      touchStartY = null;
    },
    { passive: true },
  );

  // Reorganiza o layout quando muda entre mobile e desktop
  const onBreakpointChange = () => {
    render();
    restartAutoplay();
  };
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", onBreakpointChange);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(onBreakpointChange);
  }

  render();
  startAutoplay();

  // Remede quando as imagens terminam de carregar ou a tela muda de tamanho
  const remeasure = () => {
    if (mobileQuery.matches) render();
  };
  window.addEventListener("load", remeasure);
  window.addEventListener("resize", remeasure, { passive: true });
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (img) img.addEventListener("load", remeasure);
  });
}

// ─── Serviços no celular: 3 cards por vez com swipe ───────
const servicesCarousel = document.getElementById("services-carousel");

if (servicesCarousel) {
  const cards = Array.from(servicesCarousel.querySelectorAll(".service-card"));
  const servicesDots = document.querySelector(".services__dots");
  const mobileServices = window.matchMedia("(max-width: 767px)");
  const PER_VIEW = 3; // cards visíveis por vez no celular

  let svcStart = 0; // índice do primeiro card do grupo visível

  const modIndex = (n, len) => ((n % len) + len) % len;

  // Bolinhas: uma por grupo de 3 cards
  const groups = Math.ceil(cards.length / PER_VIEW);
  const svcDots = [];
  if (servicesDots) {
    for (let i = 0; i < groups; i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "services__dot";
      dot.setAttribute("aria-label", `Ver serviços ${i * PER_VIEW + 1} a ${Math.min(
        (i + 1) * PER_VIEW,
        cards.length,
      )}`);
      dot.addEventListener("click", () => {
        svcStart = i * PER_VIEW;
        renderServices();
      });
      servicesDots.appendChild(dot);
      svcDots.push(dot);
    }
  }

  // Define a altura dos cards conforme o espaço disponível na tela
  // (cards baixos e iguais, sem sobrar altura sobrando)
  const measureServiceHeight = () => {
    if (!mobileServices.matches) return;

    const gap = 10; // igual ao --svc-gap do CSS
    const reserved = 210; // textos da seção + bolinhas + respiros
    const available = viewportWithoutHeader() - reserved;
    const cardHeight = Math.floor((available - 2 * gap) / 3);

    // altura confortável: entre 100px e 165px
    const finalHeight = Math.min(165, Math.max(100, cardHeight));
    servicesCarousel.style.setProperty(
      "--service-card-height",
      `${finalHeight}px`,
    );
  };

  const renderServices = () => {
    if (!mobileServices.matches) {
      cards.forEach((card) => {
        card.classList.remove(
          "is-svc-1",
          "is-svc-2",
          "is-svc-3",
          "is-svc-hidden",
        );
        card.removeAttribute("aria-hidden");
      });
      return;
    }

    cards.forEach((card, i) => {
      card.classList.remove(
        "is-svc-1",
        "is-svc-2",
        "is-svc-3",
        "is-svc-hidden",
      );
      const pos = modIndex(i - svcStart, cards.length);
      if (pos < PER_VIEW) {
        card.classList.add(`is-svc-${pos + 1}`);
        card.removeAttribute("aria-hidden");
      } else {
        card.classList.add("is-svc-hidden");
        card.setAttribute("aria-hidden", "true");
      }
    });

    const activeGroup = Math.floor(modIndex(svcStart, cards.length) / PER_VIEW);
    svcDots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeGroup);
      dot.setAttribute("aria-current", i === activeGroup ? "true" : "false");
    });

    measureServiceHeight();
  };

  const goServices = (step) => {
    svcStart = modIndex(svcStart + step * PER_VIEW, cards.length);
    renderServices();
  };

  // Swipe horizontal
  let svcTouchX = null;
  let svcTouchY = null;
  servicesCarousel.addEventListener(
    "touchstart",
    (e) => {
      svcTouchX = e.touches[0].clientX;
      svcTouchY = e.touches[0].clientY;
    },
    { passive: true },
  );
  servicesCarousel.addEventListener(
    "touchend",
    (e) => {
      if (svcTouchX === null || !mobileServices.matches) return;
      const dx = e.changedTouches[0].clientX - svcTouchX;
      const dy = e.changedTouches[0].clientY - (svcTouchY || 0);
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goServices(dx < 0 ? 1 : -1);
      }
      svcTouchX = null;
      svcTouchY = null;
    },
    { passive: true },
  );

  // Teclado
  servicesCarousel.addEventListener("keydown", (e) => {
    if (!mobileServices.matches) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goServices(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goServices(1);
    }
  });

  const onServicesBreakpoint = () => {
    svcStart = 0;
    renderServices();
  };
  if (mobileServices.addEventListener) {
    mobileServices.addEventListener("change", onServicesBreakpoint);
  } else if (mobileServices.addListener) {
    mobileServices.addListener(onServicesBreakpoint);
  }

  window.addEventListener("resize", renderServices, { passive: true });
  renderServices();
}

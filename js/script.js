// ============================================================
// SCRIPT.JS — Norteclass Turismo
// Interações: menu mobile, efeito de digitação, formulário
// WhatsApp, carrossel da galeria e serviços mobile.
// ============================================================

// ─── Utilidades ─────────────────────────────────────────────
const cssNumber = (el, prop, fallback) => {
  const v = parseFloat(getComputedStyle(el).getPropertyValue(prop));
  return Number.isFinite(v) ? v : fallback;
};

const viewportWithoutHeader = () =>
  (window.innerHeight || 640) -
  cssNumber(document.documentElement, "--header-height", 70);

// ─── Hero: Efeito de digitação ──────────────────────────────
const typingEl = document.getElementById("hero-typing");
if (typingEl) {
  const phrases = [
    "Viagem com conforto",
    "Transporte executivo e turismo",
    "Viagens saindo de Palmas - TO",
  ];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    typingEl.textContent = phrases[0];
  } else {
    let pIdx = 0,
      cIdx = 0,
      deleting = false;
    const tick = () => {
      const phrase = phrases[pIdx];
      cIdx += deleting ? -1 : 1;
      typingEl.textContent = phrase.slice(0, cIdx);

      if (!deleting && cIdx === phrase.length) {
        deleting = true;
        return setTimeout(tick, 1800);
      }
      if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        return setTimeout(tick, 500);
      }
      setTimeout(tick, deleting ? 35 : 55 + Math.random() * 55);
    };
    setTimeout(tick, 600);
  }
}

// ─── Footer: Ano dinâmico ───────────────────────────────────
const footerYear = document.getElementById("footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ─── Formulário de orçamento → WhatsApp ─────────────────────
const WHATSAPP_NUMBER = "5563999999999";
const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
  const fmtDate = (v) => (!v ? "" : v.split("-").reverse().join("/"));

  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(quoteForm);
    const tel = String(fd.get("telefone") || "").trim();
    const det = String(fd.get("detalhes") || "").trim();
    const ret = fmtDate(fd.get("dataRetorno"));

    const lines = [
      "Olá! Gostaria de solicitar um orçamento de viagem.",
      "",
      `Nome: ${fd.get("nome")}`,
      tel && `Telefone: ${tel}`,
      `Local de saída: ${fd.get("saida")}`,
      `Destino: ${fd.get("destino")}`,
      `Data de saída: ${fmtDate(fd.get("dataSaida"))}`,
      ret && `Data de retorno: ${ret}`,
      `Passageiros: ${fd.get("passageiros")}`,
      `Tipo de viagem: ${fd.get("tipo")}`,
      det && `Detalhes: ${det}`,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
  });
}

// ─── Header: Menu Mobile & Sombra ao Rolar ──────────────────
const header = document.querySelector(".header");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
  };

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  mainNav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("is-open") &&
      header &&
      !header.contains(e.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768 && mainNav.classList.contains("is-open"))
        closeMenu();
    },
    { passive: true },
  );
}

if (header) {
  window.addEventListener(
    "scroll",
    () => header.classList.toggle("header--scrolled", window.scrollY > 10),
    { passive: true },
  );
}

// ─── Galeria de Fotos (Carrossel Desktop & Pilha Mobile) ────
const carousel = document.getElementById("gallery-carousel");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".gallery__slide"));
  const prevBtn = carousel.querySelector(".gallery__nav--prev");
  const nextBtn = carousel.querySelector(".gallery__nav--next");
  const dotsWrap = carousel.querySelector(".gallery__dots");
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  let current = 0;
  let autoTimer = null;
  const mod = (n, len) => ((n % len) + len) % len;

  // Região viva para acessibilidade
  const statusEl = document.createElement("p");
  statusEl.className = "gallery__status";
  statusEl.setAttribute("aria-live", "polite");
  statusEl.setAttribute("aria-atomic", "true");
  carousel.appendChild(statusEl);

  // Criação dos indicadores
  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "gallery__dot";
    d.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
    d.addEventListener("click", () => {
      current = i;
      render();
      restartAutoplay();
    });
    if (dotsWrap) dotsWrap.appendChild(d);
    return d;
  });

  const render = () => {
    const total = slides.length;
    const isMobile = mobileQuery.matches;

    slides.forEach((slide, i) => {
      const diff = mod(i - current, total);
      slide.classList.remove(
        "is-center",
        "is-left",
        "is-right",
        "is-hidden",
        "is-stack-1",
        "is-stack-2",
      );

      if (isMobile) {
        if (diff < 2) slide.classList.add(`is-stack-${diff + 1}`);
        else slide.classList.add("is-hidden");
        slide.setAttribute("aria-hidden", diff < 2 ? "false" : "true");
      } else {
        if (diff === 0) slide.classList.add("is-center");
        else if (diff === 1) slide.classList.add("is-right");
        else if (diff === total - 1) slide.classList.add("is-left");
        else slide.classList.add("is-hidden");
        slide.setAttribute("aria-hidden", diff === 0 ? "false" : "true");
      }
      slide.setAttribute("aria-label", `${i + 1} de ${total}`);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });

    const activeImg = slides[current].querySelector("img");
    statusEl.textContent = `Foto ${current + 1} de ${total}${activeImg?.alt ? `: ${activeImg.alt}` : ""}`;
    carousel.classList.toggle("is-stack", isMobile);

    if (isMobile) {
      const gap = cssNumber(carousel, "--stack-gap", 6);
      const frontItem = slides[current].querySelector(".gallery__item");
      const h =
        frontItem?.offsetHeight ||
        Math.max(110, Math.floor((viewportWithoutHeader() - gap) / 2));
      carousel.style.setProperty("--gallery-stack-height", `${h}px`);
    } else {
      carousel.style.removeProperty("--gallery-stack-height");
    }
  };

  const go = (step) => {
    current = mod(current + step, slides.length);
    render();
  };

  const stopAutoplay = () => {
    if (autoTimer) clearTimeout(autoTimer);
    autoTimer = null;
  };

  const restartAutoplay = () => {
    stopAutoplay();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoTimer = setTimeout(() => {
      go(1);
      restartAutoplay();
    }, 5000);
  };

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

  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      if (!mobileQuery.matches && i !== current) {
        current = i;
        render();
        restartAutoplay();
      }
    });
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
      restartAutoplay();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
      restartAutoplay();
    }
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", restartAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", restartAutoplay);

  // Suporte a swipe no mobile
  let tX = null,
    tY = null;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      tX = e.touches[0].clientX;
      tY = e.touches[0].clientY;
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      if (tX === null) return;
      const dx = e.changedTouches[0].clientX - tX;
      const dy = e.changedTouches[0].clientY - (tY || 0);
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? 1 : -1);
        restartAutoplay();
      }
      tX = null;
      tY = null;
    },
    { passive: true },
  );

  const onBp = () => {
    render();
    restartAutoplay();
  };
  mobileQuery.addEventListener
    ? mobileQuery.addEventListener("change", onBp)
    : mobileQuery.addListener(onBp);

  render();
  restartAutoplay();

  const remeasure = () => {
    if (mobileQuery.matches) render();
  };
  window.addEventListener("load", remeasure);
  window.addEventListener("resize", remeasure, { passive: true });
}

// ─── Serviços: Paginação e Swipe Mobile (3 por vez) ────────
const servicesCarousel = document.getElementById("services-carousel");

if (servicesCarousel) {
  const cards = Array.from(servicesCarousel.querySelectorAll(".service-card"));
  const svcDotsWrap = document.querySelector(".services__dots");
  const mobileSvc = window.matchMedia("(max-width: 767px)");
  const reduceMotionSvc = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const PER_VIEW = 3;
  const AUTOPLAY_MS = 8000;
  let svcStart = 0;
  let svcTimer = null;
  let svcAnimating = false;
  let svcInView = false;

  const svcStatus = document.createElement("p");
  svcStatus.className = "services__status";
  svcStatus.setAttribute("aria-live", "polite");
  svcStatus.setAttribute("aria-atomic", "true");
  if (svcDotsWrap)
    svcDotsWrap.parentNode.insertBefore(svcStatus, svcDotsWrap.nextSibling);

  const modIdx = (n, len) => ((n % len) + len) % len;
  const groups = Math.ceil(cards.length / PER_VIEW);
  const svcDots = [];

  if (svcDotsWrap) {
    for (let i = 0; i < groups; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "services__dot";
      dot.setAttribute("aria-label", `Ver grupo ${i + 1}`);
      dot.addEventListener("click", () => swapSvc(i * PER_VIEW));
      svcDotsWrap.appendChild(dot);
      svcDots.push(dot);
    }
  }

  const renderSvc = () => {
    if (!mobileSvc.matches) {
      cards.forEach((c) => {
        c.classList.remove("is-svc-1", "is-svc-2", "is-svc-3", "is-svc-hidden");
        c.removeAttribute("aria-hidden");
      });
      return;
    }

    cards.forEach((c, i) => {
      c.classList.remove("is-svc-1", "is-svc-2", "is-svc-3", "is-svc-hidden");
      const pos = modIdx(i - svcStart, cards.length);
      if (pos < PER_VIEW) {
        c.classList.add(`is-svc-${pos + 1}`);
        c.removeAttribute("aria-hidden");
      } else {
        c.classList.add("is-svc-hidden");
        c.setAttribute("aria-hidden", "true");
      }
    });

    const activeGrp = Math.floor(modIdx(svcStart, cards.length) / PER_VIEW);
    svcDots.forEach((d, i) => {
      d.classList.toggle("is-active", i === activeGrp);
      d.setAttribute("aria-current", i === activeGrp ? "true" : "false");
    });

    const first = activeGrp * PER_VIEW + 1;
    const last = Math.min(first + PER_VIEW - 1, cards.length);
    svcStatus.textContent = `Serviços ${first} a ${last} de ${cards.length}`;

    const cardHeight = Math.min(
      165,
      Math.max(100, Math.floor((viewportWithoutHeader() - 230) / 3)),
    );
    servicesCarousel.style.setProperty(
      "--service-card-height",
      `${cardHeight}px`,
    );
  };

  const stopSvcAutoplay = () => {
    if (svcTimer) {
      clearTimeout(svcTimer);
      svcTimer = null;
    }
  };

  const canSvcAutoplay = () =>
    groups > 1 &&
    mobileSvc.matches &&
    !reduceMotionSvc.matches &&
    !document.hidden &&
    svcInView &&
    !svcAnimating;

  const scheduleSvcAutoplay = () => {
    stopSvcAutoplay();
    if (!canSvcAutoplay()) return;
    svcTimer = setTimeout(() => {
      svcTimer = null;
      swapSvc(svcStart + PER_VIEW, true);
    }, AUTOPLAY_MS);
  };

  const applySvcStart = (index) => {
    svcStart = modIdx(index, cards.length);
    renderSvc();
  };

  const swapSvc = (index, animate = true) => {
    if (svcAnimating) return;

    const target = modIdx(index, cards.length);
    if (target === svcStart) {
      scheduleSvcAutoplay();
      return;
    }

    if (!animate || !mobileSvc.matches || reduceMotionSvc.matches) {
      applySvcStart(target);
      scheduleSvcAutoplay();
      return;
    }

    svcAnimating = true;
    stopSvcAutoplay();
    servicesCarousel.classList.add("is-svc-leaving");

    window.setTimeout(() => {
      applySvcStart(target);
      servicesCarousel.classList.remove("is-svc-leaving");
      servicesCarousel.classList.add("is-svc-entering");
      void servicesCarousel.offsetWidth;
      window.requestAnimationFrame(() => {
        servicesCarousel.classList.remove("is-svc-entering");
        window.setTimeout(() => {
          svcAnimating = false;
          scheduleSvcAutoplay();
        }, 420);
      });
    }, 420);
  };

  const goSvc = (step) => swapSvc(svcStart + step * PER_VIEW);

  let sTouchX = null,
    sTouchY = null;
  servicesCarousel.addEventListener(
    "touchstart",
    (e) => {
      sTouchX = e.touches[0].clientX;
      sTouchY = e.touches[0].clientY;
      stopSvcAutoplay();
    },
    { passive: true },
  );

  servicesCarousel.addEventListener(
    "touchend",
    (e) => {
      if (sTouchX === null || !mobileSvc.matches) return;
      const dx = e.changedTouches[0].clientX - sTouchX;
      const dy = e.changedTouches[0].clientY - (sTouchY || 0);
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goSvc(dx < 0 ? 1 : -1);
      } else {
        scheduleSvcAutoplay();
      }
      sTouchX = null;
      sTouchY = null;
    },
    { passive: true },
  );

  const onSvcBp = () => {
    svcAnimating = false;
    servicesCarousel.classList.remove("is-svc-leaving", "is-svc-entering");
    svcStart = 0;
    renderSvc();
    stopSvcAutoplay();
    scheduleSvcAutoplay();
  };
  mobileSvc.addEventListener
    ? mobileSvc.addEventListener("change", onSvcBp)
    : mobileSvc.addListener(onSvcBp);
  reduceMotionSvc.addEventListener
    ? reduceMotionSvc.addEventListener("change", scheduleSvcAutoplay)
    : reduceMotionSvc.addListener(scheduleSvcAutoplay);
  window.addEventListener("resize", renderSvc, { passive: true });

  // Pausa enquanto o usuário interage com a seção
  servicesCarousel.addEventListener("focusin", stopSvcAutoplay);
  servicesCarousel.addEventListener("focusout", scheduleSvcAutoplay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSvcAutoplay();
    else scheduleSvcAutoplay();
  });

  // Só roda quando a seção está visível na tela
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        svcInView = entries.some((entry) => entry.isIntersecting);
        if (svcInView) scheduleSvcAutoplay();
        else stopSvcAutoplay();
      },
      { threshold: 0.35 },
    ).observe(servicesCarousel);
  } else {
    svcInView = true;
  }

  renderSvc();
  scheduleSvcAutoplay();
}

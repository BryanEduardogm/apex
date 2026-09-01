document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initShowcase();
  initContactForm();
  initCarPreselect();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ===================== PRÉ-SELEÇÃO DO CARRO NO FORMULÁRIO =====================
   Quando o visitante clica em "Ver em 3D" e depois em "Agendar test-drive"
   na página do carro, ele volta pra cá com ?carro=slug — isso já marca o
   carro certo no select de contato, sem precisar escolher de novo. */
function initCarPreselect() {
  const select = document.getElementById('carro');
  if (!select || typeof CAR_SELECT_LABEL === 'undefined') return;

  const slug = new URLSearchParams(window.location.search).get('carro');
  const label = slug && CAR_SELECT_LABEL[slug];
  if (!label) return;

  const option = Array.from(select.options).find((opt) => opt.value === label);
  if (option) select.value = label;
}

/* ===================== MENU MOBILE ===================== */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===================== SCROLL REVEAL (fade-in) ===================== */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ===================== COLEÇÃO — troca de carro por scroll =====================
   Progressive enhancement: por padrão os 6 carros ficam empilhados em fluxo
   normal (funciona sem JS). Se houver JS e o usuário não pedir movimento
   reduzido, fixamos o palco e cruzamos a opacidade conforme o scroll. */
function initShowcase() {
  const track = document.querySelector('.showcase-track');
  const stage = document.querySelector('.showcase-stage');
  const layers = Array.from(document.querySelectorAll('.car-layer'));
  const dots = Array.from(document.querySelectorAll('.showcase-progress .dot'));
  if (!track || !stage || !layers.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.documentElement.classList.add('js-scrolly');

  let activeIndex = -1;
  let ticking = false;

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    layers.forEach((layer, i) => layer.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function update() {
    ticking = false;
    const rect = track.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    let progress = total > 0 ? -rect.top / total : 0;
    progress = Math.min(1, Math.max(0, progress));

    let index = Math.floor(progress * layers.length);
    if (index >= layers.length) index = layers.length - 1;
    if (index < 0) index = 0;

    setActive(index);
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  setActive(0);
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      const rect = track.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const total = rect.height - window.innerHeight;
      const targetY = trackTop + (total * (index + 0.5)) / layers.length;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}

/* ===================== FORMULÁRIO DE CONTATO ===================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const messages = {
    nome: 'Digite seu nome (mínimo 2 letras).',
    telefone: 'Digite um telefone válido.',
    carro: 'Selecione o carro de interesse.'
  };

  function showError(field, message) {
    const errorEl = form.querySelector(`.form-error[data-for="${field}"]`);
    if (errorEl) errorEl.textContent = message || '';
  }

  function validateField(input) {
    const isValid = input.checkValidity();
    showError(input.name, isValid ? '' : messages[input.name]);
    return isValid;
  }

  ['nome', 'telefone', 'carro'].forEach(name => {
    const field = form.elements[name];
    if (field) field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = ['nome', 'telefone', 'carro'].map(name => form.elements[name]);
    const allValid = fields.reduce((valid, field) => validateField(field) && valid, true);

    if (!allValid) {
      status.textContent = 'Verifique os campos destacados antes de enviar.';
      status.className = 'form-status is-error';
      return;
    }

    const carro = form.elements.carro.value;
    status.textContent = `Recebemos seu interesse pelo ${carro}! Este é um formulário de demonstração — nenhum dado foi enviado a um servidor.`;
    status.className = 'form-status is-success';
    form.reset();
  });
}

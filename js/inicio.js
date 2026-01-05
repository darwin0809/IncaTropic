/* ======================================================
   INICIO / HERO SLIDER
====================================================== */

let inicioIniciado = false;

function initInicio() {

  if (inicioIniciado) return;

  const inicioSection = document.getElementById('inicio');
  if (!inicioSection || !inicioSection.classList.contains('active')) return;

  inicioIniciado = true;

  initHeroSlider(inicioSection);
  initCarruselEspeciesInicio();

  console.log('✅ Inicio inicializado correctamente');
}

/* ===============================
   HERO SLIDER
================================ */

function initHeroSlider(inicioSection) {

  const hero = inicioSection.querySelector('#hero');
  if (!hero) return;

  const slides = hero.querySelectorAll('.slide');
  const dots = hero.querySelectorAll('.dot');
  const prev = hero.querySelector('.arrow-left');
  const next = hero.querySelector('.arrow-right');
  const scrollDown = hero.querySelector('#scrollDown');

  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index]?.classList.add('active');
    dots[index]?.classList.add('active');
  }

  showSlide(current);

  next?.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prev?.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      current = index;
      showSlide(current);
    });
  });

  scrollDown?.addEventListener('click', () => {
    document.getElementById('nosotros')?.scrollIntoView({
      behavior: 'smooth'
    });
  });
}

/* ======================================================
   CARRUSEL ESPECIES - INICIO (JSON)
====================================================== */

let inicioCarruselIndex = 0;
const INICIO_VISIBLE = 3;

function initCarruselEspeciesInicio() {
  cargarEspeciesInicioDesdeJSON();
}

/* ===============================
   CARGA JSON
================================ */

function cargarEspeciesInicioDesdeJSON() {
  fetch('/sections/data/especies.json')
    .then(res => res.json())
    .then(especies => cargarEspeciesInicio(especies))
    .catch(err => console.error('Error cargando especies inicio:', err));
}

/* ===============================
   RENDER
================================ */

function cargarEspeciesInicio(especies) {
  const cont = document.getElementById('inicioEspecies');
  if (!cont) return;

  cont.innerHTML = '';
  inicioCarruselIndex = 0;

  especies.forEach(especie => {
    const item = document.createElement('div');
    item.className = 'carrusel-item';
    item.innerHTML = `
      <img src="${especie.imagen}" alt="${especie.nombre}">
      <span>${especie.nombre}</span>
    `;
    cont.appendChild(item);
  });

  actualizarCarruselInicio();
}

/* ===============================
   MOVIMIENTO
================================ */

function actualizarCarruselInicio() {
  const cont = document.getElementById('inicioEspecies');
  if (!cont) return;

  cont.scrollLeft = inicioCarruselIndex * cont.clientWidth;
}

/* ===============================
   CONTROLES
================================ */

document.addEventListener('click', (e) => {

  if (e.target.closest('#inicioCarruselNext')) {
    const cont = document.getElementById('inicioEspecies');
    if (!cont) return;

    const total = cont.children.length;
    if (inicioCarruselIndex < total - INICIO_VISIBLE) {
      inicioCarruselIndex++;
      actualizarCarruselInicio();
    }
  }

  if (e.target.closest('#inicioCarruselPrev')) {
    if (inicioCarruselIndex > 0) {
      inicioCarruselIndex--;
      actualizarCarruselInicio();
    }
  }

});

/* ===============================
   LIMPIEZA
================================ */

function destroyInicio() {
  inicioIniciado = false;
}

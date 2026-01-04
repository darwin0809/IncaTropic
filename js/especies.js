/* ===============================
   VARIABLES GLOBALES
================================ */
let especiesData = []

/* ===============================
   INIT (LLAMADO DESDE layout.js)
================================ */
function initEspecies() {
  fetch('/sections/data/especies.json')
    .then(res => res.json())
    .then(data => {
      especiesData = data
      renderEspecies()
      initFichaEvents()
    })
    .catch(err => console.error('Error cargando especies:', err))
}

/* ===============================
   RENDER GRID DE ESPECIES
================================ */
function renderEspecies() {
  const container = document.getElementById('especiesContainer')
  if (!container) return

  container.innerHTML = ''

  especiesData.forEach(especie => {
    const card = document.createElement('div')
    card.className = 'especie-card'

    card.innerHTML = `
      <div class="especie-img">
        <div 
          class="especie-img-inner"
          style="background-image: url('${especie.imagen}')">
        </div>
      </div>
      <p class="especie-texto">${especie.nombre}</p>
    `

    card.addEventListener('click', () => abrirFicha(especie.id))
    container.appendChild(card)
  })
}

/* ===============================
   ABRIR FICHA DE ESPECIE
================================ */
function abrirFicha(id) {
  const especie = especiesData.find(e => e.id === id)
  if (!especie) return

  const grid = document.getElementById('especiesContainer')
  const ficha = document.getElementById('especieFicha')
  if (!grid || !ficha) return

  /* Mostrar ficha / ocultar grid */
  grid.style.display = 'none'
  ficha.classList.remove('hidden')

  /* ===============================
     DATOS PRINCIPALES
  ================================ */
  document.getElementById('fichaNombre').innerText = especie.nombre
  document.getElementById('fichaEspecie').innerText = especie.especie
  document.getElementById('fichaFamilia').innerText = especie.familia
  document.getElementById('fichaDescripcion').innerText = especie.descripcion
  document.getElementById('fichaImg').src = especie.imagen
  document.getElementById('fichaImg').alt = especie.nombre

  /* ===============================
     USOS
  ================================ */
  document.getElementById('fichaUsos').innerText = especie.usos || ''

  /* ===============================
     PROPIEDADES TÉCNICAS
  ================================ */
  renderPropiedades(especie.propiedades)

  /* ===============================
     ACABADOS
  ================================ */
  renderAcabado(especie.acabado)

  /* ===============================
     PRODUCTOS DISPONIBLES
  ================================ */
  renderProductos(especie.productos)
}

/* ===============================
   PROPIEDADES TÉCNICAS
================================ */
function renderPropiedades(propiedades = {}) {
  const container = document.getElementById('fichaPropiedades')
  if (!container) return

  container.innerHTML = ''

  Object.entries(propiedades).forEach(([nombre, valor]) => {
    const row = document.createElement('li')
    row.className = 'propiedad-row'
    row.innerHTML = `
      <span>${nombre}</span>
      <strong>${valor}</strong>
    `
    container.appendChild(row)
  })
}

/* ===============================
   ACABADOS
================================ */
function renderAcabado(imagenes = []) {
  const container = document.getElementById('fichaAcabado')
  if (!container) return

  container.innerHTML = ''

  imagenes.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    img.alt = 'Acabado'
    img.className = 'acabado-item'
    container.appendChild(img)
  })
}

/* ===============================
   PRODUCTOS DISPONIBLES
================================ */
function renderProductos(productos = []) {
  const container = document.getElementById('fichaProductos')
  if (!container) return

  container.innerHTML = ''

  productos.forEach(prod => {
    const item = document.createElement('div')
    item.className = 'producto-item'
    item.innerHTML = `
      <img src="${prod.img}" alt="${prod.nombre}">
      <p>${prod.nombre}</p>
    `
    container.appendChild(item)
  })
}

/* ===============================
   EVENTOS DE LA FICHA
================================ */
function initFichaEvents() {
  const volverBtn = document.getElementById('volverEspecies')
  if (!volverBtn) return

  volverBtn.onclick = () => {
    document.getElementById('especieFicha').classList.add('hidden')
    document.getElementById('especiesContainer').style.display = 'grid'
  }
}

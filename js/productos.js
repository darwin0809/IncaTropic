/* ===============================
   DATA GLOBAL
================================ */
let carruselIndex = 0;
const CARRUSEL_VISIBLE = 4;

let productosData = [];

/* ===============================
   INIT (llamado desde layout.js)
================================ */
function initProductos() {
    fetch('sections/data/productos.json')
        .then(res => res.json())
        .then(data => {
            productosData = data;
            renderProductos();

            // 🔥 CONECTAR BOTÓN VOLVER
            const volverBtn = document.getElementById('volverProductos');
            if (volverBtn) {
                volverBtn.addEventListener('click', volverProductos);
            }
        })
        .catch(err => console.error('Error cargando productos:', err));
}

/* ===============================
   RENDER GRID
================================ */
function renderProductos() {
    const container = document.getElementById('productosContainer');
    if (!container) return;

    container.innerHTML = '';

    productosData.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto';

        card.innerHTML = `
      <div class="producto-img" style="background-image:url('${producto.imagenes[0]}')"></div>
      <p class="producto-texto">${producto.nombre}</p>
    `;

        card.addEventListener('click', () => mostrarProducto(producto.id));
        container.appendChild(card);
    });
}

/* ===============================
   MOSTRAR FICHA
================================ */
function mostrarProducto(id) {
    const producto = productosData.find(p => p.id === id);
    if (!producto) return;

    document.getElementById('productosContainer')?.classList.add('hidden');
    document.getElementById('productoFicha')?.classList.remove('hidden');

    cargarGaleria(producto);
    cargarInfo(producto);
    cargarEspecies(producto);
    cargarTabla(producto);

}


/* ===============================
   GALERÍA (principal + thumbs)
================================ */
function cargarGaleria(producto) {
    const principal = document.getElementById('productoImgPrincipal');
    const thumbs = document.getElementById('productoThumbs');

    if (!principal || !thumbs) return;

    principal.src = producto.imagenes[0];
    thumbs.innerHTML = '';

    producto.imagenes.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `${producto.nombre} ${index + 1}`;

        thumb.addEventListener('click', () => {
            principal.src = img;
        });

        thumbs.appendChild(thumb);
    });
}

/* ===============================
   INFO
================================ */
function cargarInfo(producto) {
    const nombre = document.getElementById('productoNombre');
    const descripcion = document.getElementById('productoDescripcion');

    if (!nombre || !descripcion) return;

    nombre.textContent = producto.nombre;
    descripcion.textContent = producto.descripcion;
}

/* ===============================
   CARRUSEL ESPECIES
================================ */
function cargarEspecies(producto) {
    const cont = document.getElementById('productoEspecies');
    if (!cont) return;

    cont.innerHTML = '';
    carruselIndex = 0;

    producto.especies.forEach(especie => {
        const item = document.createElement('div');
        item.className = 'carrusel-item';

        item.innerHTML = `
      <img src="${especie.imagen}" alt="${especie.nombre}">
      <span>${especie.nombre}</span>
    `;

        cont.appendChild(item);
    });

    actualizarCarrusel();
}
function actualizarCarrusel() {
  const cont = document.getElementById('productoEspecies');
  cont.scrollLeft = carruselIndex * cont.clientWidth;
}


document.addEventListener('click', (e) => {
  if (e.target.closest('#carruselNext')) {
    console.log('CLICK NEXT');
    const cont = document.getElementById('productoEspecies');
    const total = cont.children.length;

    if (carruselIndex < total - CARRUSEL_VISIBLE) {
      carruselIndex++;
      actualizarCarrusel();
    }
  }

  if (e.target.closest('#carruselPrev')) {
    console.log('CLICK PREV');
    if (carruselIndex > 0) {
      carruselIndex--;
      actualizarCarrusel();
    }
  }
});


/* ===============================
   TABLA + HUMEDAD
================================ */
function cargarTabla(producto) {
  const tbody = document.getElementById('productoTabla');
  const humedad = document.getElementById('productoHumedad');

  if (!tbody || !humedad) return;

  tbody.innerHTML = producto.propiedades.map(prop => `
    <tr>
      <td>${prop.espesor}</td>
      <td>${prop.ancho}</td>
      <td>${prop.longitud}</td>
      <td>${prop.corte}</td>
    </tr>
  `).join('');

  humedad.textContent = producto.humedad;
}


/* ===============================
   VOLVER
================================ */
function volverProductos() {
    document.getElementById('productoFicha')?.classList.add('hidden');
    document.getElementById('productosContainer')?.classList.remove('hidden');
}


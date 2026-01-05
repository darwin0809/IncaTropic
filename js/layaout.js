/* ======================================================
   CARGA DE HEADER Y FOOTER
====================================================== */

Promise.all([
  fetch("/components/header.html").then(res => res.text()),
  fetch("/components/footer.html").then(res => res.text())
]).then(([headerHTML, footerHTML]) => {

  document.getElementById("header").innerHTML = headerHTML;
  document.getElementById("footer").innerHTML = footerHTML;

  initNavigation();
  initRouteFromURL();
});


/* ======================================================
   NAVEGACIÓN SPA
====================================================== */

function initNavigation() {
  const links = document.querySelectorAll('.main-nav a[href^="#"], footer a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const id = link.getAttribute("href").replace("#", "");
      if (!id) return;

      showSection(id);
      history.pushState(null, "", `#${id}`);
    });
  });
}


/* ======================================================
   MOSTRAR SECCIÓN
====================================================== */

function showSection(id) {
  document.querySelectorAll(".section")
    .forEach(sec => sec.classList.remove("active"));

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  setActiveLink(id);
}


/* ======================================================
   LINK ACTIVO (HEADER)
====================================================== */

function setActiveLink(sectionId) {
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach(link => {
    link.removeAttribute("aria-current");

    if (link.getAttribute("href") === `#${sectionId}`) {
      link.setAttribute("aria-current", "true");
    }
  });
}



/* ======================================================
   CARGAR DESDE URL DIRECTA
====================================================== */

function initRouteFromURL() {
  const hash = location.hash.replace("#", "");
  showSection(hash || "inicio");
}


/* ======================================================
   BOTÓN ATRÁS / ADELANTE
====================================================== */

window.addEventListener("popstate", () => {
  const hash = location.hash.replace("#", "");
  showSection(hash || "inicio");
});


/* ======================================================
   CARGA DINÁMICA DE SECCIONES
====================================================== */

fetch("/sections/especies.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("especies").innerHTML = html;
    initEspecies();
    initFichaEvents();
  });

fetch("/sections/productos.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("productos").innerHTML = html;
    initProductos();
  });
fetch("/sections/contacto.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("contacto").innerHTML = html;
    initContactoForm();
  });
  fetch("/sections/inicio.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("inicio").innerHTML = html;
    initInicio();
  });
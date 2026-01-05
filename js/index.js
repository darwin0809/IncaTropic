/* ================================
   ======= SISTEMA DE IDIOMA =======
   ================================ */

function initLanguage() {
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatable = document.querySelectorAll("[data-es], [data-en]");

  function applyLanguage(lang) {
    translatable.forEach(el => {
      if (lang === 'es' && el.dataset.es !== undefined) {
        el.textContent = el.dataset.es;
      } else if (lang === 'en' && el.dataset.en !== undefined) {
        el.textContent = el.dataset.en;
      }
    });
  }

  function setActiveButton(lang) {
    langButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  const savedLang = localStorage.getItem('siteLang') || 'es';
  applyLanguage(savedLang);
  setActiveButton(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.dataset.lang;
      applyLanguage(selectedLang);
      setActiveButton(selectedLang);
      localStorage.setItem("siteLang", selectedLang);
    });
  });
}

/* ====================================
   ======= NAVEGACIÓN POR SECCIONES =====
   ==================================== */

function initNavigation() {
  const navLinks = document.querySelectorAll(".main-nav a");
  const sections = document.querySelectorAll(".section");

  function setActiveNav(clickedLink) {
    navLinks.forEach(link => {
      link.removeAttribute("aria-current");
    });
    clickedLink.setAttribute("aria-current", "true");
  }

  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === id);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href").replace("#", "");
      setActiveNav(link);
      showSection(target);
    });
  });

  // sección inicial
  showSection("inicio");
}

/* ================================
   ======= INICIALIZACIÓN =======
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Idioma funciona incluso sin header
  initLanguage();
});
/* ================================
   ======= ENVIOS FORMULARIO=======
   ================================ */
   document.addEventListener('submit', (e) => {
  if (e.target.id === 'contactForm') {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch('/enviar.php', {
      method: 'POST',
      body: data
    })
    .then(res => res.text())
    .then(resp => {
      if (resp.trim() === 'OK') {
        alert('Mensaje enviado correctamente');
        form.reset();
      } else {
        alert('Error al enviar el mensaje');
      }
    })
    .catch(() => {
      alert('Error de conexión');
    });
  }
});

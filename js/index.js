const langButtons = document.querySelectorAll(".lang-btn");
const translatable = document.querySelectorAll("[data-es], [data-en]");

// ======= LENGUAJE =======
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

// Initialize language
const saved = localStorage.getItem('siteLang') || 'es';
applyLanguage(saved);
setActiveButton(saved);

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedLang = btn.dataset.lang;
    applyLanguage(selectedLang);
    setActiveButton(selectedLang);
    localStorage.setItem('siteLang', selectedLang);
  });
});


// ======= NAVEGACIÓN (CLICK → HOVER FIJO) =======
const navLinks = document.querySelectorAll(".main-nav a");

function setActiveNav(clickedLink) {
  navLinks.forEach(link => {
    link.removeAttribute("aria-current");
  });
  clickedLink.setAttribute("aria-current", "true");
}

// Inicialmente podrías establecer uno si quieres (opcional):
// navLinks[0].setAttribute("aria-current", "true");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    setActiveNav(link);
  });
});
// ======= MOSTRAR SOLO LA SECCIÓN SELECCIONADA =======
const sections = document.querySelectorAll(".section");

function showSection(id) {
  sections.forEach(sec => {
    sec.classList.toggle("active", sec.id === id);
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // evita salto brusco
    const target = link.getAttribute("href").replace("#", "");
    setActiveNav(link);
    showSection(target);
  });
});

// Mostrar sección principal al cargar
showSection("inicio");

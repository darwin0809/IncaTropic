function initContactoForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Validación en focusin, input y focusout
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('.campo input, .campo textarea')) {
      const campo = e.target.closest('.campo');
      if (e.target.value.trim() === '') {
        campo.classList.add('error');
      }
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.campo input, .campo textarea')) {
      const campo = e.target.closest('.campo');
      if (e.target.value.trim() === '') {
        campo.classList.add('error');
      } else {
        campo.classList.remove('error');
      }
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('.campo input, .campo textarea')) {
      e.target.closest('.campo').classList.remove('error');
    }
  })};

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contact-form');

  // Detectar preferencia de tema oscuro del sistema
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Función para actualizar tema visual y iconos
  function updateTheme(isDark) {
    if (isDark) {
      html.classList.add('dark');
      document.getElementById('moon-icon').classList.remove('hidden');
      document.getElementById('sun-icon').classList.add('hidden');
    } else {
      html.classList.remove('dark');
      document.getElementById('moon-icon').classList.add('hidden');
      document.getElementById('sun-icon').classList.remove('hidden');
    }
  }

  // Aplicar tema guardado o preferencia sistema
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    updateTheme(true);
  } else {
    updateTheme(false);
  }

  // Toggle de tema oscuro/claro y guardar en localStorage
  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    updateTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Cambiar tema si cambia preferencia sistema y no hay preferencia guardada
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      updateTheme(e.matches);
    }
  });

  // Menú móvil: toggle visibilidad y cambio de icono
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.setAttribute('aria-expanded', 'false'); // accesibilidad

    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
      mobileMenu.classList.toggle('hidden');

      const menuIcon = mobileMenuButton.querySelector('svg');
      if (menuIcon) {
        if (isExpanded) {
          // Mostrar icono hamburguesa
          menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
          // Mostrar icono cerrar (X)
          menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
      }
    });

    // Cerrar menú móvil al hacer clic en cualquier enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        const menuIcon = mobileMenuButton.querySelector('svg');
        if (menuIcon) {
          menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
      });
    });
  }

  // Cerrar menú móvil al hacer click fuera del menú y botón (solo si está abierto)
  document.addEventListener('click', (e) => {
    if (
      mobileMenu && !mobileMenu.contains(e.target) &&
      mobileMenuButton && !mobileMenuButton.contains(e.target) &&
      !mobileMenu.classList.contains('hidden')
    ) {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      const menuIcon = mobileMenuButton.querySelector('svg');
      if (menuIcon) {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      }
    }
  });

  // Validación básica del formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre = this.elements['nombre'].value.trim();
      const email = this.elements['email'].value.trim();
      const mensaje = this.elements['mensaje'].value.trim();

      if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      // Validación básica de email
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Por favor, introduce un email válido.');
        return;
      }

      // Simular envío exitoso
      alert('¡Mensaje enviado correctamente! (Funcionalidad simulada)');
      this.reset();
    });
  }
});

// Animaciones de aparición al hacer scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (const el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('opacity-100', 'translate-y-0');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();

  // Carrusel para proyectos destacados
  function crearCarrusel(claseImg, btnPrev, btnNext) {
    const imagenes = document.querySelectorAll(claseImg);
    let actual = 0;
    function mostrarImagen(idx) {
      imagenes.forEach((img, i) => {
        img.classList.toggle('opacity-100', i === idx);
        img.classList.toggle('opacity-0', i !== idx);
        img.classList.toggle('absolute', i !== idx);
      });
    }
    mostrarImagen(actual);
    document.querySelector(btnPrev)?.addEventListener('click', () => {
      actual = (actual - 1 + imagenes.length) % imagenes.length;
      mostrarImagen(actual);
    });
    document.querySelector(btnNext)?.addEventListener('click', () => {
      actual = (actual + 1) % imagenes.length;
      mostrarImagen(actual);
    });
  }

  crearCarrusel('.carousel-img-1', '.carousel-prev-1', '.carousel-next-1');
  crearCarrusel('.carousel-img-2', '.carousel-prev-2', '.carousel-next-2');
  crearCarrusel('.carousel-img-3', '.carousel-prev-3', '.carousel-next-3');
});


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
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = 'auto';
    };

    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    // Toggle del menú móvil
    mobileMenuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Cerrar menú con el botón de cerrar
    const closeButton = document.getElementById('close-mobile-menu');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    // Cerrar al hacer clic en un enlace del menú
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        closeMenu();
      }
    });

    // Evitar que el clic en el menú lo cierre
    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Toggle de tema para móvil
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      updateTheme(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Actualizar texto del botón
      const themeText = document.getElementById('theme-text');
      if (themeText) {
        themeText.textContent = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
      }
    });
  }

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

document.addEventListener('DOMContentLoaded', () => {
  // Asegurarse de que GSAP y ScrollTrigger estén cargados
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP o ScrollTrigger no se han cargado.');
    return;
  }

  // Registrar plugins
  gsap.registerPlugin(ScrollTrigger);

  // --- ANIMACIÓN DE ENTRADA ---
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('header', { y: -50, opacity: 0, duration: 1 })
    .from('section[aria-label="Perfil profesional"] img', { scale: 0.5, opacity: 0, duration: 1 }, '-=0.5')
    .from('section[aria-label="Perfil profesional"] h2, section[aria-label="Perfil profesional"] p, section[aria-label="Perfil profesional"] ul, section[aria-label="Perfil profesional"] div', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.7');

  // --- ANIMACIONES CON SCROLL (REVEAL) ---
  const revealSections = document.querySelectorAll('.reveal');
  revealSections.forEach((section) => {
    gsap.fromTo(section,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });


  gsap.set('#habilidades .text-center > *, #habilidades .grid > div', { autoAlpha: 1 });
});

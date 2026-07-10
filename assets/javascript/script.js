document.getElementById('year').textContent = new Date().getFullYear();

// Carrusel (soporta varios en la misma página)
document.querySelectorAll('.carousel').forEach((carouselEl) => {
  const track = carouselEl.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const dotsWrap = carouselEl.querySelector('.carousel-dots');
  const prevBtn = carouselEl.querySelector('.carousel-arrow.prev');
  const nextBtn = carouselEl.querySelector('.carousel-arrow.next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  nextBtn.addEventListener('click', () => goTo(current + 1));
  prevBtn.addEventListener('click', () => goTo(current - 1));

  let autoplay = setInterval(() => goTo(current + 1), 5000);
  carouselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
  carouselEl.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clearInterval(autoplay);
  }
});

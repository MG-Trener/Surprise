const particlesRoot = document.getElementById('particles');

// Фиксируем единственный стиль — неоновый киберпанк.
document.documentElement.dataset.theme = 'neon';
localStorage.removeItem('surprise-theme');

function createParticles(count = 32) {
  if (!particlesRoot) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    const isPink = Math.random() > 0.52;
    const size = (Math.random() * 3 + 1).toFixed(1);
    const left = (Math.random() * 100).toFixed(2);
    const duration = (Math.random() * 11 + 10).toFixed(1);
    const delay = (-Math.random() * 18).toFixed(1);
    const drift = `${(Math.random() * 120 - 60).toFixed(0)}px`;

    particle.style.left = `${left}%`;
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--drift', drift);
    particle.style.setProperty('--color', isPink ? 'var(--pink)' : 'var(--cyan)');

    fragment.appendChild(particle);
  }

  particlesRoot.appendChild(fragment);
}

createParticles();

// Лёгкий параллакс карточки на компьютере.
if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const card = document.querySelector('.message-card');

  if (card) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      card.style.setProperty('translate', `${x}px ${y}px`);
    }, { passive: true });
  }
}

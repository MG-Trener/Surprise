const root = document.documentElement;
const buttons = [...document.querySelectorAll('.theme-btn')];
const particlesRoot = document.getElementById('particles');

const savedTheme = localStorage.getItem('surprise-theme');
if (savedTheme === 'soft' || savedTheme === 'neon') {
  setTheme(savedTheme, false);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(button.dataset.theme, true);
  });
});

function setTheme(theme, remember = true) {
  root.dataset.theme = theme;

  buttons.forEach((button) => {
    const active = button.dataset.theme === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  if (remember) {
    localStorage.setItem('surprise-theme', theme);
  }
}

function createParticles(count = 28) {
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

// Небольшой параллакс только для устройств с точным указателем.
if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const card = document.querySelector('.message-card');

  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 8;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    card.style.setProperty('translate', `${x}px ${y}px`);
  }, { passive: true });
}

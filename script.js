const cards = document.querySelectorAll('.meet-card');
const bubble = document.querySelector('.speech-bubble');
const glow = document.querySelector('.cursor-glow');

function positionBubble(target) {
  const rect = target.getBoundingClientRect();
  const bubbleRect = bubble.getBoundingClientRect();
  const x = rect.left + rect.width / 2 - bubbleRect.width / 2;
  const y = rect.top - bubbleRect.height - 16;
  bubble.style.transformOrigin = 'bottom center';
  bubble.style.left = `${Math.max(16, x)}px`;
  bubble.style.top = `${Math.max(window.scrollY + 80, window.scrollY + y)}px`;
}

function showMessage(event) {
  const target = event.currentTarget;
  const message = target.dataset.message;
  bubble.textContent = message;
  bubble.classList.add('is-visible');
  positionBubble(target);
}

function hideMessage() {
  bubble.classList.remove('is-visible');
}

cards.forEach((card) => {
  card.addEventListener('mouseenter', showMessage);
  card.addEventListener('focus', showMessage);
  card.addEventListener('mouseleave', hideMessage);
  card.addEventListener('blur', hideMessage);
});

window.addEventListener('scroll', () => {
  if (!bubble.classList.contains('is-visible')) return;
  const active = document.querySelector('.meet-card:hover, .meet-card:focus');
  if (active) {
    positionBubble(active);
  }
});

window.addEventListener('resize', () => {
  if (!bubble.classList.contains('is-visible')) return;
  const active = document.querySelector('.meet-card:hover, .meet-card:focus');
  if (active) {
    positionBubble(active);
  }
});

window.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  glow.style.opacity = 1;
});

window.addEventListener('mouseleave', () => {
  if (!glow) return;
  glow.style.opacity = 0;
});

window.addEventListener('touchmove', (event) => {
  if (!glow) return;
  const touch = event.touches[0];
  glow.style.left = `${touch.clientX}px`;
  glow.style.top = `${touch.clientY}px`;
  glow.style.opacity = 0.4;
});

window.addEventListener('touchend', () => {
  if (!glow) return;
  glow.style.opacity = 0;
});

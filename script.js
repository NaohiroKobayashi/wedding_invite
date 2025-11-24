document.addEventListener('DOMContentLoaded', () => {
  // --- Speech Bubble Logic for Keyboard Navigation ---
  const cards = document.querySelectorAll('.meet-card');

  cards.forEach((card) => {
    // When the card receives focus (e.g., via Tab key)
    card.addEventListener('focus', () => {
      card.classList.add('is-focused');
    });

    // When the card loses focus
    card.addEventListener('blur', () => {
      card.classList.remove('is-focused');
    });
  });

  // --- Confetti on Page Load ---
  if (typeof confetti === 'function') {
    const duration = 3 * 1000; // Animation duration in milliseconds
    const animationEnd = Date.now() + duration;
    const colors = ['#e8c8ff', '#b597ff', '#fdf9f2', '#ffffff'];

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Launch confetti from both sides
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: colors,
      });
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: colors,
      });
    }, 250);
  }

  // --- Scroll Animation Logic ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // --- Original Cursor Glow Logic ---
  const glow = document.querySelector('.cursor-glow');

  if (glow) {
    window.addEventListener('mousemove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = 1;
    });

    window.addEventListener('mouseleave', () => {
      glow.style.opacity = 0;
    });

    window.addEventListener('touchmove', (event) => {
      const touch = event.touches[0];
      glow.style.left = `${touch.clientX}px`;
      glow.style.top = `${touch.clientY}px`;
      glow.style.opacity = 0.4;
    });

    window.addEventListener('touchend', () => {
      glow.style.opacity = 0;
    });
  }
});
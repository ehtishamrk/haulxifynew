/* =================================================================
   HAULXIFY — HOME JS
   Home-page specific interactions
   ================================================================= */

'use strict';

// ── Animate dashboard card metric numbers on scroll ──────────────
(function animateMetrics() {
  const metrics = document.querySelectorAll('.dc-metric__val');
  if (!metrics.length) return;

  const targets = [142, 38, 97]; // match HTML values

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      
      metrics.forEach((el, i) => {
        const target = targets[i];
        if (!target) return;
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 30);
      });

      observer.disconnect();
    });
  }, { threshold: 0.5 });

  const card = document.querySelector('.dashboard-card');
  if (card) observer.observe(card);
})();

/* =================================================================
   HAULXIFY — NAV JS
   Scroll state, dropdown accessibility, mobile menu
   ================================================================= */

'use strict';

// ── Scroll: add .scrolled to nav ─────────────────────────────────
const nav = document.getElementById('nav');

if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Mobile Menu ──────────────────────────────────────────────────
const navToggle       = document.getElementById('navToggle');
const mobileMenu      = document.getElementById('mobileMenu');
const mobileOverlay   = document.getElementById('mobileMenuOverlay');
const mobileClose     = document.getElementById('mobileMenuClose');

function openMobileMenu() {
  mobileMenu?.classList.add('active');
  mobileOverlay?.classList.add('active');
  navToggle?.classList.add('active');
  navToggle?.setAttribute('aria-expanded', 'true');
  mobileMenu?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu?.classList.remove('active');
  mobileOverlay?.classList.remove('active');
  navToggle?.classList.remove('active');
  navToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMobileMenu() : openMobileMenu();
});

mobileClose?.addEventListener('click', closeMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// ── Mobile Dropdown Toggles ──────────────────────────────────────
const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
dropdownToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    const list = btn.nextElementSibling;
    const isOpen = list?.classList.contains('open');

    // Close all other dropdowns
    document.querySelectorAll('.mobile-dropdown-list.open').forEach((el) => {
      el.classList.remove('open');
    });

    if (!isOpen && list) list.classList.add('open');
  });
});

// ── Desktop Dropdown: keyboard navigation ───────────────────────
const servicesBtn = document.getElementById('servicesBtn');
if (servicesBtn) {
  servicesBtn.addEventListener('click', () => {
    const expanded = servicesBtn.getAttribute('aria-expanded') === 'true';
    servicesBtn.setAttribute('aria-expanded', String(!expanded));
  });

  // Close dropdown when tabbing away
  servicesBtn.closest('.nav-item-dropdown')?.addEventListener('focusout', (e) => {
    const dropdown = servicesBtn.closest('.nav-item-dropdown');
    if (!dropdown?.contains(e.relatedTarget)) {
      servicesBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

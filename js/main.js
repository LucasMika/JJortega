/* ============================================================
   JJ.ORTEGA Lawncare — Main JavaScript
   File: js/main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------------
  // 1. Dynamic Footer Year
  // ----------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ----------------------------------------------------------
  // 2. Navbar: shadow on scroll
  // ----------------------------------------------------------
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ----------------------------------------------------------
  // 3. Mobile hamburger menu
  // ----------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }


  // ----------------------------------------------------------
  // 4. Smooth active link highlighting on scroll
  // ----------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNavOnScroll() {
    let currentId = '';
    const scrollMid = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      if (section.offsetTop <= scrollMid) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${currentId}`) {
        anchor.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });


  // ----------------------------------------------------------
  // 5. Scroll-reveal animations
  // ----------------------------------------------------------
  const revealTargets = document.querySelectorAll(
    '.service-card, .pricing-card, .contact-item, .hours-row, .hero-stat'
  );

  // Add base class for animation
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));


  // ----------------------------------------------------------
  // 6. Quote form — basic validation & feedback
  // ----------------------------------------------------------
  const ctaSubmit   = document.getElementById('cta-submit');
  const ctaName     = document.getElementById('cta-name');
  const ctaContact  = document.getElementById('cta-contact');
  const ctaFeedback = document.getElementById('cta-feedback');

  if (ctaSubmit) {
    ctaSubmit.addEventListener('click', () => {
      const name    = ctaName.value.trim();
      const contact = ctaContact.value.trim();

      if (!name || !contact) {
        showFeedback('Please fill in both fields before submitting.', 'error');
        return;
      }

      // Placeholder success — replace with a real form handler (e.g. Formspree, EmailJS)
      showFeedback(`Thanks, ${name}! We'll be in touch soon. 🌿`, 'success');
      ctaName.value    = '';
      ctaContact.value = '';
    });
  }

  function showFeedback(message, type) {
    if (!ctaFeedback) return;
    ctaFeedback.textContent = message;
    ctaFeedback.style.color = type === 'error'
      ? '#ffcdd2'
      : 'rgba(255,255,255,0.95)';
  }

});


/* ============================================================
   CSS injected via JS for reveal animations
   (Keeps animation keyframes out of the stylesheet)
   ============================================================ */
const animStyle = document.createElement('style');
animStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-links a.active {
    color: var(--green) !important;
    font-weight: 600;
  }
`;
document.head.appendChild(animStyle);

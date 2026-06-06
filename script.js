/* ============================================================
   D00msDay — Main JavaScript
   Animations, Interactions, Effects
   ============================================================ */

(function () {
  'use strict';

  // ==========================================
  // MATRIX RAIN
  // ==========================================
  const matrixCanvas = document.getElementById('matrix-rain');
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let width, height;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArr = chars.split('');
    let fontSize = 14;
    let columns;
    let drops = [];

    function resizeMatrix() {
      width = matrixCanvas.width = window.innerWidth;
      height = matrixCanvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops.length = 0;
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.06)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#ff003c';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter head
        ctx.fillStyle = 'rgba(255, 0, 60, 0.8)';
        ctx.fillText(char, x, y);

        // Fade trail
        if (Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(255, 0, 60, 0.3)';
          ctx.fillText(char, x, y - fontSize);
        }

        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    resizeMatrix();
    window.addEventListener('resize', resizeMatrix);
    setInterval(drawMatrix, 50);
  }

  // ==========================================
  // FLOATING PARTICLES
  // ==========================================
  const particleCanvas = document.getElementById('particles');
  if (particleCanvas) {
    const pCtx = particleCanvas.getContext('2d');
    let pWidth, pHeight;
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resizeParticles() {
      pWidth = particleCanvas.width = window.innerWidth;
      pHeight = particleCanvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * pWidth;
        this.y = Math.random() * pHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > pWidth || this.y < 0 || this.y > pHeight) {
          this.reset();
        }
      }
      draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(255, 0, 60, ${this.opacity})`;
        pCtx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            pCtx.beginPath();
            pCtx.moveTo(particles[i].x, particles[i].y);
            pCtx.lineTo(particles[j].x, particles[j].y);
            pCtx.strokeStyle = `rgba(255, 0, 60, ${0.08 * (1 - dist / 120)})`;
            pCtx.lineWidth = 0.5;
            pCtx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      pCtx.clearRect(0, 0, pWidth, pHeight);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    animateParticles();
  }

  // ==========================================
  // TYPING TERMINAL ANIMATION
  // ==========================================
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const text = 'init_d00msday --deploy';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 80 + Math.random() * 40);
      }
    }
    setTimeout(typeChar, 500);
  }

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // MOBILE NAV TOGGLE
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // SCROLL REVEAL
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================
  // ANIMATED COUNTERS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 2000;
          const start = performance.now();

          function updateCounter(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  // ==========================================
  // SMOOTH SCROLL for anchor links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // GALLERY FILTER
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventItems = document.querySelectorAll('.event-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      eventItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // LIGHTBOX
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && lightboxContent && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const placeholder = item.querySelector('.gallery-placeholder');
        if (placeholder) {
          lightboxContent.innerHTML = placeholder.innerHTML;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // PARALLAX HERO EFFECT
  // ==========================================
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const eclipse = hero.querySelector('.red-eclipse');
        if (eclipse) {
          eclipse.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.15}px)`;
        }
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
        }
      }
    });
  }

  // ==========================================
  // KEYBOARD NAVIGATION for lightbox
  // ==========================================
  // (Already handled above with Escape key)

  // ==========================================
  // PREFERS REDUCED MOTION
  // ==========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // Disable animations
    document.documentElement.style.scrollBehavior = 'auto';
    revealElements.forEach(el => el.classList.add('revealed'));
  }

})();

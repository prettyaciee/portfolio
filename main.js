document.addEventListener('DOMContentLoaded', () => {

  /* ── Footer year ────────────────────────────────────── */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ── Mobile nav ─────────────────────────────────────── */
  const toggle   = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links    = document.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('active');
  });
  links.forEach(l => l.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('active');
  }));

  /* typewriter effect */
  const roles = [
    'Frontend Developer',
    'ICT Student',
    'UI Explorer',
    'Creative Coder',
  ];
  const tw = document.getElementById('typewriter');
  let rIdx = 0, cIdx = 0, deleting = false, speed = 100;

  function type() {
    const word = roles[rIdx];
    tw.textContent = deleting
      ? word.slice(0, cIdx - 1)
      : word.slice(0, cIdx + 1);

    deleting ? cIdx-- : cIdx++;

    if (!deleting && cIdx === word.length) {
      deleting = true; speed = 2200;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      speed = 480;
    } else {
      speed = deleting ? 48 : 100;
    }
    setTimeout(type, speed);
  }
  setTimeout(type, 800);

  /* ── Scroll-reveal (IntersectionObserver) ──────────── */
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');

      if (el.classList.contains('reveal-stagger')) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
        });
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));

  /* ── Active nav via section observer ────────────────── */
  const sections  = document.querySelectorAll('.section');
  const navItems  = document.querySelectorAll('.nav-link');
  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.35, rootMargin: '-8% 0px -42% 0px' });

  sections.forEach(s => sectionIO.observe(s));

  /* ── Navbar shrink + parallax on scroll ─────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
  }, { passive: true });

  /* ── Contact form (mock send) ───────────────────────── */
  window.handleSubmit = (e) => {
    e.preventDefault();
    const btn     = e.target.querySelector('.btn');
    const label   = btn.querySelector('.btn-text');
    const sent    = btn.querySelector('.btn-sent');
    btn.disabled = true;
    label.hidden  = true;
    sent.hidden   = false;
    btn.style.borderColor = '#34d399';
    btn.style.color       = '#34d399';
    setTimeout(() => {
      btn.disabled = false;
      label.hidden  = false;
      sent.hidden   = true;
      btn.style.borderColor = '';
      btn.style.color       = '';
      e.target.reset();
    }, 3000);
  };

});

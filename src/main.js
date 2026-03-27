import './style.css';
import { applyLazyLoading, applySeoTemplate } from './seo-template';

document.addEventListener('DOMContentLoaded', () => {
  applySeoTemplate();
  applyLazyLoading();

  const whatsappText = encodeURIComponent('Olá! Vim pelo site da Jacomassi Serviços e gostaria de atendimento.');
  const whatsappUrl = `https://wa.me/5517996317094?text=${whatsappText}`;
  const body = document.body;
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const parallaxHero = document.querySelector('[data-parallax]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastScrollY = window.scrollY;
  
  // Sticky Header + subtle behavior on scroll direction
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const isDesktop = window.innerWidth > 900;
    if (isDesktop && currentScrollY > lastScrollY && currentScrollY > 140) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    // Subtle parallax only on desktop-like viewports
    if (parallaxHero && !reduceMotion && window.innerWidth > 900) {
      const base = Number(parallaxHero.dataset.parallaxBase || 50);
      const offset = Math.min(currentScrollY * 0.2, 80);
      parallaxHero.style.backgroundPosition = `center calc(${base}% + ${offset}px)`;
    }

    lastScrollY = currentScrollY;
  });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  // Active Link Highlight
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // Highlight callout for internal pages
  if (!body.classList.contains('home-page')) {
    const main = document.getElementById('app');
    if (main && !document.querySelector('.inner-callout')) {
      const callout = document.createElement('section');
      callout.className = 'inner-callout';
      callout.innerHTML = `
        <div class="container inner-callout-wrap">
          <div>
            <h2>Precisa de uma solução industrial sob medida?</h2>
            <p>Fale com nossa equipe e receba atendimento rápido para o seu projeto.</p>
          </div>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">Chamar no WhatsApp</a>
        </div>
      `;
      main.prepend(callout);
    }
  }

  // Floating WhatsApp button (global across pages)
  if (!document.querySelector('.whatsapp-float')) {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = whatsappUrl;
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Conversar no WhatsApp');
    whatsappButton.innerHTML = `
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M19.11 17.24c-.29-.15-1.71-.84-1.98-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.15-1.2-.44-2.28-1.4-.84-.75-1.41-1.67-1.57-1.96-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.13-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.44.01 1.44 1.03 2.83 1.17 3.02.15.19 2.03 3.11 4.92 4.36.69.3 1.23.48 1.65.62.69.22 1.32.19 1.81.12.55-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"/>
        <path fill="currentColor" d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.45 1.65 6.31L3 29l6.88-1.61A12.95 12.95 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.66c-1.94 0-3.8-.52-5.43-1.5l-.39-.23-4.08.95.98-3.98-.26-.41a10.63 10.63 0 1 1 9.18 5.17z"/>
      </svg>
    `;
    document.body.appendChild(whatsappButton);
  }
});

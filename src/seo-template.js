const BASE_URL = 'https://jacomassi.ind.br';

function getCanonicalUrl() {
  const canonicalTag = document.querySelector('link[rel="canonical"]');
  const canonicalHref = canonicalTag?.getAttribute('href');

  if (canonicalHref) {
    return canonicalHref;
  }

  const path = window.location.pathname === '/' ? '/' : window.location.pathname;
  return `${BASE_URL}${path}`;
}

function ensureMetaTag(selector, attributes) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function applySeoTemplate() {
  const canonicalUrl = getCanonicalUrl();
  const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title;
  const description =
    document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
    document.querySelector('meta[name="description"]')?.getAttribute('content') ||
    '';
  const image = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || `${BASE_URL}/images/imgi_807_logo-300x92.png`;

  const canonicalTag = document.querySelector('link[rel="canonical"]');
  if (canonicalTag) {
    canonicalTag.setAttribute('href', canonicalUrl);
  }

  ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
}

export function applyLazyLoading() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    if (img.hasAttribute('loading')) return;

    const isAboveFoldAsset =
      img.closest('.site-header') ||
      img.classList.contains('logo');

    if (!isAboveFoldAsset) {
      img.setAttribute('loading', 'lazy');
    }
  });
}

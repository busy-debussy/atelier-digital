export const GA_ID = 'G-HK7KZMSNMQ';

const isProd = !['localhost', '127.0.0.1'].includes(window.location.hostname);

export function loadGoogleAnalytics(id) {
  if (!id || !isProd || document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id    = 'ga-script';
  s.async = true;
  s.src   = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true, send_page_view: false });
}

export function trackPageView(path) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}

export function loadClarity() {
  if (!isProd || document.getElementById('clarity-script')) return;
  const s = document.createElement('script');
  s.id    = 'clarity-script';
  s.async = true;
  s.src   = 'https://www.clarity.ms/tag/w4c7gwpuqz';
  document.head.appendChild(s);
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
}

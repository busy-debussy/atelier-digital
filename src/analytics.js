export const GA_ID = 'G-HK7KZMSNMQ';

export function loadGoogleAnalytics(id) {
  if (!id || document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id    = 'ga-script';
  s.async = true;
  s.src   = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

export function loadContentsquare() {
  if (document.getElementById('cs-script')) return;
  const s = document.createElement('script');
  s.id    = 'cs-script';
  s.async = true;
  s.src   = 'https://t.contentsquare.net/uxa/ddd53e0773447.js';
  document.head.appendChild(s);
}

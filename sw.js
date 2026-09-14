// Service worker minimal (lot 6, ADR-0006) : juste ce qu'il faut pour l'installabilité
// PWA et un repli hors-ligne sur la coquille de l'appli. Aucune logique métier ici.
const CACHE = 'coeur-relatif-v1';
const COQUILLE = ['/', '/manifest.json', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(COQUILLE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((r) => r ?? caches.match('/'))),
  );
});

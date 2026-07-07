/* FLH Anesthesia Portal - service worker
   Strategy:
   - Precache all pages at install so OR Emergencies works offline immediately.
   - Pages: network-first (always fresh when online), cached fallback when offline.
   - CDN libraries (jsdelivr): cache-first after first use.
   Bump CACHE_VERSION whenever files change to push updates to installed apps. */

const CACHE_VERSION = 'flh-v1';
const PRECACHE = [
  './',
  './index.html',
  './new-schedule.html',
  './new-call-team.html',
  './new-drug-labels.html',
  './trial-block-schedule.html',
  './or-emergencies.html',
  './useful-links.html',
  './sab-notes.html',
  './bmi.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  // CDN libraries: cache-first (they are version-pinned URLs)
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(
      caches.match(event.request).then((hit) =>
        hit || fetch(event.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy));
          return res;
        })
      )
    );
    return;
  }

  // Same-origin pages/assets: network-first, cache fallback
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true }))
    );
  }
  // Everything else (Google Sheets data, Apps Script iframe): straight to network.
});

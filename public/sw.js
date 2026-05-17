// =============================================
// Astha VMS – Service Worker v2
// Minimal caching — always fetch fresh HTML/JS/CSS
// =============================================

const CACHE_NAME = "astha-vms-v2";

// Only cache third-party CDN libraries — never your own files
const CDN_CACHE = [
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"
];

// Install — cache only CDN libraries
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CDN_CACHE).catch(err => {
        console.warn("[SW] CDN cache failed:", err);
      });
    })
  );
  // Take over immediately — don't wait for old SW to die
  self.skipWaiting();
});

// Activate — delete ALL old caches immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => {
        console.log("[SW] Deleting old cache:", k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Your own files (HTML/CSS/JS) → ALWAYS network first, never serve from cache
// - Firebase APIs → ALWAYS network, never cache
// - CDN libraries → cache first (they never change)
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Never intercept Firebase requests
  if (
    url.includes("firebaseapp.com") ||
    url.includes("googleapis.com") ||
    url.includes("gstatic.com") ||
    url.includes("firestore.googleapis.com") ||
    url.includes("identitytoolkit")
  ) {
    return;
  }

  // CDN libraries — cache first
  if (url.includes("cdnjs.cloudflare.com")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // YOUR files — network always, no cache
  event.respondWith(
    fetch(event.request).catch(() => {
      // Only fall back to cache if completely offline
      return caches.match(event.request);
    })
  );
});
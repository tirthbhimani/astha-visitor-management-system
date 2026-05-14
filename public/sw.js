// =============================================
// Astha VMS – Service Worker
// Caches static assets for offline shell
// Dynamic data (Firebase) stays online-only
// =============================================

const CACHE_NAME   = "astha-vms-v1";
const CACHE_STATIC = "astha-static-v1";

// Static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/visitors.html",
  "/visitor-form.html",
  "/visitor-detail.html",
  "/reminders.html",
  "/analytics.html",
  "/css/main.css",
  "/css/auth.css",
  "/css/dashboard.css",
  "/js/whatsapp.js",
  "/manifest.json",
];

// ── Install: cache static shell ────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ─────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_STATIC && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first for static, network-first for Firebase ──
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Always network for Firebase APIs
  if (
    url.includes("firebaseapp.com") ||
    url.includes("googleapis.com") ||
    url.includes("gstatic.com") ||
    url.includes("firestore.googleapis.com")
  ) {
    return; // Let browser handle Firebase requests normally
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache valid GET responses
          if (
            event.request.method === "GET" &&
            response.status === 200 &&
            !url.includes("chrome-extension")
          ) {
            const clone = response.clone();
            caches.open(CACHE_STATIC).then((c) => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for HTML pages
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// ── Push Notifications (future use) ────────────
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || "You have a new reminder from Astha VMS",
    icon: "/assets/icons/icon-192.png",
    badge: "/assets/icons/icon-192.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/reminders.html" },
  };
  event.waitUntil(
    self.registration.showNotification(
      data.title || "Astha VMS Reminder",
      options
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/reminders.html")
  );
});
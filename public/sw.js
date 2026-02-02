const CACHE_NAME = 'wordhi-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except for translation API
  if (url.origin !== location.origin) {
    // For translation API, always go to network
    if (url.hostname === 'api.mymemory.translated.net') {
      event.respondWith(
        fetch(request)
          .then((response) => {
            return response;
          })
          .catch(() => {
            return new Response(
              JSON.stringify({
                responseStatus: 500,
                responseData: { translatedText: "oh no, sorry this traduction doesn't exist" }
              }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          })
      );
    }
    return;
  }

  // For same-origin requests, use cache-first strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached response and update cache in background
        event.waitUntil(
          fetch(request).then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, networkResponse);
            });
          }).catch(() => {})
        );
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(request).then((networkResponse) => {
        // Clone the response before caching
        const responseClone = networkResponse.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return networkResponse;
      }).catch(() => {
        // If offline and not in cache, return offline page for HTML requests
        if (request.headers.get('Accept')?.includes('text/html')) {
          return caches.match('/');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});

// Handle background sync for translations
self.addEventListener('sync', (event) => {
  if (event.tag === 'translation-sync') {
    event.waitUntil(syncTranslations());
  }
});

async function syncTranslations() {
  // Placeholder for background sync logic
  console.log('Syncing translations...');
}

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Nouvelle mise à jour disponible!',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('WordHi', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

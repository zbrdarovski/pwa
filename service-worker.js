const CACHE_NAME = 'news-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/news.html',
    '/manager.html',
    '/news.css',
    '/manager.css',
    '/manifest.json',
    '/favicon.ico',
    'https://cdn.jsdelivr.net/npm/dexie@3.2.0/dist/dexie.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
];

// Install a service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: 'Notification from YogaFlex News',
        icon: 'icons/icon-192x192.png'
    });
});

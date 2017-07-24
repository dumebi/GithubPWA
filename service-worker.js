var cacheName = 'PWADemo-v1';
var filesToCache = [
    '/index.html',
    '/css/app.css',
    '/js/app.js',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    'https://code.jquery.com/jquery-2.2.4.min.js'
    /* ...and other assets (jQuery, Materialize, fonts, etc) */
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
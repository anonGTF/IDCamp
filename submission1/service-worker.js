const CACHE_NAME = "cache-v1"
var urlstoCache = [
    "/",
    "/index.html",
    "/nav.html",
    "pages/home.html",
    "pages/me.html",
    "pages/indah.html",
    "pages/herlambang.html",
    "pages/maul.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.js",
    "/js/nav.js",
    "/js/script.js"
];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlstoCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, {cachename : CACHE_NAME})
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: using asets from cache ", response.url);
                    return response;
                }
                console.log("ServiceWorker: Load asets from server ", event.request.url);
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServoceWorker: cache " + cacheName + " removed");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
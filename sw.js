var cacheName = "news-api";
var fileTocache = [
    '/',
    '/index.html',
    '/favorites.html',
    '/css/reset.css',
    '/css/style.css',
    '/js/app.js',
    '/js/db.js',
    '/js/favoritesView.js',
    '/js/newsController.js',
    '/js/newsDAO.js',
    '/js/newsModel.js',
    '/js/cardModel.js'
];

//Faz a instalação do cache
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(fileTocache);
        })
    );
});


/**
 * Se Houver uma versão de cache disponivel, será usado e irá buscar uma atualização para proxima vez
 */
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          return response || fetchPromise;
        })
      })
    );
});
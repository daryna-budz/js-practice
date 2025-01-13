self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
          'index.html',
          'script.js' 
        ]);
      })
    );
});
  
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('jsonplaceholder.typicode.com')) {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            return caches.open('data-cache').then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    }
  });
  
  
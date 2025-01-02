
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';


const STATIC_FILES = [
  'index.html',
  'offline.html',
  'style.css',
  'script.js',
];


self.addEventListener('install', event => {
  console.log('Service Worker встановлюється...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      console.log('Кешуються статичні файли...');
      return cache.addAll(['offline.html']);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('Service Worker активовано');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE) {
            console.log(`Видаляється старий кеш: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log(`Відповідь з кешу: ${event.request.url}`);
        return cachedResponse;
      }
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match('offline.html'));
    })
  );
});


function cacheFirst(request) {
  return caches.match(request).then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(request).then(networkResponse => {
      return caches.open(DYNAMIC_CACHE).then(cache => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

const fetchWithTimeout = (url, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Запит перевищив час очікування')), timeout);
    fetch(url)
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
};


self.addEventListener('message', event => {
  if (event.data.action === 'clearCache') {
    caches.delete(DYNAMIC_CACHE).then(() => console.log('Динамічний кеш очищено'));
  }
});


let cacheHits = 0;
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        cacheHits++;
        console.log(`Кількість запитів з кешу: ${cacheHits}`);
      }
      return response || fetch(event.request);
    })
  );
});

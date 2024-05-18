const API_CACHE = 'api-cache-v1';

const NEED_CACHE_URL = ['parentingInfo'];

self.addEventListener('install', (e) => {
  console.log('installed', e);
});

self.addEventListener('activate', (e) => {
  console.log('activated', e);
  // const cacheWhiteList = [API_CACHE];
  // e.waitUntil(
  //   caches.keys().then((cacheNames) => {
  //     return Promise.all(
  //       cacheNames.map((cacheName) => {
  //         if (!cacheWhiteList.includes(cacheName)) {
  //           return caches.delete(cacheName);
  //         }
  //       }),
  //     );
  //   }),
  // );
});

self.addEventListener('fetch', (e) => {
  console.log('fetched', e);
  if (e.request.method === 'GET') {
    console.log('GET 1');

    if (
      NEED_CACHE_URL.some((url) => {
        e.request.url.includes(url);
      })
    ) {
    }

    // e.responseWith(
    //   caches.match(e.request).then((cachedResponse) => {
    //     if (cachedResponse) {
    //       return cachedResponse;
    //     }
    //     return fetch(e.request).then((networkResponse) => {
    //       if (networkResponse.status === 200) {
    //         caches.open(API_CACHE).then((cache) => {
    //           cache.put(e.request, networkResponse.clone());
    //         });
    //       }
    //       return networkResponse;
    //     });
    //   }),
    // );
  }
});

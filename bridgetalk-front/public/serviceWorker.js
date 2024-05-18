const API_CACHE = 'api-cache-v1';

const NEED_CACHE_URL = ['parentingInfo', 'slang'];

self.addEventListener('install', (e) => {
  console.log('SERVICE-WORKER INSTALLED', e);
});

self.addEventListener('activate', (e) => {
  console.log('SERVICE_WORKER ACTIVATED', e);
});

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    // 캐시 대상 요청이라면
    if (NEED_CACHE_URL.some((url) => e.request.url.includes(url))) {
      e.respondWith(
        caches.open(API_CACHE).then((CACHE_STORAGE) => {
          return CACHE_STORAGE.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
              // 캐싱된 데이터가 있을 경우 캐시 데이터 반환
              return cachedResponse;
            } else {
              // 캐싱된 데이터가 없을 경우 네트워크 요청을 수행
              return fetch(e.request)
                .then((networkResponse) => {
                  if (networkResponse && networkResponse.status === 200) {
                    // 캐시에 저장
                    CACHE_STORAGE.put(e.request, networkResponse.clone());
                  }
                  return networkResponse;
                })
                .catch((error) => {
                  throw error;
                });
            }
          });
        }),
      );
    }
  }
});

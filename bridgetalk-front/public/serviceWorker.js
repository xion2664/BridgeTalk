const API_CACHE = 'api-cache-v1';
const ASSET_CACHE = 'asset-cache-v1';

const NEED_CACHE_API_URL = ['parentingInfo', 'slang'];
const NEED_CACHE_ASSET_REGEX = /\.(svg|png|jpe?g|glb)$/;

self.addEventListener('install', (e) => {
  console.log('SERVICE-WORKER INSTALLED', e);
});

self.addEventListener('activate', (e) => {
  console.log('SERVICE_WORKER ACTIVATED', e);
});

self.addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    // 캐시 대상 요청이라면
    if (NEED_CACHE_API_URL.some((url) => e.request.url.includes(url))) {
      cacheCheck(API_CACHE, e);
    } else if (NEED_CACHE_ASSET_REGEX.test(e.request.url)) {
      cacheCheck(ASSET_CACHE, e);
    }
  }
});

function cacheCheck(cache_storage, e) {
  e.respondWith(
    caches.open(cache_storage).then((CACHE_STORAGE) => {
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

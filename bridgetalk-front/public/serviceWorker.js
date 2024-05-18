const API_CACHE = 'api-cache-v1';

const NEED_CACHE_URL = ['parentingInfo', 'slang'];

self.addEventListener('install', (e) => {
  console.log('installed', e);
});

self.addEventListener('activate', (e) => {
  console.log('activated', e);
});

self.addEventListener('fetch', (e) => {
  console.log('fetched', e);
  if (e.request.method === 'GET') {
    if (NEED_CACHE_URL.some((url) => e.request.url.includes(url))) {
      const request_url = e.request.url;

      console.log('{ 캐시 대상 요청 }');
      // 캐싱 로직
      // 1. 캐시 확인 후 정보가 있다면 해당 데이터 활용하기
      // 2. 캐시 확인 후 정보가 없다면 요청 보내고 응답 데이터 활용하기

      caches
        .open(API_CACHE)
        .then((CACHE_STORAGE) => {
          CACHE_STORAGE.match(request_url).then((res) => {
            if (!res) {
              console.log('{ 캐싱 데이터 없음 }');
              fetch(request_url).then((response) => {
                console.log(`{ Fetch 리스폰스 ${response}}`);
                CACHE_STORAGE.put(request_url, response);
              });
            } else if (res) {
              console.log('{ 캐싱 데이터 있음 }');
              return res;
            }
          });
        })
        .catch((err) => console.log(err));
    }

    //     // e.responseWith(
    //     //   caches.match(e.request).then((cachedResponse) => {
    //     //     if (cachedResponse) {
    //     //       return cachedResponse;
    //     //     }
    //     //     return fetch(e.request).then((networkResponse) => {
    //     //       if (networkResponse.status === 200) {
    //     //         caches.open(API_CACHE).then((cache) => {
    //     //           cache.put(e.request, networkResponse.clone());
    //     //         });
    //     //       }
    //     //       return networkResponse;
    //     //     });
    //     //   }),
    //     // );
  }
});

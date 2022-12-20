const CACHE_NAME = 'fed-cache';
self.addEventListener('install', function (event) {
    self.skipWaiting();
    // console.log("install service worker");
    // 创建和打开一个缓存库
    caches.open(CACHE_NAME);
    // 首页
    let cacheResources = ['https://panda.hocg.in'];
    event.waitUntil(
        // 请求资源并添加到缓存里面去
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(cacheResources);
        })
    );
});
self.addEventListener('fetch', (evt) => {
    // console.log('sw fetch() 发送的请求', evt.request.url)
})

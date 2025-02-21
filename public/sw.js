const CACHE_NAME = "QrappV1";


async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll([

    "/fallback.html",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});




self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function fetchHandler() {
      try {
        return await fetch(event.request);
      } catch {
        const cache = await caches.open(CACHE_NAME);
        return await cache.match('/fallback.html');
      }
    })()
  );
});



//notifications

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message!",
    icon: data.icon || "/icon.png",
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});


//solving delay loading

const ignore =  {image:1,audio:1,video:1,style:1,font:1};

self.addEventListener('fetch',e=>{
  const {request,clientId} = e;
  const {destination}=request;
  if(!clientId||ignore[destination]) return;
  e.waitUntil(
    self.clients.get(clientId).then(client=>
client.postMessage({
  fetchUrl:request.url,
  dest:destination
    }),
  ),
);
})
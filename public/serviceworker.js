
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});

self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                return cache.addAll(CACHE_URLS);
        })
    );
});

const CACHE_NAME = 'coursework-site';
const CACHE_URLS =  ['index.html',                      
                     '404.html',
                     'css1.css',
                     'CSS1.html',
                     'css2.css',
                     'CSS2.html',
                     'scripts/ECMAscript.js',
                     'ECMAscript.html',
                     'main.css',
                     'qualifications.html',
                     'pictures/aboutme.jpg', 
                     'pictures/contact.png',
                     'pictures/js.PNG',
                     'pictures/me.jpg',
                     'android-chrome-192x192.png',
                     'android-chrome-512x512.png'];



self.addEventListener('activate', function(event) {
event.waitUntil(
caches.keys().then(function(cacheNames) {
return Promise.all(
    cacheNames.map(function(cacheName) {
    if (cacheName.startsWith('coursework-site') && CACHE_NAME !== cacheName) {
        return caches.delete(cacheName);
    }
    })
);
})
);
});




self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});



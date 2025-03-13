// Service Worker - Minimal Setup with No Caching
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});
self.addEventListener("fetch", (event) => {
  // Let all fetch requests pass through without caching
  event.respondWith(fetch(event.request));
});

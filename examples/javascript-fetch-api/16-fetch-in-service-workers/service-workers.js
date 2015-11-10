this.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for ', event.request.url);
  if (event.request.url === 'http://localhost:8080/api/service-workers') {
    var myResponse = new Response('Hello World');
    return event.respondWith(myResponse);
  }
});

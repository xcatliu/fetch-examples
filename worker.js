var http = require('http');
var ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: __dirname })
).listen(8080);

console.log('http://localhost:8080');

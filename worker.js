var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/data.json', function(req, res) {
  res.json({
    hello: 'world'
  });
  res.end();
});

app.post('/api/post', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.json(req.body);
  res.end();
});

app.post('/api/upload', upload.single('file'), function(req, res) {
  console.log(req.file);
  console.log(req.body);
  res.json({
    file: req.file.originalname,
    body: req.body
  });
  res.end();
});

app.all('*', function(req, res, next) {
  console.log(req.url);
  next();
});

app.use(ecstatic({ root: __dirname }));

http.createServer(app).listen(8080);

console.log('http://localhost:8080/examples');

var app2 = express();

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app2.all('/api/post', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', true);
  res.json(req.body);
  res.end();
});

http.createServer(app2).listen(8090);

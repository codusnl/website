const express = require('express');
// const url = require('url');
const yves = require('yves');
const request = require('request');
const app = express();
const apicache = require('apicache')
const cache = apicache.middleware

app.get('/content/*', cache('5 minutes'), function(req, res){
  yves(req.originalUrl)
  request.get('https://raw.githubusercontent.com/codusnl/website/master'+req.originalUrl).pipe(res);
  // const parsed = url.parse(req.originalUrl)
  // res.sendFile(parsed.pathname, {root: '.'});
});


app.use(express.static(__dirname + '/build/bundled'));

app.get('/', function(req, res){
  res.sendFile("index.html", {root: '.'});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Codus app listening on port '+(process.env.PORT || 3000));
});
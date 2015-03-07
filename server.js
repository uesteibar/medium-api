var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var medium = require('./scrapers/medium-scraper');

app.use(bodyParser.json());

var router = express.Router();
app.use(router);

// Allow CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/user/:username', medium.getUser);
app.get('/user/:username/info', medium.getUserInfo);
app.get('/posts/:tag/:limit', medium.getPostsByTag);


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Medium API listening on ' + port);
});
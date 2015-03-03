var express = require('express');
var app = express();

var scrp = require('./scrapers/medium-scraper');

scrp.getUserInfo('uesteibar');
// var options = {
// 	tag: 'tech',
// 	limit: 1
// };
// scrp.getPostsByTag(options);


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Medium API listening on ' + port);
});
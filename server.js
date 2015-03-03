var express = require('express');
var app = express();

var scrp = require('./controllers/medium-scraper');

// scrp.getUser('uesteibar');
var options = {
	tag: 'tech',
	limit: 1
};
scrp.getPostsByTag(options);


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Medium API listening on ' + port);
});
var request = require('request-json');
var normalizer = require('./normalizers/medium-normalizer');

var medium = request.createClient('http://www.medium.com');

exports.getUser = function(req, res) {
	medium.get('/@' + req.params.username + '?format=json', function(err, response, body){
		var user = JSON.parse(body.substring(16)).payload;
		user = normalizer.normalizeUser(user);
		res.status(200).jsonp(user);
	});
};

exports.getUserInfo = function(req, res) {
	medium.get('/@' + req.params.username + '?format=json', function(err, respones, body){
		var user = JSON.parse(body.substring(16)).payload.value;
		user = normalizer.normalizeUserInfo(user);
		res.status(200).jsonp(user);
	});
};

exports.getPostsByTag = function(req, res) {
	medium.get('/tag/' + req.params.tag + '?' + getLimitCondition(req.params.limit) + 'format=json', function(err, response, body){
		var posts = JSON.parse(body.substring(16)).payload.value;
		posts = completePosts(posts, res);
		res.status(200).jsonp(posts);
	});
};

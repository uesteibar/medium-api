var request = require('request-json');
var medium = request.createClient('http://www.medium.com');

exports.getUser = function(req, res){
	medium.get('/@' + req.params.username + '?format=json', function(err, response, body){
		var user = JSON.parse(body.substring(16)).payload;
		user.latestPosts = completePosts(user.latestPosts);
		res.status(200).jsonp(user);
	});
};

exports.getUserInfo = function(req, res){
	medium.get('/@' + req.params.username + '?format=json', function(err, respones, body){
		var user = JSON.parse(body.substring(16)).payload.value;
		res.status(200).jsonp(user);
	});
};

exports.getPostsByTag = function(req, res){
	medium.get('/tag/' + req.params.tag + '?' + getLimitCondition(req.params.limit) + 'format=json', function(err, response, body){
		var posts = JSON.parse(body.substring(16)).payload.value;
		posts = completePosts(posts);
		console.log(posts);
		res.status(200).jsonp(posts);
	});
};



// PRIVATE
function getLimitCondition(limit){
	var limitCondition = '';
	if (limit > 0){
		limitCondition = 'limit=' + limit + '&';
	}
	return limitCondition;
}

function completePosts(posts){
	console.log(posts.length);
	for (var i = 0; i < posts.length; i++){
		medium.get('/' + posts[i].creatorId + '/' + posts[i].id + '?format=json', function(err, res, body){
			var postJSON = body.substring(16);
			posts[i] = JSON.parse(postJSON);
		});
		posts[i].url = 'http://www.medium.com/' + posts[i].creatorId + '/' + posts[i].id
		
	}
	return posts;
}
var request = require('request-json');
var medium = request.createClient('http://www.medium.com');

exports.getUser = function(username){
	medium.get('/@' + username + '?format=json', function(err, res, body){
		var user = JSON.parse(body.substring(16).payload.value);
		console.log(user);
	});
};

exports.getPostsByTag = function(options){
	medium.get('/tag/' + options.tag + '?' + getLimitCondition(options.limit) + 'format=json', function(err, res, body){
		var posts = JSON.parse(body.substring(16)).payload.value;
		posts = completePosts(posts);
		console.log(posts);
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
		
	}
	return posts;
}
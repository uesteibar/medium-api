var request = require('request-json');

var medium = request.createClient('http://www.medium.com');

exports.getLimitCondition = function(limit) {
	var limitCondition = '';
	if (limit > 0){
		limitCondition = 'limit=' + limit + '&';
	}
	return limitCondition;
};

exports.completePosts = function(posts) {
	for (var i = 0; i < posts.length; i++){
		medium.get('/' + posts[i].creatorId + '/' + posts[i].id + '?format=json', function(err, res, body){
			var postJSON = body.substring(16);
			posts[i] = JSON.parse(postJSON);
		});
		posts[i] = exports.normalizePost(posts[i]);
		posts[i].url = 'http://www.medium.com/' + posts[i].creatorId + '/' + posts[i].id		
	}
	return posts;
};

exports.normalizeUserInfo = function(user) {
	var normalizedUser = {
		userId: user.userId,
		name: user.name,
		username: user.username,
		twitter: 'http://twitter.com/' + user.twitterScreenName
	};
	return normalizedUser;
};

exports.normalizeUser = function(user) {
	var normalizedUser = exports.normalizeUserInfo(user.value);
	normalizedUser.latestPosts = exports.completePosts(user.latestPosts);
	return normalizedUser;
};


exports.normalizePost = function(post) {
	return post;
};
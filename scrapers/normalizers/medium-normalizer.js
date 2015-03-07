var request = require('request-json');

var medium = request.createClient('http://www.medium.com');

exports.getLimitCondition = function(limit) {
	var limitCondition = '';
	if (limit > 0){
		limitCondition = 'limit=' + limit + '&';
	}
	return limitCondition;
};

exports.completePosts = function(user, normalizedUser, result) {
	var posts = user.latestPosts;
	normalizedUser.posts = [];
	requestFinishedCount = 0;
	for (var i = 0; i < posts.length; i++){
		medium.get('/' + posts[i].creatorId + '/' + posts[i].id + '?format=json', function(err, res, body){
			var postJSON = body.substring(16);
			posts[i] = exports.normalizePost(JSON.parse(postJSON).payload.value);
			normalizedUser.posts.push(posts[i]);
			console.log();
			requestFinishedCount++;
			if ( requestFinishedCount == (posts.length - 1)) {
				result.status(200).jsonp(normalizedUser);
			}
		});
		console.log("SEPARADOR");
	}
	// return posts;
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

exports.normalizeUser = function(user, res) {
	var normalizedUser = exports.normalizeUserInfo(user.value);
	normalizedUser.latestPosts = exports.completePosts(user, normalizedUser, res);
};


exports.normalizePost = function(post) {
	var normalizedPost = {
		id: post.id,
		title: post.title,
		language: post.detectedLanguage,
		snippet: post.virtuals.snippet,
		wordCount: post.virtuals.wordCount,
		readingTime: post.virtuals.readingTime,
		url: 'http://www.medium.com/' + post.creatorId + '/' + post.id,
		content: normalizePostContent(post.content.bodyModel)
	};
	console.log(normalizedPost);

	return normalizedPost;
};

// Private

var normalizePostContent = function(content) {
	var normalizedContent = "";
	for (i = 1; i < content.paragraphs.length; i++) {
		normalizedContent += content.paragraphs[i].text + '\n\n';
	}
	return normalizedContent;
};
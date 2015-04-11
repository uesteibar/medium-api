
module.exports = function() {

	var files = {
		dev: {
			js: [
				'./server.js',
				'./scrapers/*.js',
				'./test/*.js',
			],
			testjs: [
				'./test/*.js'
			]
		}
	};

	return files;

};
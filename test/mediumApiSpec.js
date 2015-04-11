
var request = require('request');
var base_url = 'http://localhost:5000/';

var assert = require('chai').assert;

describe('Medium API', function () {
	
	describe('GET /user/:username', function () {

		it('should get the given user profile', function (done) {
			request.get(base_url + 'user/uesteibar', function(err, res, body) {
				if (err) return done(err);
				assert.equal(res.statusCode, 200);
				assert.equal(JSON.parse(body).username, 'uesteibar');
				done();
			});
		});

	});

});
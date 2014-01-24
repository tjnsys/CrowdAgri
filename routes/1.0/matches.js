var dbutil = require('../../lib/dbutil');
var assert = require('assert');

exports.get = function(req, res) {
	dbutil.findOne('matchings', req.param("id"), function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

exports.update = function(req, res) {
	var id = req.param("id");
	dbutil.findOne('matchings', id, function(err, response) {
		if (err != null) {
			console.error(err);
			res.send(JSON.stringify(response));
			return;
		}
		var params = {};
		for (var key in response.data) {
			params[key] = response.data[key];
		}
		for (var key in req.body) {
			params[key] = req.body[key];
		}
		dbutil.update('matchings', id, params, function(err, response) {
			if (err != null) {
				console.error(err);
			}
			//assert.equal(null, err);
			res.send(JSON.stringify(response));
		});
	});
}

exports.find = function(req, res) {
	dbutil.query('matchings', req.query, function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

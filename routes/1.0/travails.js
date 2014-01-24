var dbutil = require('../../lib/dbutil');
var assert = require('assert');

exports.get = function(req, res) {
	dbutil.findOne('travails', req.param("id"), function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

exports.put = function(req, res) {
	dbutil.insert('travails', req.body, function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

exports.find = function(req, res) {
	dbutil.query('travails', req.query, function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

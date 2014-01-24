var dbutil = require('../../lib/dbutil');
var assert = require('assert');

exports.get = function(req, res) {
	dbutil.findOne('helpers', req.param("id"), function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

exports.put = function(req, res) {
	var params = {};
	for (key in req.body) {
		params[key] = req.body[key];
	}
	if (req.files != null && req.files.image != null) {
		var imgPath = req.protocol + "://" + req.headers.host + "/" + req.files.image.path;
		params['imageURL'] = imgPath;
	}
	dbutil.insert('helpers', params, function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

exports.find = function(req, res) {
	dbutil.query('helpers', req.query, function(err, response) {
		if (err != null) {
			console.error(err);
		}
		//assert.equal(null, err);
		res.send(JSON.stringify(response));
	});
}

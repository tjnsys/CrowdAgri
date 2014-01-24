var dbutil = require('../../lib/dbutil');
var assert = require('assert');

exports.get = function(req, res) {
	var helperID = req.param("id");
	dbutil.query('matchings', { helper_id: helperID, done: 'true' }, function(err, response) {
		if (err != null) {
			console.error(err);
			res.send(JSON.stringify(response));
			return;
		}
		var matchings = response.data;
		dbutil.query('travails', {}, function(err, response) {
			if (err != null) {
				console.error(err);
				res.send(JSON.stringify(response));
				return;
			}
			var travails = response.data;
			dbutil.query('farmers', {}, function(err, response) {
				if (err != null) {
					console.error(err);
					res.send(JSON.stringify(response));
					return;
				}
				var history = [];
				var farmers = response.data;
				for (var i = 0; i < travails.length; i++) {
					var tid = travails[i]["_id"].toString();
					for (var j = 0; j < matchings.length; j++) {
						if (tid == matchings[j]["travail_id"]) {
							for (var k = 0; k < farmers.length; k++) {
								if (travails[i]["farmer_id"] == farmers[k]["_id"].toString()) {
									travails[i]["farmer"] = farmers[k];
									history.push(travails[i]);
									break;
								}
							}
							break;
						}
					}
				}
				var jsonresponse = {};
				jsonresponse["ok"] = true;
				jsonresponse["data"] = history;
				res.send(JSON.stringify(jsonresponse));
			});
		});
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

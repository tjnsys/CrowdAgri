var mongo = require('mongodb');
var assert = require('assert');
var MongoClient = mongo.MongoClient;
var Server = mongo.Server;
var ObjectID = mongo.ObjectID;
var DB_NAME = 'crowdagri';

exports.insert = function(collectionName, data, cbfunc) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		assert.equal(null, err);
		var db = mongoclient.db(DB_NAME);
		db.collection(collectionName).insert(data, function(err, result) {
			mongoclient.close();
			if (err == null) {
				assert.equal(1, result.length);
				var response = { ok: true, data: result[0] };
				cbfunc(err, response);
			} else {
				var response = { ok: false, err: err };
				cbfunc(err, response);
			}
		});
	});
}

exports.findOne = function(collectionName, id, cbfunc) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		assert.equal(null, err);
		var db = mongoclient.db(DB_NAME);
		db.collection(collectionName).findOne({_id: ObjectID(id)}, function(err, result) {
			mongoclient.close();
			if (err == null) {
				var response = { ok: true, data: result };
				cbfunc(err, response);
			} else {
				var response = { ok: false, err: err };
				cbfunc(err, response);
			}
		});
	});
}

exports.query = function(collectionName, query, cbfunc) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		assert.equal(null, err);
		var db = mongoclient.db(DB_NAME);
		db.collection(collectionName).find(query).toArray(function(err, result) {
			mongoclient.close();
			if (err == null) {
				var response = { ok: true, data: result };
				cbfunc(err, response);
			} else {
				var response = { ok: false, err: err };
				cbfunc(err, response);
			}
		});
	});
}

exports.update = function(collectionName, id, data, cbfunc) {
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		assert.equal(null, err);
		var db = mongoclient.db(DB_NAME);
		db.collection(collectionName).update({_id: ObjectID(id)}, data, function(err, result) {
			mongoclient.close();
			if (err == null) {
				assert.equal(1, result);
				var response = { ok: true };
				cbfunc(err, response);
			} else {
				var response = { ok: false, err: err };
				cbfunc(err, response);
			}
		});
	});
}


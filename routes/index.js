var test = require("./test");
var farmers = require("./1.0/farmers");
var helpers = require("./1.0/helpers");
var travails = require("./1.0/travails");
var offers = require("./1.0/offers");
var matches = require("./1.0/matches");
var histories = require("./1.0/histories");
var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', { title: 'CrowdAgri' });
};

exports.admin = function(req, res) {
	var type = req.param("type");
	var title = "CrowdAgri Admin";
	if (type == "top") {
		res.render('adminTop', { title: title });
	} else if (type == "menu") {
		res.render('adminMenu', { title: title });
	} else if (type == "main") {
		res.render('adminMain', { title: title });
	} else if (type == "farmer") {
		var dbutil = require("../lib/dbutil");
		dbutil.query("farmers", {}, function(err, result) {
			dbutil.query("travails", {}, function(err2, result2) {
				res.render('adminFarmer', { title: title, farmers: result.data, travails: result2.data });
			});
		});
	} else if (type == "helper") {
		var dbutil = require("../lib/dbutil");
		dbutil.query("helpers", {}, function(err, result) {
			dbutil.query("offers", {}, function(err2, result2) {
				res.render('adminHelper', { title: title, helpers: result.data, offers: result2.data });
			});
		});
	} else if (type == "match") {
		var dbutil = require("../lib/dbutil");
		dbutil.query("matchings", {}, function(err, result) {
			res.render('adminMatch', { title: title, matchings: result.data });
		});
	} else if (type == "camera") {
		var dbutil = require("../lib/dbutil");
		dbutil.query("helpers", {}, function(err, result) {
			res.render('face2face', { title: title, helpers: result.data });
		});
	}
};

// REST test
exports.rest = test.testfunc;

// farmers
exports.getFarmer = farmers.get;
exports.putFarmer = farmers.put;
exports.findFarmers = farmers.find;

// jobs
exports.getTravail = travails.get;
exports.putTravail = travails.put;
exports.findTravails = travails.find;

// helpers
exports.getHelper = helpers.get;
exports.putHelper = helpers.put;
exports.findHelpers = helpers.find;

// offers
exports.getOffer = offers.get;
exports.putOffer = offers.put;
exports.findOffers = offers.find;

// matchings
exports.getMatch = matches.get;
exports.updateMatch = matches.update;
exports.findMatches = matches.find;

// histories
exports.getHistories = histories.get;

// static images
exports.getImage = function(req, res) {
	//var lookup = path.basename(decodeURI(req.url));
	var file = './uploaded_images/' + req.param("name");
	fs.exists(file, function (exists) {
		if (exists) {
			fs.readFile(file, function(err, data) {
				if (err) {
					res.writeHead(500);
					res.end("Error reading image: %s", file);
					return;
				}
				var headers = {'Content-Type': "image/jpeg"};
				res.writeHead(200, headers);
				res.end(data);
			});
			return;
		} else {
			res.writeHead(404);
			res.end('Not found.');
		}
	});
}

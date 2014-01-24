var dbutil = require('./lib/dbutil');
var assert = require('assert');

exports.match = function() {
	console.log("DO MATCH");
	dbutil.query('travails', {}, function(err, result) {
		assert.equal(null, err);
		var travails = result.data;
		travails.forEach(function(travail) {
			dbutil.query('offers', {}, function(err2, result2) {
				assert.equal(null, err2);
				var offers = result2.data;
				offers.some(function(offer) {
					var tid = travail["_id"].toString();
					var oid = offer["_id"].toString();
					if (matches(travail, offer)) {
						console.log("match: %s - %s", tid, oid);
						var hid = offer["helper_id"];
						if (travail.offers == null) {
							travail.offers = [ oid ];
						} else {
							travail.offers.push(oid);
						}
						offer["done"] = true;
						dbutil.insert('matchings', { travail_id: tid, offer_id: oid, helper_id: hid, done: false }, function(err3, data3) {
							dbutil.update('travails', tid, travail, function(err4, data4) {
							});
							dbutil.update('offers', oid, offer, function(err4, data4) {
							});
						});
						// TODO need to wait until update finishes
						return true;
					} else {
						console.log("unmatch: %s - %s", tid, oid);
						return false;
					}
				});
			});
		});
	});
}

function matches(travail, offer) {
	if (travail.offers == null) return true;
	if (offer["done"] == true) return false;
	if (travail.offers.indexOf(offer["_id"].toString()) >= 0) return false;
	// TODO need to consider each conditions
	return (travail.size > travail.offers.length);
	if (travail.date_start < offer.date_start) return false;
	if (travail.date_end > offer.date_end) return false;
	if (offer.type != "なんでも" && offer.type != travail.type) return false;
	if (offer.room == "on" && travail.room != "on") return false;
	if (offer.meal == "on" && travail.meal != "on") return false;
	if (offer.souvenir == "on" && travail.souvenir != "on") return false;
	return true;
}

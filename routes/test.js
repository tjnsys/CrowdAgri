exports.testfunc = function(req, res) {
	var key1 = req.param("key1");
	var key2 = req.param("key2");
	var key3 = req.param("key3");
	var getkey = (req.query)? req.query["getkey"]: "no gkey";
	var postkey = (req.body)? req.body["postkey"]: "no pkey";
	console.log("key1: %s, key2: %s, key3: %s, getkey: %s, postkey: %s", key1, key2, key3, getkey, postkey);
	res.render('test', { title: 'test', key1: key1, key2: key2, key3: key3, getkey: getkey, postkey: postkey });
}

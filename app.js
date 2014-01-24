
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var log4js = require('log4js');
var matcher = require('./matcher');

log4js.configure({'appenders': [ {type: 'console'} ], replaceConsole: 'true'});
var logger = log4js.getLogger('CrowdAgri');

var app = express();

// all environments
app.set('port', process.env.PORT || 10080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(log4js.connectLogger(logger, {level: log4js.levels.DEBUG, nolog: ['\\.css', '\\.js', '\\.gif'], format: ':remote-addr - - ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent" ":req[cookie]"'}));
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser({uploadDir: "./uploaded_images"}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}

app.get('/', routes.index);
app.get('/admin/:type', routes.admin);
app.get('/test/:key1/:key2/:key3', routes.rest);
app.post('/test/:key1/:key2/:key3', routes.rest);
// handle farmers
app.get('/1.0/farmer/:id', routes.getFarmer);
app.post('/1.0/farmer', routes.putFarmer);
app.get('/1.0/farmers', routes.findFarmers);
// handler helpers
app.get('/1.0/helper/:id', routes.getHelper);
app.post('/1.0/helper', routes.putHelper);
app.get('/1.0/helpers', routes.findHelpers);
// handle jobs
app.get('/1.0/travail/:id', routes.getTravail);
app.post('/1.0/travail', routes.putTravail);
app.get('/1.0/travails', routes.findTravails);
// handle offers
app.get('/1.0/offer/:id', routes.getOffer);
app.post('/1.0/offer', routes.putOffer);
app.get('/1.0/offers', routes.findOffers);
// handle matchings
app.get('/1.0/match/:id', routes.getMatch);
app.post('/1.0/match/:id', routes.updateMatch);
app.get('/1.0/matches', routes.findMatches);
// handle histories
app.get('/1.0/histories/:id', routes.getHistories);

// static images
app.get('/uploaded_images/:name', routes.getImage);

process.on('uncaughtException', function(err) {
	console.error('UNHANDLED EXCEPTION: ' + err);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('CrowdAgri started listening on port ' + app.get('port'));
});

//setInterval(matcher.match, 2000);

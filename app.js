var express = require('express');
var app = express();

// Set the port for our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// Set the home page route
app.get('/', function(req, res) {
	// Ejs render automatically looks in the views folder
	res.render('index');
});

// GET method route
app.get('/test', function (req, res) {
	res.send('GET request to the homepage');
});

// POST method route
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my-super-secret') {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong validation token');
	}
});

app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging;

	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i];
		sender = event.sender.id;

		if (event.message && event.message.text) {
			text = event.message.text;
			// Handle a text message from this sender
		}
	}

	res.sendStatus(200);
});

app.listen(port, function () {
	console.log('Node-Messenger-Bot app is running on http://localhost:' + port);
});

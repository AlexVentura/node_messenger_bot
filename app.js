// Modules needed in the app
var express = require('express');
var bodyParser = require('body-parser');
var answers = require('./services/answers-service.js');

// Creating our main app
var app = express();

// Set the port for our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// Set the home page route
app.get('/', function(req, res) {
	// Ejs render automatically looks in the views folder
	res.render('index');
});

// GET method route for testing the routes
app.get('/test', function (req, res) {
	res.send('GET request to the homepage');
});

// POST method route fot Verify the communication
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my-super-secret') {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong validation token');
	}
});

// For getting the entry messages
app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging;

	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i];
		sender = event.sender.id;

		if (event.message && event.message.text) {
			text = event.message.text;
			// Handle a text message from this sender
			console.log('▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸▸', text);

			// Send back a Structured Message if user sends a message "Generic".
			if (text === 'Generic') {
				answers.sendGenericMessage(sender);
				continue;
			} else {
				answers.sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
			}
		}
	}

	res.sendStatus(200);
});

app.listen(port, function () {
	console.log('Node-Messenger-Bot app is running on http://localhost:' + port);
});

var express = require('express');
var app = express();

// Set the port for our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// GET method route
app.get('/', function (req, res) {
	res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
	res.send('POST request to the homepage');
});

app.listen(port, function () {
	console.log('Node-Messenger-Bot app is running on http://localhost:' + port);
});

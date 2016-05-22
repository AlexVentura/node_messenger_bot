// Modules needed in the app
var request = require('request');

var token = "EAADRjs5WP3YBAFP5aemks1L5qNrjGKvHkSc4IGB3XwVZBoIkdhRuwo26vfpXrFhMYZC3ZC8kJZCVIqixciMyemvZC7ZBhdR8uhfmYTIhVzTRghDZApkwbukRBj0WLFzQoLvL3uUEqKneb3n7xM4rJDFBeggUu3tCipTRhOMZBxIO3AZDZD";

// Below is a function that will send back a text message with whatever we send to the page.
module.exports.sendTextMessage = (sender, text) => {

	messageData = {
		text:text
	}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: messageData,
		}
	}, (error, response, body) => {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});

};

module.exports.sendGenericMessage = (sender) => {

	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com/",
						"title": "Web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				},{
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	};

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: token },
		method: 'POST',
		json: {
			recipient: { id: sender },
			message: messageData,
		}
	}, (error, response, body) => {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});

};

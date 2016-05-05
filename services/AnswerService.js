// AnswerService.js - in services/services
// Modules needed in the app
var request = require('request');

var token = "EAADRjs5WP3YBAFP5aemks1L5qNrjGKvHkSc4IGB3XwVZBoIkdhRuwo26vfpXrFhMYZC3ZC8kJZCVIqixciMyemvZC7ZBhdR8uhfmYTIhVzTRghDZApkwbukRBj0WLFzQoLvL3uUEqKneb3n7xM4rJDFBeggUu3tCipTRhOMZBxIO3AZDZD";

module.exports.sendTextMessage = function (sender, text) {

	messageData = {
		text:text
	}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token:token },
		method: 'POST',
		json: {
			recipient: { id:sender },
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending message: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});

};

// Modules needed in the app
var request = require('request');

module.exports.executeSearch = (criteria, callback) => {

	var res = '';
	var options = {
		baseUrl: 'https://en.wikipedia.org',
		uri: '/w/api.php',
		method: 'GET',
		json: true,
		headers: {
			// 'User-Agent': 'request',
			// 'Authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
		},
		qs: {
			action: 'opensearch',
			search: criteria,
			format: 'json'
		}
	};

	request(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res = body;
		} else {
			res = 'Not Found';
		}

		callback(res);
	});

};

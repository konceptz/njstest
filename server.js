/*
 *I am the server
 */

var qs = require('querystring');
var http = require('http');
var sleep = require('sleep');

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


var processRequest = function(req, callback) {
	var body = '';
	req.on('data', function (data) {
			body += data;
			});
	req.on('end', function () {
			callback(qs.parse(body));
			});
}


http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		processRequest(req, function(data) {
			var controllerRequest = new Object();
			console.log(data);
				res.end(Jdata);
			});
			

		});

		}).listen(8080);

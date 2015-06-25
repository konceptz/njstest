/*
 *I am the server
 */

/*
This is how to include/require modules
var sleep = require('sleep');
*/

var qs = require('querystring');
var http = require('http');
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
        res.write(JSON.stringify(req.headers));
        res.write(JSON.stringify(req.body));
		processRequest(req, function(data) {
			var controllerRequest = new Object();
                res.write("hello");
				res.end();
			});
		}).listen(8080);

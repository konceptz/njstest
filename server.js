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


var runTests = function(request, callback){


	var Repeat = require("repeat");
	var count = 0;
	//console.log(request);
	var results = {};
	var instances = parseInt(request.instances);
	//console.log(instances);
	var delay = parseInt(request.delay);
	var length = delay * instances;
	console.log(delay);
	console.log(length);
	Repeat ( function() {
			
		var thisInstance = request.rdic_server;
		var postData={
			
			filename: request.filename,
			random_key: request.random_key,
			challenges: request.challenges,
			s3_general_key : request.s3_general_key,
			s3_main_access_token: request.s3_main_access_token,
			s3_main_access_timestamp: request.s3_main_access_timestamp,
			s3_tag_access_token: request.s3_tag_access_token,
			s3_tag_access_timestamp: request.s3_tag_access_timestamp,
			number_of_blocks: request.number_of_blocks,
			blocksize: request.blocksize,
			servername: request.servername,
			tagfile: request.tagfile,
			prime: request.prime,
			debug: request.debug,
			rdic_server: request.rdic_server
		};
		var bot = "http://" + thisInstance + "/phpapp/porControlled.php";

		require("request").post({
				uri:bot,
				headers:{'content-type': 'application/x-www-form-urlencoded'},
				body:require('querystring').stringify(postData)
				},
			function(err,res,body){
				console.log("adding " + count);
				results[count] = JSON.parse(body);
				count++;
				//if (Object.size(results) >= instances){
				if (Object.size(results) == 5){
				//console.log("calling back to PHP");
					callback(results);
				}
			});
		}).every(delay, 'ms').for(length, 'ms').start.now();/*.then(function(){
			//console.log(results);
			callback(results)
			});*/
	
}

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
			for (var key in data){
			controllerRequest = JSON.parse(key);	
			}
			runTests(controllerRequest, function(results){
				console.log("calling back to PHP");

				res.end(JSON.stringify(results));
			});
			

		});

		}).listen(8080);

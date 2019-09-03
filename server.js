var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if(request.method == 'GET' && parsedUrl.pathname == '/listings') {
  	// send ok message to request
  	 response.writeHead(200, {
  		'Content-Type': 'application/json'});
  	response.end(listingData);
  } else {
  	// send error message to request
  	  response.writeHead(404, {
  		'Content-Type': 'text/plain'});
  	response.end('Bad gateway error')
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
	// check for error
	if(err) throw err;

	// save data
	listingData = data;

	// create server
	server = http.createServer(requestHandler);

	// start server
	server.listen(port, function() {
		console.log('server listening on: http://localhost:' + port);
	});
});

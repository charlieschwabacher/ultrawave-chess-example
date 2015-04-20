var UltrawaveServer = require('ultrawave/server');
var static = require('node-static');
var http = require('http')


// run a peering server

var ultrawaveServer = new UltrawaveServer(8081);



// serve static files

console.log('serving static files from port 8080');

var file = new static.Server('./public');

http.createServer(function(request, response) {
  request.addListener('end', function() {
    file.serve(request, response);
  }).resume();
}).listen(8080);

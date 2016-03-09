var https = require('https');
var fs = require('fs');
var path = require('path');
var url = require('url');


port = 8443
cert = 		 path.join(process.cwd(), 'keys', 'cert.pem');
privateKey = path.join(process.cwd(), 'keys', 'privatekey_nopass.pem');

var options = {
  key: fs.readFileSync(privateKey),
  cert: fs.readFileSync(cert)
};

var a = https.createServer(options, function (request, response) {

  var uri = url.parse(request.url).pathname, 
  filename = path.join(process.cwd(), uri);
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
	  console.log ( 'not found');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
		console.log ( 'error: '+ err);
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
	  console.log (  'serving file: '+ filename);
      response.end();
    });
  });
}).listen(port);



console.log("Server Running at\n  => https://localhost:" + port + "/\nPress CTRL + C to shutdown");

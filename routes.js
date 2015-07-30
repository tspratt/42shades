/**
 * Contains HTTP handlers for admin authentication functionality
 */
"use strict";
var business = require('./business');

var StatusResponse = require('./lib/statusResponse').StatusResponse;


function isAlive(request, response){
	business.isAlive(function(err, statusResponse) {
		response.writeHead(200, 'success', {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'});
		response.end(JSON.stringify(statusResponse));
	});
}

function insertMembers(request, response) {
	business.insertMembers(function(err, statusResponse) {
		response.writeHead(200, 'success', {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'});
		response.end(JSON.stringify(statusResponse));
	})
}
exports.isAlive = isAlive;
exports.insertMembers = insertMembers;

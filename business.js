/**
 * Contains business logic functions for shell app
 */
"use strict";
var StatusResponse = require('./lib/statusResponse').StatusResponse;

var async = require('async');
var model = require('./model');


function isAlive(callback){
	var oData = {};
	var statusResponse = new StatusResponse('success','isAlive','','business',oData);
	callback(null, statusResponse);

}

function listAllMembers(callback){
	model.listAllMembers(function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','listAllMembers','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','listAllMembers','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function insertMembers(callback){
	model.insertMembers(callback);

}


exports.isAlive = isAlive;
exports.listAllMembers = listAllMembers;
exports.insertMembers = insertMembers;




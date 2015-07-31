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

function listMembersPaged(pageSpec, callback){
	model.listMembersPaged(pageSpec,function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','listMembersPaged','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','listMembersPaged','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function listMembers(filterSpec,pageSpec, callback){
	model.listMembers(filterSpec, pageSpec,function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','listMembers','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','listMembers','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function insertMembers(callback){
	model.insertMembers(callback);

}


exports.isAlive = isAlive;
exports.listMembers = listMembers;
exports.listAllMembers = listAllMembers;
exports.listMembersPaged = listMembersPaged;
exports.insertMembers = insertMembers;




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


function listMembers(filterSpec,pageSpec, fieldSpec, callback){
	fieldSpec = fieldSpec || {};																							//send an empty object if parameter not provided
	model.listMembers(filterSpec, pageSpec, fieldSpec, function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','listMembers','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','listMembers','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function filterMembersByName(matchString, callback){
	model.filterMembersByName(matchString,function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','filterMembersByName','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','filterMembersByName','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function getMember(id, callback){
	model.getMember(id,function(err, aMembers){
		if (err) {
			var statusResponse = new StatusResponse('error','v','','business',err);
		}
		else {
			var statusResponse = new StatusResponse('success','getMember','','business',aMembers);
		}

		callback(err,statusResponse);
	});
}

function insertMembers(callback){
	model.insertMembers(callback);

}

exports.getMember = getMember;
exports.filterMembersByName = filterMembersByName;
exports.isAlive = isAlive;
exports.listMembers = listMembers;
//exports.insertMembers = insertMembers;




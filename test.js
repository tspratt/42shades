// © 2013 Triton Digital, Inc.
"use strict";
var chai = require("chai");
var expect = chai.expect;
var packageJson = require('./package.json');
var model = require('./model');
var ObjectId = require('mongodb').ObjectID;
var business = require('./business');

var StatusResponse = require('./lib/statusResponse').StatusResponse;
var prevValue = '';

function asyncAssertionCheck(done, f) {
	try {
		f();
		done();
	} catch(e) {
		done(e);
	}
}

describe('Setup tests', function () {
	this.timeout(0);
	before(function (done) {
		model.initDb(
				function (err) {
					if (err) {
						var statusResponse = new StatusResponse('error', 'System Error. Please try again', '', 'initDb', err);
						console.log(JSON.stringify(statusResponse));
						done(err);
					}
					else {
						console.log('initDb SUCCESS');
						done();
					}
				}
		);
	});//before

	describe('Test isAlive (business)',
			function () {
				it('should return a success status response', function (done) {
					business.isAlive(
							function (err, statusResponse) {
								asyncAssertionCheck(done, function () {
									expect(err).to.not.exist;
									expect(statusResponse.data).to.exist;
									expect(statusResponse.status).to.equal('success');
								});
							}
					);
				});
			}
	);

	describe('Test Data Access (business)',
		function () {
			it('should return a list of all members', function (done) {
				business.listMembers(null,null, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
						});
					}
				);
			});

			it('should return a page of 10 members', function (done) {
				var pageSpec = {pageLength:10, pageNum: 0};
				business.listMembers(null, pageSpec, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(pageSpec.pageLength);
							prevValue = statusResponse.data[0]._id;																//for compare later
						});
					}
				);
			});
			it('should return a different page of 10 members', function (done) {
				var pageSpec = {pageLength:10, pageNum: 1};
				business.listMembers(null, pageSpec, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(pageSpec.pageLength);
							expect(statusResponse.data[0]._id).to.not.equal(prevValue);
						});
					}
				);
			});
			it('should return a page of 10 members with reduced payload', function (done) {
				var pageSpec = {pageLength:10, pageNum: 1};
				business.listMembers(null, pageSpec, {first_name:1, last_name:1},
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(pageSpec.pageLength);
							expect(statusResponse.data[0].city).to.not.exist;
						});
					}
				);
			});
			it('should return a page of 20 members', function (done) {
				var pageSpec = {pageLength:20, pageNum: 0};
				business.listMembers(null, pageSpec, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(pageSpec.pageLength);
						});
					}
				);
			});
			it('should return a page of 50 members', function (done) {
				var pageSpec = {pageLength:50, pageNum: 0};
				business.listMembers(null, pageSpec, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(pageSpec.pageLength);
							prevValue = statusResponse.data.length;																//for compare later
						});
					}
				);
			});
			it('should return a page of members, filtered by state=GA', function (done) {
				var filterSpec = {field:'state', value: 'GA'};
				var pageSpec = {pageLength:50, pageNum: 0};
				business.listMembers(filterSpec,pageSpec, null,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.be.lessThan(prevValue);
						});
					}
				);
			});
			it('should return filtered list using contains', function (done) {
				var matchString = 'han';
				business.filterMembersByName(matchString, {},
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							var elem0 = statusResponse.data[0];
							var sTmp = elem0.first_name + elem0.last_name;
							expect(sTmp.indexOf(matchString)).to.be.greaterThan(-1);  //make sure our match string is in our result somewhere
						});
					}
				);
			});
			it('should return filtered list with reduced payload', function (done) {
				var matchString = 'han';
				business.filterMembersByName(matchString, {first_name:1, last_name:1},
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data[0].city).to.not.exist;
						});
					}
				);
			});
			it('should return a single document by Id', function (done) {
				var id = '55b996ead4dbc1641d7239bd';
				business.getMember(id,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.object;
							expect(statusResponse.data._id.toString()).to.equal(id);  //make sure our match string is in our result somewhere
						});
					}
				);
			});
		}
	);

});

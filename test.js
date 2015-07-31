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
				business.listAllMembers(
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							prevValue = statusResponse.data.length;
						});
					}
				);
			});
			it('should return a page of 10 members', function (done) {
				var pageSpec = {pageLength:10, pageNum: 0};
				business.listMembersPaged(pageSpec,
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
			it('should return a page of 20 members', function (done) {
				var pageSpec = {pageLength:20, pageNum: 0};
				business.listMembersPaged(pageSpec,
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
				business.listMembersPaged(pageSpec,
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
			it('should return a page of All members with null pageSpec', function (done) {
				var pageSpec = null;
				business.listMembersPaged(pageSpec,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							expect(statusResponse.data.length).to.equal(prevValue);
						});
					}
				);
			});
			it('should return a page filtered of members', function (done) {
				var filterSpec = {field:'state', value: 'GA'};
				var pageSpec = {pageLength:50, pageNum: 0};
				business.listMembers(filterSpec,pageSpec,
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
				business.filterMembersByName(matchString,
					function (err, statusResponse) {
						asyncAssertionCheck(done, function () {
							var elem0 = statusResponse.data[0];
							expect(err).to.not.exist;
							expect(statusResponse.data).to.exist;
							expect(statusResponse.data).to.be.an.array;
							var sTmp = elem0.first_name + elem0.last_name;
							expect(sTmp.indexOf(matchString)).to.be.greaterThan(-1);  //make sure our match string is in our result somewhere
						});
					}
				);
			});
			it.only('should return a single document by Id', function (done) {
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

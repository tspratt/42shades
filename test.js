// © 2013 Triton Digital, Inc.
"use strict";
var chai = require("chai");
var expect = chai.expect;
var packageJson = require('./package.json');
var model = require('./model');

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

describe('Shell Functionality', function () {
	this.timeout(0);
	before(function (done) {
		model.initDb(
				function (err) {
					if (err) {
						var statusResponse = new StatusResponse('error', 'System Error. Please try again', constants.STATUS_CODE_UNSPECIFIED, 'initDb', err);
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
		}
	);

});

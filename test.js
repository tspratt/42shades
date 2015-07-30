// © 2013 Triton Digital, Inc.
"use strict";
var chai = require("chai");
var expect = chai.expect;
var packageJson = require('./package.json');
var model = require('./model');

var business = require('./business');

var StatusResponse = require('./lib/statusResponse').StatusResponse;

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
						});
					}
				);
			});
		}
	);

});

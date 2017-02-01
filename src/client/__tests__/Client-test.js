/* global jest, describe, beforeEach, afterEach, it, expect */

jest.autoMockOff();

var Promise = require('bluebird');

function verify(promise) {
    return Promise.resolve(promise)
        .then(function() {
            expect(true).toBeFalsy();
        })
        .catch(function(error) {
            expect(error.status).toBe(405);
            expect(error.message).toBe('Method Not Supported!');
        });
}

describe('Client', function() {
    var Client;
    var c;

    beforeEach(function() {
        Client = require('../Client.js');
        c = new Client();
    });

    afterEach(function() {
        jest.runAllTicks();
    });

    it('returns a promise on create that throws 405', function() {
        return verify(c.create());
    });

    it('returns a promise on read that throws 405', function() {
        return verify(c.read());
    });

    it('returns a promise on update that throws 405', function() {
        return verify(c.update());
    });

    it('returns a promise on delete that throws 405', function() {
        return verify(c.delete());
    });
});

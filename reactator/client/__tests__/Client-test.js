/* global jest, describe, afterEach, beforeEach, require, it, expect */

jest.autoMockOff();

var Q = require('../../lib/q.js');

function verify(promise) {
    Q(promise)
        .then(function() {
            expect(true).toBeFalsy();
        })
        .catch(function(error) {
            expect(error.status).toBe(400);
            expect(error.message).toBe('Method not implemented!');
        })
        .done();
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

    it('returns a promise on create that throws 400', function() {
        verify(c.create());
    });

    it('returns a promise on read that throws 400', function() {
        verify(c.read());
    });

    it('returns a promise on update that throws 400', function() {
        verify(c.update());
    });

    it('returns a promise on delete that throws 400', function() {
        verify(c.delete());
    });
});

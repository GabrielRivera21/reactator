/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('ClientError', function() {
    var ClientError;

    beforeEach(function() {
        ClientError = require('../ClientError.js');
    });

    it('creates a new object even without arguments', function() {
        var error = new ClientError();

        expect(error.name).toBe('ClientError');
        expect(error.status).toBe(400);
        expect(error.message).toBeDefined();
        expect(error.request).toBeDefined();
    });

    it('creates a error object with values passed in', function() {
        var error = new ClientError('foo', 'bar', 'yay');

        expect(error.name).toBe('ClientError');
        expect(error.status).toBe('foo');
        expect(error.message).toBe('bar');
        expect(error.request).toBe('yay');
    });

    it('is unauthroized only with status 401', function() {
        var error1 = new ClientError();
        var error2 = new ClientError(401);

        expect(error1.isUnauthorized()).toBeFalsy();
        expect(error2.isUnauthorized()).toBeTruthy();
    });

    it('is forbidden only with status 403', function() {
        var error1 = new ClientError();
        var error2 = new ClientError(403);

        expect(error1.isForbidden()).toBeFalsy();
        expect(error2.isForbidden()).toBeTruthy();
    });

    it('is not found only with status 404', function() {
        var error1 = new ClientError();
        var error2 = new ClientError(404);

        expect(error1.isNotFound()).toBeFalsy();
        expect(error2.isNotFound()).toBeTruthy();
    });

    it('is service unavailable only with status 503', function() {
        var error1 = new ClientError();
        var error2 = new ClientError(503);

        expect(error1.isServiceUnavailable()).toBeFalsy();
        expect(error2.isServiceUnavailable()).toBeTruthy();
    });
});

/* global jest, describe, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();

describe('ClientResponse', function() {
    var ClientResponse;

    beforeEach(function() {
        ClientResponse = require('../ClientResponse.js');
    });

    it('creates a new object even without arguments', function() {
        var response = new ClientResponse();
        expect(typeof(response.metaData)).toBe("object");
    });

    it('creates a response object with values passed in', function() {
        var response = new ClientResponse('foo', 'bar', 'yay');
        expect(response.value).toBe('foo');
        expect(response.status).toBe('bar');
        expect(response.metaData).toBe('yay');
    });
});

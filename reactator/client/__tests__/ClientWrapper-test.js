/* global jest, describe, afterEach, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint newcap:false, unused:false, -W024, -W097 */
"use strict";

jest.autoMockOff();

describe('ClientWrapper', function() {
    var Client;
    var ClientWrapper;
    var mockClient;
    var c;

    beforeEach(function() {
        Client = require('../Client.js');
        ClientWrapper = require('../ClientWrapper.js');

        mockClient = new Client();
        mockClient.create = jest.genMockFunction();
        mockClient.read = jest.genMockFunction();
        mockClient.update = jest.genMockFunction();
        mockClient.delete = jest.genMockFunction();

        c = new ClientWrapper(mockClient);
    });

    afterEach(function() {
        jest.runAllTicks();
    });

    it('can wrap subclass of client', function() {
        var AjaxClient = require('../AjaxClient.js');
        var ac = new AjaxClient('uri');
        c = new ClientWrapper(ac);
        expect(c.client).toBe(ac);
    });

    it('throws error on invalid client', function() {
        var client;
        try {
            client = new ClientWrapper("invalid");
        } catch (err) {
        }

        expect(client).toBeUndefined();
    });

    it('calls wrapped client\'s create', function() {
        c.create('foo');

        expect(mockClient.create.mock.calls.length).toBe(1);
    });

    it('calls wrapped client\'s read', function() {
        c.read('foo');

        expect(mockClient.read.mock.calls.length).toBe(1);
    });

    it('calls wrapped client\'s update', function() {
        c.update('foo', 'bar');

        expect(mockClient.update.mock.calls.length).toBe(1);
    });

    it('calls wrapped client\'s delete', function() {
        c.delete('foo');

        expect(mockClient.delete.mock.calls.length).toBe(1);
    });
});

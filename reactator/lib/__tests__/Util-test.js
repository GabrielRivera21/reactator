/* global jest, describe, beforeEach, require, it, expect */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();

describe('Util', function() {
    var EventEmitter;
    var U;

    beforeEach(function() {
        U = require('../Util.js');
        EventEmitter = require('events').EventEmitter;
    });

    it('should return list of missing files on verifyRequiredFunctions', function() {
        var a = {
            foo: function() {},
            bar: function() {}
        };

        var missing = U.verifyRequiredFunctions('Test', a, ['hello', 'world', 'foo']);

        expect(missing.length).toBe(2);
        expect(missing[0]).toBe('hello');
        expect(missing[1]).toBe('world');
    });

    it('generates guids wit different values', function() {
        expect(U.guid()).not.toBe(U.guid());
    });

    it('should register/remove listeners and bind function accordingly on addListeners and removeListeners', function() {
        /* eslint no-invalid-this: 0 */

        var emitter = new EventEmitter();
        var self = {foo: 'bar'};
        var listener1 = jest.genMockFunction();
        var listeners1 = U.addListeners(emitter, ['change'], function() {listener1(this);}, self);

        var listener2 = jest.genMockFunction();

        U.addListeners(emitter, ['change'], function() {listener2(this);}, self);

        emitter.emit('change');

        expect(listener1.mock.calls.length).toBe(1);
        expect(listener1.mock.calls[0][0]).toBe(self);

        U.removeListeners(emitter, listeners1);
        emitter.emit('change');

        expect(listener1.mock.calls.length).toBe(1);
        expect(listener1.mock.calls[0][0]).toBe(self);

        expect(listener2.mock.calls.length).toBe(2);
        expect(listener2.mock.calls[0][0]).toBe(self);
        expect(listener2.mock.calls[1][0]).toBe(self);
    });
});

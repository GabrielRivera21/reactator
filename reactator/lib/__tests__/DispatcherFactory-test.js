/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('DispatcherFactory', function() {
    var DispatcherFactory;

    beforeEach(function() {
        DispatcherFactory = require('../DispatcherFactory.js');
    });

    it('creates dispatchers with the specified name', function() {
        var dispatcher = DispatcherFactory.create('foo');

        expect(dispatcher.name).toBe('foo');
    });

    it('reuses already created dispatcher if name is the same', function() {
        var dispatcher1 = DispatcherFactory.create('foo');

        var now = new Date();

        dispatcher1.bar = now;

        var dispatcher2 = DispatcherFactory.create('foo');

        expect(dispatcher1.bar).toBe(dispatcher2.bar);
    });

    it('can be registered with', function() {
        var dispatcher = DispatcherFactory.create('foo');
        var listener1 = jest.genMockFunction();
        var listener2 = jest.genMockFunction();

        var token1 = dispatcher.register(listener1);
        var token2 = dispatcher.register(listener2);

        expect(token1).not.toBe(token2);

        dispatcher.dispatch({});

        expect(listener1.mock.calls.length).toBe(1);
        expect(listener2.mock.calls.length).toBe(1);
    });
});

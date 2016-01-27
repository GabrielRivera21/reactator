/* global require, jest, describe, beforeEach, it, expect */

/* jshint -W097 */
"use strict";

jest.autoMockOff();

describe('Store', function() {
    var Store;
    var DispatcherFactory;

    beforeEach(function() {
        Store = require('../Store.js');
        DispatcherFactory = require('../../lib/DispatcherFactory.js');
    });

    it('should initialize without error', function() {
        var store = new Store();

        expect(store).not.toBeUndefined();
    });

    it('should bind to dispatcher correctly', function() {
        var foo = DispatcherFactory.create('foo');

        foo.register = jest.genMockFunction();
        foo.register.mockReturnValue('foo-id');

        var bar = DispatcherFactory.create('bar');

        bar.register = jest.genMockFunction();
        bar.register.mockReturnValue('bar-id');

        var store = new Store();
        var listener = jest.genMockFunction();

        store.bindDispatcher(foo, listener);
        store.bindDispatcher(bar, listener);

        expect(store.dispatcherToken(foo)).toBe('foo-id');
        expect(store.dispatcherToken(bar)).toBe('bar-id');
    });

    it('should call change listeners accordignly', function() {
        var store = new Store();

        var listener1 = jest.genMockFunction();
        var listener2 = jest.genMockFunction();

        store.addChangeListener(listener1);

        store.emitChange();

        store.removeChangeListener(listener2);

        store.emitChange();

        store.removeChangeListener(listener1);

        store.emitChange();

        expect(listener1.mock.calls.length).toBe(2);
        expect(listener2.mock.calls.length).toBe(0);
    });

    it('should not call change listener on an id accordingly', function() {
        var store = new Store();

        var listener1 = jest.genMockFunction();
        var listener2 = jest.genMockFunction();
        var listener3 = jest.genMockFunction();

        store.addChangeListener(listener1);
        store.addChangeListener(listener2, 'foo');
        store.addChangeListener(listener3, 'bar');

        store.emitChange('foo');
        expect(listener2.mock.calls.length).toBe(1);

        store.emitChange('foo');
        expect(listener1.mock.calls.length).toBe(2);
        expect(listener2.mock.calls.length).toBe(2);
        expect(listener3.mock.calls.length).toBe(0);

        store.emitChange('bar');
        expect(listener1.mock.calls.length).toBe(3);
        expect(listener3.mock.calls.length).toBe(1);

        store.emitChange();
        expect(listener1.mock.calls.length).toBe(4);
        expect(listener2.mock.calls.length).toBe(3);
        expect(listener3.mock.calls.length).toBe(2);

        store.removeChangeListener(listener3, 'bar');
        store.emitChange('bar');
        expect(listener1.mock.calls.length).toBe(5);
        expect(listener2.mock.calls.length).toBe(3);
        expect(listener3.mock.calls.length).toBe(2);

        store.removeChangeListener(listener2, 'foo');
        store.emitChange('foo');
        expect(listener1.mock.calls.length).toBe(6);
        expect(listener2.mock.calls.length).toBe(3);
        expect(listener3.mock.calls.length).toBe(2);

        store.emitChange();
        expect(listener1.mock.calls.length).toBe(7);
        expect(listener2.mock.calls.length).toBe(3);
        expect(listener3.mock.calls.length).toBe(2);
    });
});

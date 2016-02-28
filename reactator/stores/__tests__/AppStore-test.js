/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('AppStore', function() {
    var AppStore;
    var AppDispatcher;

    beforeEach(function() {
        AppStore = require('../AppStore.js');
        AppDispatcher = require('../../dispatcher/AppDispatcher.js');
    });

    it('should return an empty state without errors', function() {
        expect(AppStore.getState()).toBeDefined();
        expect(AppStore.getState()).not.toBeNull();
    });

    it('should emit change on Route or Size AppDispatcher events', function() {
        var listener = jest.genMockFunction();

        AppStore.addChangeListener(listener);

        AppDispatcher.dispatch({});

        AppStore.removeChangeListener(listener);

        expect(listener.mock.calls.length).toBe(0);
    });

    it('should update state according to the route action', function() {
        var listener = jest.genMockFunction();

        AppStore.addChangeListener(listener);

        AppDispatcher.handleRouteAction({
            action: 'some-action',
            pathname: 'some-pathname',
            params: 'some-params'
        });

        AppStore.removeChangeListener(listener);

        expect(listener.mock.calls.length).toBe(1);

        var route = AppStore.getState().toJS().route;

        expect(route.action).toBe('some-action');
        expect(route.pathname).toBe('some-pathname');
        expect(route.params).toBe('some-params');
    });
});

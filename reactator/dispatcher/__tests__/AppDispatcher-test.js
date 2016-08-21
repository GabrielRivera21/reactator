/* global jest, describe, beforeEach, it, expect */

jest.autoMockOff();

describe('AppDispatcher', function() {
    var AppDispatcher;
    var AppConstants;

    beforeEach(function() {
        AppDispatcher = require('../AppDispatcher.js');
        AppConstants = require('../../constants/AppConstants.js');
    });

    it('sends actions to subscribers', function() {
        var listener = jest.genMockFunction();

        AppDispatcher.register(listener);

        var payload = {};

        AppDispatcher.dispatch(payload);
        expect(listener.mock.calls.length).toBe(1);
        expect(listener.mock.calls[0][0]).toBe(payload);
    });

    describe('waits with chained dependencies properly', function() {

        var listener1Done = false;
        var listener2Done = false;
        var listener3Done = false;
        var listener4Done = false;

        beforeEach(function(done) {
            var payload = {};

            var listener1 = function() {
                AppDispatcher.waitFor([index2, index4]);
                // Second, third, and fourth listeners should have now been called
                expect(listener2Done).toBe(true);
                expect(listener3Done).toBe(true);
                expect(listener4Done).toBe(true);

                listener1Done = true;

                done();
            };

            AppDispatcher.register(listener1);

            var listener2 = function() {
                AppDispatcher.waitFor([index3]);
                expect(listener3Done).toBe(true);
                listener2Done = true;
            };

            var index2 = AppDispatcher.register(listener2);

            var listener3 = function() {
                listener3Done = true;
            };

            var index3 = AppDispatcher.register(listener3);

            var listener4 = function() {
                AppDispatcher.waitFor([index3]);
                expect(listener3Done).toBe(true);
                listener4Done = true;
            };

            var index4 = AppDispatcher.register(listener4);

            AppDispatcher.dispatch(payload);
        });

        it('should call all listeners', function() {
            expect(listener1Done).toBe(true);
            expect(listener2Done).toBe(true);
            expect(listener3Done).toBe(true);
        });
    });

    it('propogates route actions with correct source', function() {
        var listener = jest.genMockFunction();

        AppDispatcher.register(listener);

        AppDispatcher.handleRouteAction('test');

        expect(listener.mock.calls.length).toBe(1);
        expect(listener.mock.calls[0][0].source).toBe(AppConstants.ROUTE_ACTION);
        expect(listener.mock.calls[0][0].action).toBe('test');
    });

    it('propogates window resize action with correct source', function() {
        var listener = jest.genMockFunction();

        AppDispatcher.register(listener);

        AppDispatcher.handleWindowResize('test');

        expect(listener.mock.calls.length).toBe(1);
        expect(listener.mock.calls[0][0].source).toBe(AppConstants.WINDOW_RESIZE_ACTION);
        expect(listener.mock.calls[0][0].action).toBe('test');
    });
});

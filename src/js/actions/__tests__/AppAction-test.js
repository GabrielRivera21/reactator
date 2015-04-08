/* global jest, describe, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();
jest.mock('../../dispatcher/AppDispatcher.js');

describe('AppAction', function() {
    var AppAction;

    beforeEach(function() {
        AppAction = require('../AppAction.js');
    });

    it('dispatches a noop sourced action on noop action', function() {
        AppAction.noop();

        var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
        expect(AppDispatcher.dispatch.mock.calls.length).toBe(1);
        expect(AppDispatcher.dispatch.mock.calls[0][0].source).toBe("noop");
    });
});

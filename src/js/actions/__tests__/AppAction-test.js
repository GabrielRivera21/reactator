/* global jest, describe, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();
jest.mock('../../dispatcher/AppDispatcher.js');

describe('AppAction', function() {
    var AppAction;
    var AppConstants;

    beforeEach(function() {
        AppAction = require('../AppAction.js');
        AppConstants = require('../../constants/AppConstants.js');
    });

    it('dispatches a noop sourced action on noop action', function() {
        AppAction.noop();

        var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
        expect(AppDispatcher.dispatch.mock.calls.length).toBe(1);
        expect(AppDispatcher.dispatch.mock.calls[0][0].source).toBe("noop");
    });

    it('dispatches a resize sourced action on resize action', function() {
        AppAction.resize(1,2,AppConstants.LG);

        var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
        expect(AppDispatcher.handleWindowResize.mock.calls.length).toBe(1);
        expect(AppDispatcher.handleWindowResize.mock.calls[0][0].width).toBe(1);
        expect(AppDispatcher.handleWindowResize.mock.calls[0][0].height).toBe(2);
        expect(AppDispatcher.handleWindowResize.mock.calls[0][0].visibility).toBe(AppConstants.LG);
    });
});

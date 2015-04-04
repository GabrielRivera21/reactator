
/* global jest, describe, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();

describe('MetaDataComponent', function() {
    var React;
    var TestUtils;
    var MetaDataComponent;
    var AppStore;

    beforeEach(function() {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        MetaDataComponent = require('../MetaDataComponent.js');
        AppStore = require('../../../stores/AppStore.js');
    });

    it('renders to dom without errors', function() {
        TestUtils.renderIntoDocument(<MetaDataComponent />);
    });

    it('populates the AppStore\'s size data', function() {
        TestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();
        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.isVisibleXS).toBeTruthy();
        expect(state.size.isVisibleSM).toBeTruthy();
        expect(state.size.isVisibleMD).toBeTruthy();
        expect(state.size.isVisibleLG).toBeTruthy();
        expect(state.size.isHiddenXS).toBeFalsy();
        expect(state.size.isHiddenSM).toBeFalsy();
        expect(state.size.isHiddenMD).toBeFalsy();
        expect(state.size.isHiddenLG).toBeFalsy();
    });
});

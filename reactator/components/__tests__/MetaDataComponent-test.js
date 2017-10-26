
/* global jest, describe, beforeEach, require, it, expect, runs, waitsFor, runs */

/* jshint unused:false */
/* jshint -W097 */
"use strict";

jest.autoMockOff();

describe('MetaDataComponent', function () {
    var $;
    var React;
    var TestUtils;
    var MetaDataComponent;
    var AppStore;
    var AppConstants;

    beforeEach(function () {
        $ = require('../../lib/jquery.js');
        React = require('react');
        TestUtils = React.addons.TestUtils;
        MetaDataComponent = require('../MetaDataComponent.js');
        AppStore = require('../../stores/AppStore.js');
        AppConstants = require('../../constants/AppConstants.js');
    });

    it('renders to dom without errors', function () {
        TestUtils.renderIntoDocument(<MetaDataComponent />);
    });

    it('sets to SM if LG and MD are not visible', function () {
        $.fn.is = function (name) {
            switch (this[0].className) {
                case 'visible-lg-block':
                    return false;
                case 'visible-md-block':
                    return false;
                case 'visible-sm-block':
                    return true;
            }
        };

        TestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();
        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.SM);
    });

    it('sets to MD if LG is not visible', function () {
        $.fn.is = function (name) {
            switch (this[0].className) {
                case 'visible-lg-block':
                    return false;
                case 'visible-md-block':
                    return true;
                case 'visible-sm-block':
                    return true;
            }
        };

        TestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();
        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.MD);
    });

    it('sets to XS if every div is not visible', function () {
        $.fn.is = function () { return false; };

        TestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();
        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.XS);
    });

    it('populates the AppStore\'s size data', function () {
        TestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();
        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.LG);
    });
});

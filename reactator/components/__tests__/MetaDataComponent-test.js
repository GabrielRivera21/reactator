/* global jest, describe, beforeEach, require, it, expect */

jest.autoMockOff();

describe('MetaDataComponent', function() {
    var $;
    var React;
    var ReactTestUtils;
    var MetaDataComponent;
    var AppStore;
    var AppConstants;

    beforeEach(function() {
        $ = require('../../lib/jquery.js');
        React = require('react');
        ReactTestUtils = require('react-addons-test-utils');
        MetaDataComponent = require('../MetaDataComponent.js');
        AppStore = require('../../stores/AppStore.js');
        AppConstants = require('../../constants/AppConstants.js');
    });

    it('renders to dom without errors', function() {
        $.fn.is = function() { return false; };

        ReactTestUtils.renderIntoDocument(<MetaDataComponent />);
    });

    it('sets to SM if LG and MD are not visible', function() {
        $.fn.is = function() {
            switch(this[0].className) {
            case 'visible-lg-block':
                return false;
            case 'visible-md-block':
                return false;
            case 'visible-sm-block':
                return true;
            default:
                return false;
            }
        };

        ReactTestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();

        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.SM);
    });

    it('sets to MD if LG is not visible', function() {
        $.fn.is = function() {
            switch(this[0].className) {
            case 'visible-lg-block':
                return false;
            case 'visible-md-block':
                return true;
            case 'visible-sm-block':
                return true;
            default:
                return false;
            }
        };

        ReactTestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();

        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.MD);
    });

    it('sets to XS if every div is not visible', function() {
        $.fn.is = function() { return false; };

        ReactTestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();

        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.XS);
    });

    it('populates the AppStore\'s size data', function() {
        $.fn.is = function() { return true; };

        ReactTestUtils.renderIntoDocument(<MetaDataComponent />);

        var state = AppStore.getState().toJS();

        expect(state.size).toBeDefined();
        expect(state.size.width).toBeGreaterThan(1);
        expect(state.size.height).toBeGreaterThan(1);
        expect(state.size.visibility).toBe(AppConstants.LG);
    });
});

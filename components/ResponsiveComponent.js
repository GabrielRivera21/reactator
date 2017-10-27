/* global require, module */

'use strict';

var _ = require('lodash'),
    React = require('react'),
    AppStore = require('../stores/AppStore.js'),
    AppConstants = require('../constants/AppConstants.js');

/**
 * @method getPropVisibility
 */
var getPropVisibility = function getPropVisibility(props, visibility) {
    var isVisible = false;
    return _.find(AppConstants.VISIBILITY_ORDER, function (level) {
        isVisible = isVisible || level === visibility;
        return isVisible && props[level] !== undefined;
    });
};

/**
 * React component for adapting to the window size and visibility according
 * to {{#crossLink "AppStore"}}{{/crossLink}}. The ResponsiveComponent will render
 * the largest child that would be visible or empty div is non is applicable, e.g.:
 *
 *     <ResponsiveComponent
 *             MD={<div>You shall render LG or MD!</div>}
 *             XS={<div>You shall render SM or XS!</div>} />
 *
 * @class ResponsiveComponent
 */
var ResponsiveComponent = React.createClass({
    displayName: 'ResponsiveComponent',

    getInitialState: function getInitialState() {
        return {
            visibility: AppStore.getState().get('size').get('visibility')
        };
    },

    componentWillMount: function componentWillMount() {
        AppStore.addChangeListener(this.onAppStoreChange, 'size');
    },

    componentWillUnmount: function componentWillUnmount() {
        AppStore.removeChangeListener(this.onAppStoreChange, 'size');
    },

    onAppStoreChange: function onAppStoreChange() {
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return getPropVisibility(this.props, this.state.visibility) !== getPropVisibility(nextProps, nextState.visibility);
    },

    render: function render() {
        var propVisibility = getPropVisibility(this.props, this.state.visibility);

        return propVisibility ? this.props[propVisibility] : React.createElement('div', null);
    }

});

module.exports = ResponsiveComponent;
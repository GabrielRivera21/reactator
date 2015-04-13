/* global require, module */

var _ = require('underscore');
var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var AppConstants = require('../../constants/AppConstants.js');

function getPropVisibility(props, visibility) {
    var isVisible = false;
    return _.find(
        AppConstants.VISIBILITY_ORDER,
        function(level) {
            isVisible = isVisible || level === visibility;
            return isVisible && props[level] !== undefined;
        });
}

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

    getInitialState : function() {
        return {
            visibility : AppStore.getState().get('size').get('visibility')
        };
    },

    componentWillMount : function() {
        AppStore.addChangeListener(this.onAppStoreChange);
    },

    componentWillUnmount : function() {
        AppStore.removeChangeListener(this.onAppStoreChange);
    },

    onAppStoreChange : function() {
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate : function(nextProps, nextState) {
        return getPropVisibility(this.props, this.state.visibility) !==
                getPropVisibility(nextProps, nextState.visibility);
    },

    render: function() {
        var propVisibility = getPropVisibility(this.props, this.state.visibility);

        return (
            propVisibility ? this.props[propVisibility] : <div />
        );
    }

});

module.exports = ResponsiveComponent;
import _ from 'lodash';
import React from 'react';
import AppStore from '../stores/AppStore.js';
import AppConstants from '../constants/AppConstants.js';

const getPropVisibility = (props, visibility) => {
    var isVisible = false;

    return _.find(
        AppConstants.VISIBILITY_ORDER,
        (level) => {
            isVisible = isVisible || level === visibility;
            return isVisible && props[level] !== undefined;
        });
};

/*
 *     <ResponsiveComponent
 *             MD={<div>You shall render LG or MD!</div>}
 *             XS={<div>You shall render SM or XS!</div>} />
 */

/**
 * @class
 * @classdesc React component for adapting to the window size and visibility according
 *            to {@link module:Reactator.AppStore}. The ResponsiveComponent will render
 *            the largest child that would be visible or empty div is non is applicable.
 *
 * @memberof module:Reactator
 */
const ResponsiveComponent = React.createClass({

    getInitialState: function() {
        return {
            visibility: AppStore.getState().get('size').get('visibility')
        };
    },

    componentWillMount: function() {
        AppStore.addChangeListener(this.onAppStoreChange, 'size');
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this.onAppStoreChange, 'size');
    },

    onAppStoreChange: function() {
        this.setState(this.getInitialState());
    },

    shouldComponentUpdate: function(nextProps, nextState) {
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

import React from 'react';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const emitter = new EventEmitter();

/**
 * @class
 * @classdesc root component for rendering the app tying to {@link module:Reactator.AppDispatcher} for route actions
 * @memberof module:Reactator
 */
const RootRouteComponent = React.createClass({
    dispatch: function() {
        AppDispatcher.handleRouteAction({
            action: this.props.location.action,
            pathname: this.props.location.pathname,
            params: this.props.location.query
        });
    },

    componentDidMount: function() {
        emitter.on(AppConstants.ROUTE_UPDATE, this.dispatch);
        this.dispatch();
    },

    render: function() {
        return <div>{this.props.children}</div>;
    }

});

RootRouteComponent.emitter = emitter;

module.exports = RootRouteComponent;

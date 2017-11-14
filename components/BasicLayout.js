/* global require, module */

'use strict';

var React = require('react'),
    CreateReactClass = require('create-react-class'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component BasicLayout
 *
 * @class BasicLayout
 */
var BasicLayout = CreateReactClass({
    displayName: 'BasicLayout',

    render: function render() {
        return React.createElement(RouteHandler, null);
    }
});

module.exports = BasicLayout;
/* global require, module */

'use strict';

var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component BasicLayout
 *
 * @class BasicLayout
 */
var BasicLayout = React.createClass({
    displayName: 'BasicLayout',

    render: function render() {
        return React.createElement(RouteHandler, null);
    }
});

module.exports = BasicLayout;
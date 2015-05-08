/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component BasicLayout
 *
 * @class BasicLayout
 */
const BasicLayout = React.createClass({
    render: function() {
        return (
            <RouteHandler />
        );
    }
});

module.exports = BasicLayout;

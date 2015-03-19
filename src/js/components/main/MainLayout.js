/* global require, module */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/**
 * React component MainLayout
 *
 * @class MainLayout
 */
var MainLayout = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = MainLayout;

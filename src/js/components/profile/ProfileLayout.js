/* global require, module */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/**
 * React component ProfileLayout
 *
 * @class ProfileLayout
 */
var ProfileLayout = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = ProfileLayout;

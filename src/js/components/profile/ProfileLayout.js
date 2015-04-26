/* global require, module */

var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

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

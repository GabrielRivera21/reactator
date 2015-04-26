/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component ProfileLayout
 *
 * @class ProfileLayout
 */
const ProfileLayout = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = ProfileLayout;

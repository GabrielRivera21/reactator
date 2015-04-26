/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component MainLayout
 *
 * @class MainLayout
 */
const MainLayout = React.createClass({
    render: function() {
        return (
            <div>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = MainLayout;

/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

/**
 * React component AppLayout
 *
 * @class AppLayout
 */
const AppLayout = React.createClass({
    render: function() {
        return (
            <div className='app'>
                <RouteHandler />
            </div>
        );
    }
});

module.exports = AppLayout;

/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    AppHeader = require('./AppHeader.js');

/**
 * React component AppLayout
 *
 * @class AppLayout
 */
const AppLayout = React.createClass({
    render: function() {
        return (
            <div className='app'>
                <AppHeader />
                <RouteHandler />
            </div>
        );
    }
});

module.exports = AppLayout;

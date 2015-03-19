/* global require, module */

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppHeader = require('./AppHeader.js');

/**
 * React component AppLayout
 *
 * @class AppLayout
 */
var AppLayout = React.createClass({
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

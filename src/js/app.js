/* global require, document */

require('./globals.js');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes/routes.js');
var AppDispatcher = require('./dispatcher/AppDispatcher.js');

/**
 * App the begining of it all.
 *
 * @class App
 */
Router.run(routes, function(Handler, state) {
    AppDispatcher.handleRouteAction(state);

    React.render(
            <Handler />,
            document.getElementById('main')
        );
});

/* global require, document */

require('./globals.js');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes/routes.js');
var AppDispatcher = require('./dispatcher/AppDispatcher.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

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

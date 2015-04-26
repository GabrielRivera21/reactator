/* global require, document */
require('./globals.js');

var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes/routes.js'),
    AppDispatcher = require('./dispatcher/AppDispatcher.js'),
    MetaDataComponent = require('./components/meta-data/MetaDataComponent.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

// The MetaData Component providing common functionality / support.
React.render(
    <MetaDataComponent />,
    document.getElementById('_md')
);

/**
 * App the begining of it all.
 *
 * @class App
 */
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    AppDispatcher.handleRouteAction(state);

    React.render(
            <Handler />,
            document.getElementById('main')
        );
});

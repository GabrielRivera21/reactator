/* global require, document */
require('./globals.js');

var React = require('react'),
    Router = require('react-router'),
    AppDispatcher = require('./dispatcher/AppDispatcher.js'),
    MetaDataComponent = require('./components/meta-data/MetaDataComponent.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

/**
 * AppStarter helping to configure and start the app
 *
 * @class  AppStarter
 */
class AppStarter {

    /**
     * @method constructor
     */
    constructor() {
        this.routes = undefined;
    }

    /**
     * Sets the routes to start the app with
     *
     * @param {Router} routes routes to start the app with
     * @return {AppStarter} the app starter
     * @method withRoutes
     */
    withRoutes(routes) {
        this.routes = routes;
        return this;
    }

    /**
     * Starts the app
     *
     * @method start
     */
    start() {
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
        Router.run(this.routes, Router.HistoryLocation, function(Handler, state) {
            AppDispatcher.handleRouteAction(state);

            React.render(
                    <Handler />,
                    document.getElementById('main')
                );
        });
    }
}

module.exports = new AppStarter();

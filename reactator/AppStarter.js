/* global require, document */

const
    React = require('react'),
    Router = require('react-router'),
    AppDispatcher = require('./dispatcher/AppDispatcher.js'),
    MetaDataComponent = require('./components/MetaDataComponent.js');

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
     * @constructor
     */
    constructor() {
        this.routes = undefined;
        this.hash = false;
    }

    /**
     * Sets the hash setting, true to use hash, false to use html5 history
     *
     * @param {Boolean} useHash to use or not to use
     * @return {AppStarter} the app starter
     * @method withHash
     */
    withHash(useHash) {
        this.hash = useHash;
        return this;
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
     * @returns {undefined}
     */
    start() {
        // The MetaData Component providing common functionality / support.
        React.render(
            <MetaDataComponent />,
            document.getElementById('_md')
        );

        const handler = function(Handler, state) {
            AppDispatcher.handleRouteAction(state);

            React.render(
                    <Handler />,
                    document.getElementById('main')
                );
        };

        this.routes.initialize();
        if (this.hash === true) {
            Router.run(this.routes.getRoutes(), handler);
        } else {
            Router.run(this.routes.getRoutes(), Router.HistoryLocation, handler);
        }
    }
}

module.exports = new AppStarter();

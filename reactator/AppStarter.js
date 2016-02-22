/** @module Reactator */
/* global require, document */

//import { Router, Route, Link, browserHistory } from 'react-router'

const
    React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    RootRouteComponent = require('./components/RootRouteComponent.js'),
    AppConstants = require('./constants/AppConstants.js'),
    MetaDataComponent = require('./components/MetaDataComponent.js');

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

/**
 * @class
 * @classdesc AppStarter helping to configure and start the app
 */
class AppStarter {

    /**
     * @constructor
     */
    constructor() {
        this.routes = undefined;
        this.history = Router.browserHistory;
    }

    /**
     * Sets the hash setting, true to use hash, false to use html5 history
     *
     * @param {Boolean} history to use or not to use
     * @return {AppStarter} the app starter
     */
    withHistory(history) {
        this.history = history;
        return this;
    }

    /**
     * Sets the routes to start the app with
     *
     * @param {Route} routes routes to start the app with
     * @return {AppStarter} the app starter
     */
    withRoutes(routes) {
        this.routes = routes;
        return this;
    }

    /**
     * Callback for Router updates
     * @returns {undefined}
     */
    onUpdate() {
        RootRouteComponent.emitter.emit(AppConstants.ROUTE_UPDATE);
    }

    /**
     * Renders the app
     * @returns {undefined}
     */
    render() {
        this.routes.initialize();

        ReactDOM.render(
            <Router history={ReactRouter.browserHistory} onUpdate={this.onUpdate}>
                <Route component={RootRouteComponent}>
                    {this.routes.getRoutes()}
                </Route>
            </Router>,
            document.getElementById('main')
        );
    }

    /**
     * Starts the app
     * @returns {undefined}
     */
    start() {
        ReactDOM.render(
            <MetaDataComponent onComponentDidMount={this.render.bind(this)}/>,
            document.getElementById('_md')
        );
    }
}

module.exports = new AppStarter();

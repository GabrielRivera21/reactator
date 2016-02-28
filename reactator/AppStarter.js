/** @module Reactator */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import AppConstants from './constants/AppConstants.js';
import RootRouteComponent from './components/RootRouteComponent.js';
import MetaDataComponent from './components/MetaDataComponent.js';

// Just to ensure that AppStore is initialized and listening to
// AppDispatcher prior to having router initialized.
require('./stores/AppStore.js');

/**
 * @class
 * @memberof module:Reactator
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
     * @return {undefined}
     */
    onUpdate() {
        RootRouteComponent.emitter.emit(AppConstants.ROUTE_UPDATE);
    }

    /**
     * Renders the app
     * @return {undefined}
     */
    render() {
        this.routes.initialize();

        ReactDOM.render(
            <Router history={browserHistory} onUpdate={this.onUpdate}>
                <Route component={RootRouteComponent}>
                    {this.routes.getRoutes()}
                </Route>
            </Router>,
            document.getElementById('main')
        );
    }

    /**
     * Starts the app
     * @return {undefined}
     */
    start() {
        ReactDOM.render(
            <MetaDataComponent onComponentDidMount={this.render.bind(this)}/>,
            document.getElementById('_md')
        );
    }
}

module.exports = new AppStarter();

/** @module Reactator */

import _ from './lib/lodash.js';
import Promise from 'bluebird';
import LOGGER from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import ReactatorBundle from './ReactatorBundle.js';
import {ReduxStoreBuilder} from './reducers/Reducer.js';
import {Context, CompositeModuleBuilder} from './modules/ReactatorModule.js';
import ResponsiveBundle from './bundles/ResponsiveBundle.js';

/**
 * @class
 * @memberOf module:Reactator
 * @classdesc ReactatorApp helping to configure and start the app
 *
 * @see module:Reactator.ReactatorBundle
 * @see module:Reactator.ReactatorModule
 * @see module:Reactator.ReduxStoreBuilder
 */
class ReactatorApp {
    constructor() {
        this.routes = undefined;
        this.history = browserHistory;
        this.store = undefined;
        this.module = undefined;
        this.moduleBuilder = new CompositeModuleBuilder();
        this.storeBuilder = new ReduxStoreBuilder().withReactRouter();

        this.withBundle(new ResponsiveBundle());
    }

    /**
     * @method module:Reactator.ReactatorApp#withBundle
     *
     * @param {ReactatorBundle} bundle - bundle to configure with the app
     *
     * @return {ReactatorApp} the app starter
     * @see module:Reactator.ReactatorBundle
     */
    withBundle(bundle) {
        _.check(bundle instanceof ReactatorBundle);
        this.storeBuilder.withReducers(bundle.reducers);
        this.moduleBuilder.withModules(bundle.modules);
        return this;
    }

    /**
     * @method module:Reactator.ReactatorApp#withStore
     *
     * @param {function} method - method to be called with the [store builder]{@link module:Reactator.ReduxStoreBuilder} for the app
     *
     * @return {ReactatorApp} the app starter
     * @see module:Reactator.ReduxStoreBuilder
     */
    withStore(method) {
        method(this.storeBuilder);
        return this.storeBuilder;
    }

    /**
     * @method module:Reactator.ReactatorApp#withModule
     *
     * @param {function} method - method to be called with the module builder for the app
     *
     * @return {ReactatorApp} the app starter
     */
    withModule(method) {
        method(this.moduleBuilder);
        return this;
    }

    /**
     * @method module:Reactator.ReactatorApp#withHistory
     * @description Sets the hash setting, true to use hash, false to use html5 history
     *
     * @param {Boolean} history - history to use or not to use
     * @return {ReactatorApp} the app starter
     */
    withHistory(history) {
        this.history = history;
        return this;
    }

    /**
     * @method module:Reactator.ReactatorApp#withRoutes
     * @description Sets the routes to start the app with
     *
     * @param {Route} routes - routes to start the app with
     * @return {ReactatorApp} the app starter
     */
    withRoutes(routes) {
        this.routes = routes;
        return this;
    }

    /**
     * @method module:Reactator.ReactatorApp#start
     * @description Renders the app
     *
     * @return {undefined}
     */
    start() {
        _.checkNotDefined(this.store);
        _.checkNotDefined(this.module);

        const store = this.store = this.storeBuilder.build();
        const module = this.module = this.moduleBuilder.build();
        const history = syncHistoryWithStore(this.history, store);
        let exitCode = 0;

        this.routes.initialize();

        return Promise.try(() => {
            return module.initialize();
        }).then(() => {
            return module.setContext(new Context('main', store));
        }).then(() => {
            return module.willStart();
        }).then(() => {
            return module.getComponents();
        }).catch((err) => {
            LOGGER.error('Module initialization failed!', err);
            LOGGER.info('Failed to initialize the modules, proceeding with empty components!');
            exitCode = 1;

            return {};
        }).then((components) => {
            return Promise.fromCallback((callback) => {
                ReactDOM.render(
                    <Provider store={store}>
                        <div>
                            <Router history={history}>
                                {this.routes.getRoutes()}
                            </Router>
                            {_.flattenDeep(_.values(components))}
                        </div>
                    </Provider>,
                    document.getElementById('main'),
                    callback
                );
            });
        }).then(() => {
            return module.didStart();
        }).catch((err) => {
            LOGGER.error('Module start failed!', err);
            exitCode = 2;

            return {};
        }).return(exitCode);
    }
}

module.exports = new ReactatorApp();

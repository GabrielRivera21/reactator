/** @module Reactator */

import _ from './lib/lodash.js';
import {browserHistory} from 'react-router';
import ReactatorBundle from './ReactatorBundle.js';
import {ReduxStoreBuilder} from './reducers/Reducer.js';
import {CompositeModuleBuilder} from './modules/ReactatorModule.js';
import ResponsiveBundle from './bundles/ResponsiveBundle.js';
import {asActionFactory} from './actions/ActionFactory.js';

/**
 * @class
 * @memberOf module:Reactator
 * @classdesc ReactatorAppConfiguration configure for the app
 *
 * @param {Object} params - parameters for the app configuration
 * @param {module:Reactator.Routes} params.routes - routes for the app
 * @param {Object} params.actionFactories - actions by name
 * @param {Object} params.history - history to use for the react router
 * @param {module:Reactator.ReactatorModule} params.moduleBuilder - module builder
 * @param {module:Reactator.ReduxStoreBuilder} params.storeBuilder - store builder
 *
 * @see module:Reactator.ReactatorBundle
 * @see module:Reactator.ReactatorModule
 * @see module:Reactator.ReduxStoreBuilder
 */
export class ReactatorAppConfiguration {
    constructor(params) {
        /** @member {module:Reactator.Routes} */
        this.routes = _.checkDefined(params.routes);

        /** @member {Object} */
        this.actionFactories = params.actionFactories || [];

        /** @member {Object} */
        this.history = params.history;

        /** @member {module:Reactator.ReactatorModule} */
        this.module = _.checkDefined(params.moduleBuilder).build();

        /** @member {module:Reactator.ReduxStoreBuilder} */
        this.storeBuilder = _.checkDefined(params.storeBuilder);

        // Initialize the routes
        this.routes.initialize();
    }

    /**
     * @method module:Reactator.ReactatorAppConfiguration#newStore
     *
     * @return {Object} redux store
     */
    newStore() {
        return this.storeBuilder.build();
    }
}

/**
 * @class
 * @memberOf module:Reactator
 * @classdesc ReactatorAppConfigurationBuillder helping to configure and start the app
 *
 * @param {Object} options options for initialization
 * @param {Boolean} options.responsiveBootstrap if responsive bootstrap should be enabled or not
 *
 * @see module:Reactator.ReactatorBundle
 * @see module:Reactator.ReactatorModule
 * @see module:Reactator.ReduxStoreBuilder
 */
export class ReactatorAppConfigurationBuillder {
    constructor(options = {responsiveBootstrap: true}) {
        this.routes = undefined;
        this.history = browserHistory;
        this.moduleBuilder = new CompositeModuleBuilder();
        this.storeBuilder = new ReduxStoreBuilder().withReactRouter();
        this.actionFactories = [];

        if (options.responsiveBootstrap) {
            this.withBundle(new ResponsiveBundle());
        }
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withActionFactory
     *
     * @param {module:Reactator.ActionFactory|function} actionFactory - action factory
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     *
     * @see module:Reactator.ActionFactory
     */
    withActionFactory(actionFactory) {
        this.actionFactories.push(asActionFactory(actionFactory));
        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withBundle
     *
     * @param {ReactatorBundle} bundle - bundle to configure with the app
     *
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     * @see module:Reactator.ReactatorBundle
     */
    withBundle(bundle) {
        _.check(bundle instanceof ReactatorBundle);
        this.storeBuilder.withReducers(bundle.reducers);
        this.moduleBuilder.withModules(bundle.modules);

        if (!_.isNil(bundle.actionFactories)) {
            _.map(bundle.actionFactories, (actionFactory) => {
                this.withActionFactory(actionFactory);
            });
        }

        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withStore
     *
     * @param {function} method - method to be called with the [store builder]{@link module:Reactator.ReduxStoreBuilder} for the app
     *
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     * @see module:Reactator.ReduxStoreBuilder
     */
    withStore(method) {
        method(this.storeBuilder);
        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withModule
     *
     * @param {function} method - method to be called with the module builder for the app
     *
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     */
    withModule(method) {
        method(this.moduleBuilder);
        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withHistory
     * @description Sets the hash setting, true to use hash, false to use html5 history
     *
     * @param {Boolean} history - history to use or not to use
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     */
    withHistory(history) {
        this.history = history;
        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#withRoutes
     * @description Sets the routes to start the app with
     *
     * @param {Route} routes - routes to start the app with
     * @return {ReactatorAppConfigurationBuillder} the app configuration builder
     */
    withRoutes(routes) {
        this.routes = routes;
        return this;
    }

    /**
     * @method module:Reactator.ReactatorAppConfigurationBuillder#build
     *
     * @return {ReactatorAppConfiguration} the app configuration
     */
    build() {
        return new ReactatorAppConfiguration(this);
    }
}

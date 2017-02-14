import _ from './lib/lodash.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {Context, start as startModules} from './modules/ReactatorModule.js';
import {syncHistoryWithStore} from 'react-router-redux';

/**
 * @class
 * @memberOf module:Reactator
 *
 * @param {module:Reactator.ReactatorAppConfiguration} configuration - app configuration
 *
 * @see module:Reactator.ReactatorAppConfiguration
 * @see module:Reactator.ReactatorAppConfigurationBuillder
 */
export default class ReactatorClientApp {
    static MAIN_ELEMENT_ID = 'main';

    constructor(configuration) {
        /** @member {Object} */
        this.configuration = configuration;

        /** @member {Object} */
        this.store = this.configuration.newStore();

        _.checkDefined(this.configuration.history);
        /** @member {Object} */
        this.history = syncHistoryWithStore(this.configuration.history, this.store);

        /** @member {Object} */
        this.context = new Context(ReactatorClientApp.MAIN_ELEMENT_ID, this.store);
    }

    /**
     * @method module:Reactator.ReactatorClientApp#start
     * @return {undefined}
     */
    start() {
        startModules(this.configuration.module, this.context, (components, callback) => {
            ReactDOM.render(
                <Provider store={this.store}>
                    <div>
                        <Router history={this.history}>
                            {this.configuration.routes.getRoutes()}
                        </Router>
                        {components}
                    </div>
                </Provider>,
                document.getElementById(ReactatorClientApp.MAIN_ELEMENT_ID),
                callback
            );
        });
    }
}

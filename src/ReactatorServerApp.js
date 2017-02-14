import _ from 'reactator/lib/lodash';
import Mustache from 'mustache';
import Promise from 'bluebird';
import LOGGER from 'loglevel';
import React from 'react';
import {getComponents} from './modules/ReactatorModule.js';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

/**
 * @class
 * @memberOf module:Reactator
 *
 * @param {module:Reactator.ReactatorAppConfiguration} configuration - app configuration
 *
 * @see module:Reactator.ReactatorAppConfiguration
 * @see module:Reactator.ReactatorAppConfigurationBuillder
 */
export default class ReactatorServerApp {
    constructor(configuration) {
        /** @member {Object} */
        this.configuration = configuration;

        /** @member {Object} */
        this.routes = undefined;

        /** @member {Object} */
        this.components = undefined;
    }

    /**
     * @method module:Reactator.ReactatorServerApp#start
     * @return {Promise} promise returning the app after its ready for launch
     */
    start() {
        return Promise.try(() => {
            this.routes = this.configuration.routes.getRoutes();
            return getComponents(this.configuration.module);
        }).then((components) => {
            this.components = components;
            return this;
        });
    }

    /**
     * @method module:Reactator.ReactatorServerApp#middleware
     *
     * @param {String} url - url for matching
     * @return {Promise} promise for the match
     */
    match(url) {
        return Promise.fromCallback((callback) => {
            Promise.try(() => {
                match({routes: this.routes, location: url}, (error, redirectLocation, renderProps) => {
                    callback(undefined, {
                        error,
                        redirectLocation,
                        renderProps
                    });
                });
            }).catch((error) => {
                callback(undefined, {error});
            });
        });
    }

    /**
     * @method module:Reactator.ReactatorServerApp#createActions
     *
     * @param {Object} options - options for creating actions
     * @return {Promise} promise for the match
     */
    createActions({renderProps, req}) {
        const promises = [];

        _.map(renderProps.components, (component) => {
            if (component.ACTIONS) {
                const params = {
                    req: req,
                    props: renderProps,
                    context: {
                        component: component,
                        params: component.ACTION_PARAMS
                    }
                };

                _.map(component.ACTIONS, (name) => {
                    _.map(this.configuration.actionFactories, (factory) => {
                        promises.push(Promise.try(() => {
                            return factory.create(name, params);
                        }));
                    });
                });
            }
        });

        return promises;
    }

    /**
     * @method module:Reactator.ReactatorServerApp#processRequest
     *
     * @param {Object} options - options for processing the requests
     * @return {Promise} promise for the match
     */
    processRequest({notFoundComponent, internalServerErrorComponent, error, req, renderProps}) {
        if (error) {
            return {
                status: 500,
                store: this.configuration.newStore(),
                component: internalServerErrorComponent
            };
        } else if (renderProps) {
            return Promise.all(this.createActions({renderProps, req}))
                .then((createdActions) => {
                    const store = this.configuration.newStore();

                    _.map(_.flattenDepth(createdActions, 1), (action) => {
                        store.dispatch(action);
                    });

                    return {
                        status: 200,
                        store,
                        component: <RouterContext {...renderProps} />
                    };
                }).catch((e) => {
                    LOGGER.error(e.message, e);

                    return {
                        status: 500,
                        store: this.configuration.newStore(),
                        component: internalServerErrorComponent
                    };
                });
        } else {
            return {
                status: 404,
                store: this.configuration.newStore(),
                component: notFoundComponent
            };
        }
    }

    /**
     * @method module:Reactator.ReactatorServerApp#middleware
     *
     * @param {Object} options - options for the middleware
     * @param {String} options.template - template to use for rendering
     * @param {React.Component} options.notFoundComponent - not found component
     * @param {React.Component} options.internalServerErrorComponent - internal server error component
     *
     * @return {function} express middleware for handling the rendering of the page
     */
    middleware(options) {
        const {template, notFoundComponent, internalServerErrorComponent} = options;

        return (req, res) => {
            this.match(req.originalUrl)
                .then(({error, redirectLocation, renderProps}) => {
                    if (redirectLocation) {
                        return {
                            status: 302,
                            redirectUrl: redirectLocation.pathname + redirectLocation.search
                        };
                    } else {
                        return this.processRequest({
                            notFoundComponent,
                            internalServerErrorComponent,
                            error,
                            req,
                            renderProps
                        });
                    }
                }).then(({status, redirectUrl, store, component}) => {
                    if (redirectUrl) {
                        res.redirect(status, redirectUrl);
                    } else {
                        res.status(status)
                            .send(
                                Mustache.render(
                                    template, {
                                        html: renderToString(
                                            <Provider store={store}>
                                                <div>
                                                    {component}
                                                    {this.components}
                                                </div>
                                            </Provider>
                                        ),
                                        state: JSON.stringify(store.getState())
                                    }
                                )
                            );
                    }
                }).catch(() => {
                    res.status(500).send('Internal Server Error');
                });
        };
    }
}

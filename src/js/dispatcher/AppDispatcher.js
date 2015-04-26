/* global require, module */

/**
 * Main dispatcher for the App
 *
 * @class AppDispatcher
 */
const
    AppConstants = require('../constants/AppConstants.js'),
    DispatcherFactory = require('../lib/DispatcherFactory.js'),
    AppDispatcher = DispatcherFactory.create('AppDispatcher');

/**
 * Dispatches a route action of ROUTE_ACTION
 *
 * @method handleRouteAction
 * @param {Object} state route state to be dispatched
 */
AppDispatcher.handleRouteAction = function(state) {
    this.dispatch({
        source : AppConstants.ROUTE_ACTION,
        action : state
    });
};

/**
 * Dispatches a window resize action of WINDOW_RESIZE_ACTION
 *
 * @method handleWindowResize
 * @param {Object} state window state to be dispatched
 */
AppDispatcher.handleWindowResize = function(state) {
    this.dispatch({
        source : AppConstants.WINDOW_RESIZE_ACTION,
        action : state
    });
};

module.exports = AppDispatcher;

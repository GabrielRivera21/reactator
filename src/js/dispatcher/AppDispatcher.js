/* global require, module */

/**
 * Main dispatcher for the App
 *
 * @class AppDispatcher
 */
var AppConstants = require('../constants/AppConstants.js');
var DispatcherFactory = require('../lib/DispatcherFactory.js');
var AppDispatcher = DispatcherFactory.create('AppDispatcher');

/**
 * Dispatches a route action of ROUTE_ACTION and ROUTE_CHANGE
 *
 * @method handleRouteAction
 * @param {Object} route route to be dispatched
 */
AppDispatcher.handleRouteAction = function(state) {
    this.dispatch({
        source : AppConstants.ROUTE_ACTION,
        action : state
    });
};

module.exports = AppDispatcher;

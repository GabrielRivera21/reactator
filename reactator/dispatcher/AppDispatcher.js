import AppConstants from '../constants/AppConstants.js';
import DispatcherFactory from '../lib/DispatcherFactory.js';

/**
 * Main dispatcher for the App
 *
 * @class AppDispatcher
 * @memberof module:Reactator
 */
const AppDispatcher = DispatcherFactory.create('AppDispatcher');

/**
 * Dispatches a route action of ROUTE_ACTION
 *
 * @param {Object} state route state to be dispatched
 * @return {undefined}
 */
AppDispatcher.handleRouteAction = function(state) {
    this.dispatch({
        source: AppConstants.ROUTE_ACTION,
        action: state
    });
};

/**
 * Dispatches a window resize action of WINDOW_RESIZE_ACTION
 *
 * @param {Object} state window state to be dispatched
 * @return {undefined}
 */
AppDispatcher.handleWindowResize = function(state) {
    this.dispatch({
        source: AppConstants.WINDOW_RESIZE_ACTION,
        action: state
    });
};

module.exports = AppDispatcher;

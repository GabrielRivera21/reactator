/* global require, module */

const
    Immutable = require('immutable'),
    Store = require('./Store.js'),
    AppConstants = require('../constants/AppConstants.js'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js');

var state = Immutable.fromJS({
    route: {
        action: null,
        params: null,
        path: null,
        pathname: null,
        query: null
    },
    size: {
        width: null,
        height: null,
        visibility: null
    }
});

/**
 * Store for the app values.
 *
 * @class AppStore
 */
class AppStore extends Store {
    /*jshint unused:false*/

    /**
     * @constructor
     */
    constructor() {
        super();

        this.bindDispatcher(AppDispatcher, this.appDispatcherListener);
    }

    /**
     * @param {Object} event event
     * @method appDispatcherListener
     * @returns {undefined}
     */
    appDispatcherListener(event) {
        switch (event.source) {
        case AppConstants.ROUTE_ACTION:
            state = state.mergeDeep({route: {
                action: event.action.action,
                params: event.action.params,
                path: event.action.path,
                pathname: event.action.pathname,
                query: event.action.query
            }});

            this.emitChange('route');
            break;
        case AppConstants.WINDOW_RESIZE_ACTION:
            state = state.mergeDeep({
                size: {
                    width: event.action.width,
                    height: event.action.height,
                    visibility: event.action.visibility
                }
            });

            this.emitChange('size');
            break;
        default:
            break;
        }
    }

    /**
     * @method getState
     * @returns {Object} state of the store
     */
    getState() {
        return state;
    }
}

module.exports = new AppStore();
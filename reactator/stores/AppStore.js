import Immutable from 'immutable';
import Store from './Store.js';
import AppConstants from '../constants/AppConstants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

var state = Immutable.fromJS({
    route: {
        action: null,
        pathname: null,
        params: null
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
 * @memberof module:Reactator
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
     * @return {undefined}
     */
    appDispatcherListener(event) {
        switch (event.source) {
        case AppConstants.ROUTE_ACTION:
            state = state.mergeDeep({route: {
                action: event.action.action,
                pathname: event.action.pathname,
                params: event.action.params || {}
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
     * @return {Object} state of the store
     */
    getState() {
        return state;
    }
}

module.exports = new AppStore();

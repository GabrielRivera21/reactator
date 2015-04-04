/* global require, module */

var _ = require('underscore');
var Store = require('./Store.js');
var AppConstants = require('../constants/AppConstants.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Immutable = require('immutable');

var state = Immutable.Map({
    route : {
        action: null,
        params: null,
        path: null,
        pathname: null,
        query: null
    },
    size : {}
});

/**
 * Store for the app values.
 *
 * @class AppStore
 */
var AppStore = Store.extend({});
_.extend(AppStore.prototype, {
    /*jshint unused:false*/

    /**
     * @method initialize
     */
    initialize : function() {
        AppStore.__super__.initialize.call(this);
        this.bindDispatcher(AppDispatcher, this.appDispatcherListener);
    },

    /**
     * @method appDispatcherListener
     */
    appDispatcherListener : function(event) {
        switch (event.source) {
            case AppConstants.ROUTE_ACTION:
                state = state.merge({route: {
                    action: event.action.action,
                    params: event.action.params,
                    path: event.action.path,
                    pathname: event.action.pathname,
                    query: event.action.query
                }});
            break;
            case AppConstants.WINDOW_RESIZE_ACTION:
                state = state.merge({
                    size: event.action
                });
            break;
        }

        this.emitChange();
    },

    /**
     * @method getState
     */
    getState : function() {
        return state;
    }
});

module.exports = new AppStore();

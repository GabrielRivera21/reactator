/* global require, module */

var _ = require('underscore');
var Store = require('./Store.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');

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
        this.emitChange();
    }
});

module.exports = new AppStore();

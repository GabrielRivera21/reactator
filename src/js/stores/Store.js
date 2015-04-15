/* global require, module */

var _ = require('underscore');
var Class = require('../lib/Class.js');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

function changeEvent(id) {
    return CHANGE_EVENT + "-" + id;
}

/**
 * Store base providing common funcitonality to all stores.
 *
 * @class Store
 */
var Store = Class.extend({});
_.extend(Store.prototype, {
    /**
     * initialize method, creates the emitter and dispatcher mapping.
     * @method initialize
     */
    initialize : function() {
        this._dispatchers = {};
        this._emitter = new EventEmitter();
    },

    /**
     * Binds the dispatcher and callback for the store, and maintains the token id
     *
     * @param {Dispatcher} dispatcher dispatcher to bind to
     * @param {Function} callback callback function to bind
     * @method bindDispatcher
     */
    bindDispatcher : function(dispatcher, callback) {
        this._dispatchers[dispatcher.name] = dispatcher.register(callback.bind(this));
    },

    /**
     * Returns the store's token for a given dispatcher
     *
     * @method dispatcherToken
     * @param {Dispatcher} dispatcher the dispatcher to lookup
     * @return {String|undefined} the store's token for the dispatcher or null if not registered
     */
    dispatcherToken : function(dispatcher) {
        return this._dispatchers[dispatcher.name];
    },

    /**
     * Emits the change event on the store
     * @method emitChange
     */
    emitChange : function(id) {
        if (_.isUndefined(id)) {
            _.each(
                Object.keys(this._emitter._events),
                function(event) {
                    this._emitter.emit(event);
                },
                this);
        } else {
            this._emitter.emit(changeEvent(id));
            this._emitter.emit(CHANGE_EVENT);
        }
    },

    /**
     * Registers the callback for the change event on the store
     * @param {Function} callback callback function to register
     * @param {String} id id of the change event
     * @method addChangeListener
     */
    addChangeListener : function(callback, id) {
        if (!_.isUndefined(id)) {
            this._emitter.on(changeEvent(id), callback);
        } else {
            this._emitter.on(CHANGE_EVENT, callback);
        }
    },

    /**
     * Removes the registered callback for the change event on the store
     * @param  {Function} callback callback funciton to unregister
     * @param {String} id id of the change event
     * @method removeChangeListener
     */
    removeChangeListener : function(callback, id) {
        if (!_.isUndefined(id)) {
            this._emitter.removeListener(changeEvent(id), callback);
        } else {
            this._emitter.removeListener(CHANGE_EVENT, callback);
        }
    }
});

module.exports = Store;

/* global require, module */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash'),
    EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var changeEvent = function changeEvent(id) {
    return CHANGE_EVENT + '-' + id;
};

/**
 * Store base providing common funcitonality to all stores.
 *
 * @class Store
 */

var Store = (function () {

    /**
     * initialize method, creates the emitter and dispatcher mapping.
     * @method constructor
     */

    function Store() {
        _classCallCheck(this, Store);

        this._dispatchers = {};
        this._emitter = new EventEmitter();
    }

    _createClass(Store, [{
        key: 'bindDispatcher',

        /**
         * Binds the dispatcher and callback for the store, and maintains the token id
         *
         * @param {Dispatcher} dispatcher dispatcher to bind to
         * @param {Function} callback callback function to bind
         * @method bindDispatcher
         */
        value: function bindDispatcher(dispatcher, callback) {
            this._dispatchers[dispatcher.name] = dispatcher.register(callback.bind(this));
        }
    }, {
        key: 'dispatcherToken',

        /**
         * Returns the store's token for a given dispatcher
         *
         * @method dispatcherToken
         * @param {Dispatcher} dispatcher the dispatcher to lookup
         * @return {String|undefined} the store's token for the dispatcher or null if not registered
         */
        value: function dispatcherToken(dispatcher) {
            return this._dispatchers[dispatcher.name];
        }
    }, {
        key: 'emitChange',

        /**
         * Emits the change event on the store
         * @method emitChange
         */
        value: function emitChange(id) {
            if (_.isUndefined(id)) {
                _.each(
                /*jshint -W069 */
                Object.keys(this._emitter['_events']), function (event) {
                    this._emitter.emit(event);
                }, this);
            } else {
                this._emitter.emit(changeEvent(id));
                this._emitter.emit(CHANGE_EVENT);
            }
        }
    }, {
        key: 'addChangeListener',

        /**
         * Registers the callback for the change event on the store
         * @param {Function} callback callback function to register
         * @param {String} id id of the change event
         * @method addChangeListener
         */
        value: function addChangeListener(callback, id) {
            if (!_.isUndefined(id)) {
                this._emitter.on(changeEvent(id), callback);
            } else {
                this._emitter.on(CHANGE_EVENT, callback);
            }
        }
    }, {
        key: 'removeChangeListener',

        /**
         * Removes the registered callback for the change event on the store
         * @param  {Function} callback callback funciton to unregister
         * @param {String} id id of the change event
         * @method removeChangeListener
         */
        value: function removeChangeListener(callback, id) {
            if (!_.isUndefined(id)) {
                this._emitter.removeListener(changeEvent(id), callback);
            } else {
                this._emitter.removeListener(CHANGE_EVENT, callback);
            }
        }
    }]);

    return Store;
})();

module.exports = Store;
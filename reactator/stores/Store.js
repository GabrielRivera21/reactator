import _ from 'lodash';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const changeEvent = (id) => {
    return CHANGE_EVENT + '-' + id;
};

/**
 * @class
 * @memberof module:Reactator
 * @classdesc Store base providing common funcitonality to all stores.
 */
class Store {

    /**
     * Creates the emitter and dispatcher mapping.
     * @constructor
     */
    constructor() {
        this._dispatchers = {};
        this._emitter = new EventEmitter();
    }

    /**
     * Binds the dispatcher and callback for the store, and maintains the token id
     *
     * @param {Dispatcher} dispatcher dispatcher to bind to
     * @param {Function} callback callback function to bind
     * @return {undefined}
     */
    bindDispatcher(dispatcher, callback) {
        this._dispatchers[dispatcher.name] = dispatcher.register(callback.bind(this));
    }

    /**
     * Returns the store's token for a given dispatcher
     *
     * @param {Dispatcher} dispatcher the dispatcher to lookup
     * @return {String|undefined} the store's token for the dispatcher or null if not registered
     */
    dispatcherToken(dispatcher) {
        return this._dispatchers[dispatcher.name];
    }

    /**
     * Emits the change event on the store
     * @param {String} id id of the event to emit
     * @return {undefined}
     */
    emitChange(id) {
        if (_.isUndefined(id)) {
            var self = this;

            _.each(
                /*jshint -W069 */
                Object.keys(self._emitter['_events']),
                function(event) {
                    self._emitter.emit(event);
                },
                this);
        } else {
            this._emitter.emit(changeEvent(id));
            this._emitter.emit(CHANGE_EVENT);
        }
    }

    /**
     * Registers the callback for the change event on the store
     * @param {Function} callback callback function to register
     * @param {String} id id of the change event
     * @return {undefined}
     */
    addChangeListener(callback, id) {
        if (!_.isUndefined(id)) {
            this._emitter.on(changeEvent(id), callback);
        } else {
            this._emitter.on(CHANGE_EVENT, callback);
        }
    }

    /**
     * Removes the registered callback for the change event on the store
     * @param  {Function} callback callback funciton to unregister
     * @param {String} id id of the change event
     * @return {undefined}
     */
    removeChangeListener(callback, id) {
        if (!_.isUndefined(id)) {
            this._emitter.removeListener(changeEvent(id), callback);
        } else {
            this._emitter.removeListener(CHANGE_EVENT, callback);
        }
    }
}

module.exports = Store;

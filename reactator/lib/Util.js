import _ from './lodash.js';

const _p8 = (s, v) => {
    var p = (v.toString(16) + '000000000').substr(2,8);

    return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;
};

const _d8 = (s) => {
    return _p8(s, Date.now());
};

const _m8 = (s) => {
    return _p8(s, Math.random());
};

/**
 * @class
 * @classdesc All sort of common helper functionality.
 * @memberof module:Reactator
 */
const U = {

    /**
     * @return {undefined}
     */
    out: function() {
        console.log(arguments);
    },

    /**
     * @return {undefined}
     */
    err: function() {
        console.error(arguments);
    },

    /**
     * @param {Promise} promise promise
     * @return {undefined}
     */
    outq: function(promise) {
        promise.then((r) => console.log(r))
         .catch((e) => console.error(e));
    },

    /**
     * Verifies if the object has the specified functions.
     *
     * @param {String} type type requiring and running the verification
     * @param {Object} object object to analyze
     * @param {Array} names names of the functions
     * @return {Array} names of functions not implemented
     */
    verifyRequiredFunctions: function(type, object, names) {
        const missing = [];

        _.each(
            names,
            (name) => {
                if(!_.isFunction(object[name])) {
                    console.warn(type + ' requires function ' + name + '!');
                    missing.push(name);
                }
            });

        return missing;
    },

    /**
     * A helper for generating GUIDs
     * @return {String} next guid
     */
    guid: function() {
        return _m8() + _m8(true) + _m8(true) + _d8();
    },

    /**
     * A helper for binding a function to an object, and registring for listener on events on an emitter.
     *
     * @param {EventEmitter} emitter emitter to listen to
     * @param {Array} events events to listen to
     * @param {Function} func function to call on events
     * @param {Object} obj object to bind to
     * @return {Object} map of events to registered bound functions
     */
    addListeners: function(emitter, events, func, obj) {
        const listeners = {};

        _.each(
            events,
            (event) => {
                const listener = listeners[event] = func.bind(obj, event);

                emitter.on(event, listener);
            });

        return listeners;
    },

    /**
     * Removes listeners from an EventEmitter
     * @param {EventEmitter} emitter emitter to remove listeners from
     * @param {Object} listeners listeners map to remove
     * @return {undefined}
     */
    removeListeners: function(emitter, listeners) {
        _.each(
            listeners,
            (listener, event) => {
                emitter.removeListener(event, listener);
            });
    }
};

module.exports = U;

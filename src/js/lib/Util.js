/* global require, console, module */

const _ = require('underscore');

const _p8 = (s, v) => {
    var p = (v.toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
};

const _d8 = (s) => {
    return _p8(s, Date.now());
};

const _m8 = (s) => {
    return _p8(s, Math.random());
};

/**
 * All sort of common helper functionality.
 *
 * @class  U
 */
const U = {

    /**
     * Verifies if the object has the specified functions.
     *
     * @param {String} type type requiring and running the verification
     * @param {Object} object object to analyze
     * @param {Array} names names of the functions
     * @return {Array} names of functions not implemented
     * @method verifyRequiredFunctions
     */
    verifyRequiredFunctions : function(type, object, names) {
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
     * @method guid
     */
    guid : function() {
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
     * @method addListeners
     */
    addListeners : function(emitter, events, func, obj) {
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
     * @method removeListeners
     */
    removeListeners : function(emitter, listeners) {
        _.each(
            listeners,
            (listener, event) => {
                emitter.removeListener(event, listener);
            });
    }
};

module.exports = U;

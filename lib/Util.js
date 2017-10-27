/* global require, console, module */

"use strict";

var _ = require("lodash");

var _p8 = function _p8(s, v) {
    var p = (v.toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
};

var _d8 = function _d8(s) {
    return _p8(s, Date.now());
};

var _m8 = function _m8(s) {
    return _p8(s, Math.random());
};

/**
 * All sort of common helper functionality.
 *
 * @class  U
 */
var U = {

    /**
     * @method out
     */
    out: function out() {
        console.log(arguments);
    },

    /**
     * @method err
     */
    err: function err() {
        console.error(arguments);
    },

    /**
     * @method outq
     */
    outq: function outq(q) {
        q.then(function (r) {
            return console.log(r);
        })["catch"](function (e) {
            return console.error(e);
        }).done();
    },

    /**
     * Verifies if the object has the specified functions.
     *
     * @param {String} type type requiring and running the verification
     * @param {Object} object object to analyze
     * @param {Array} names names of the functions
     * @return {Array} names of functions not implemented
     * @method verifyRequiredFunctions
     */
    verifyRequiredFunctions: function verifyRequiredFunctions(type, object, names) {
        var missing = [];

        _.each(names, function (name) {
            if (!_.isFunction(object[name])) {
                console.warn(type + " requires function " + name + "!");
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
    guid: function guid() {
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
    addListeners: function addListeners(emitter, events, func, obj) {
        var listeners = {};
        _.each(events, function (event) {
            var listener = listeners[event] = func.bind(obj, event);
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
    removeListeners: function removeListeners(emitter, listeners) {
        _.each(listeners, function (listener, event) {
            emitter.removeListener(event, listener);
        });
    }
};

module.exports = U;
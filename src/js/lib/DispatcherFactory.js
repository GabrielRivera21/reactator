/* global require, module */

var Dispatcher = require('flux').Dispatcher;

var dispatchers = {};

/**
 * Dispatcher factory, ensures creation of single dispatcher for a given name
 *
 * @class DispatcherFactory
 */
var DispatcherFactory = {

    /**
     * Creates a new Dispatcher and sets the name of the dispatcher.
     *
     * @param  {String} name name of the dispatcher (unique)
     * @return {Dispatcher} the newly created dispatcher, or the existing one.
     * @method create
     */
    create : function(name) {
        if (dispatchers[name]) {
            return dispatchers[name];
        }

        var dispatcher = new Dispatcher();
        dispatcher.name = name;

        dispatchers[name] = dispatcher;
        return dispatcher;
    }
};

module.exports = DispatcherFactory;
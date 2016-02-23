import {Dispatcher} from 'flux';

const dispatchers = {};

/**
 * Dispatcher factory, ensures creation of single dispatcher for a given name
 *
 * @class DispatcherFactory
 * @memberof module:Reactator
 */
const DispatcherFactory = {

    /**
     * Creates a new Dispatcher and sets the name of the dispatcher.
     *
     * @param  {String} name name of the dispatcher (unique)
     * @return {Dispatcher} the newly created dispatcher, or the existing one.
     */
    create: function(name) {
        if (dispatchers[name]) {
            return dispatchers[name];
        }

        const dispatcher = new Dispatcher();

        dispatcher.name = name;

        dispatchers[name] = dispatcher;
        return dispatcher;
    }
};

module.exports = DispatcherFactory;

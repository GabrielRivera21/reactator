/* global require, module */

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

/**
 * Class for performing app actions. Triggers on AppDispatcher.
 *
 * @class AppAction
 */
var AppAction = {

    /**
     * Example of an action triggering the dispatcher.
     *
     * @method noop
     */
    noop : function() {
        AppDispatcher.dispatch({
            source : 'noop',
            action : undefined
        });
    }
};

module.exports = AppAction;

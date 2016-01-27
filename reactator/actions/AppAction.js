/* global require, module */

const
    AppDispatcher = require('../dispatcher/AppDispatcher.js');

/**
 * Class for performing app actions. Triggers on AppDispatcher.
 *
 * @class AppAction
 */
const AppAction = {

    /**
     * @param {Number} width width of the app
     * @param {Number} height height of the app
     * @param {String} visibility visibliity of the app: XS, SM, MD, LG
     * @method resize
     *
     * @returns {undefined}
     */
    resize: function(width, height, visibility) {
        AppDispatcher.handleWindowResize({
            width: width,
            height: height,
            visibility: visibility
        });
    }
};

module.exports = AppAction;

/* global require, module */

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

/**
 * Class for performing app actions. Triggers on AppDispatcher.
 *
 * @class AppAction
 */
var AppAction = {

    /**
     * @param {Number} width width of the app
     * @param {Number} height height of the app
     * @param {String} visibility visibliity of the app: XS, SM, MD, LG
     * @method resize
     */
    resize: function resize(width, height, visibility) {
        AppDispatcher.handleWindowResize({
            width: width,
            height: height,
            visibility: visibility
        });
    }
};

module.exports = AppAction;
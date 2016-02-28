import AppDispatcher from '../dispatcher/AppDispatcher.js';

/**
 * @class
 * @classdesc Class for performing app actions. Triggers on AppDispatcher.
 * @memberof module:Reactator
 */
const AppAction = {

    /**
     * @param {Number} width width of the app
     * @param {Number} height height of the app
     * @param {String} visibility visibliity of the app: XS, SM, MD, LG
     *
     * @return {undefined}
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

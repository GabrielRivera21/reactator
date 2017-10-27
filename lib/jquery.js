/* global window, global, require, module */

/**
 * Wrapper for getting jQuery and all its plugins
 *
 * @class jQuery
 */
'use strict';

var jQuery = require('jquery');

if (typeof window !== 'undefined') {
    window.$ = global.$ = global.jQuery = jQuery;
    require('bootstrap');
} else {
    global.$ = global.jQuery = jQuery;
}

module.exports = jQuery;
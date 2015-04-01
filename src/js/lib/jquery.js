/* global window, global, require, module */

/**
 * Wrapper for getting jQuery and all its plugins
 *
 * @class jQuery
 */
var jQuery = require('jquery');
window.$ = global.jQuery = jQuery;

require('bootstrap');
require('../../../bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js');

module.exports = jQuery;

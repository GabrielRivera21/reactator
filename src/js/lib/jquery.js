/* global require, module */

/**
 * Wrapper for getting jQuery and all its plugins
 *
 * @class jQuery
 */
var $ = require('jquery');

require('bootstrap');
require('../../../bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js');

module.exports = $;

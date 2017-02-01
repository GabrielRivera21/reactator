/**
 * @class jQuery
 * @classdesc Wrapper for getting jQuery and all its plugins
 * @memberOf module:Reactator
 */
import jQuery from 'jquery';

if(typeof window !== 'undefined')  {
    window.$ = global.$ = global.jQuery = jQuery;
    window.Tether = global.Tether = require('tether');
    require('bootstrap');
} else {
    global.$ = global.jQuery = jQuery;
    global.Tether = require('tether');
}

module.exports = jQuery;

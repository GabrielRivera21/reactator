/**
 * Wrapper for getting jQuery and all its plugins
 *
 * @class jQuery
 * @memberof module:Reactator
 */
import jQuery from 'jquery';

if(typeof window !== 'undefined')  {
    window.$ = global.$ = global.jQuery = jQuery;
    require('bootstrap');
} else {
    global.$ = global.jQuery = jQuery;
}

module.exports = jQuery;

/**
 * @class jQuery
 * @classdesc Wrapper for getting jQuery and all its plugins
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

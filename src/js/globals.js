/* global require, window */

/**
 * Helper to provide some of the global scope variables
 * (for debugging and testing in the browser mostly).
 *
 * @class Globals
 */
window._ = require('underscore');
window.Immutable = require('immutable');

window.$ = require('./lib/jquery.js');
window.Backbone = require('./lib/backbone.js');
window.Q = require('./lib/q.js');

window.U = require('./lib/Util.js');
window.Class = require('./lib/Class.js');

window.Client = require('./client/Client.js');
window.ClientWrapper = require('./client/ClientWrapper.js');
window.AjaxClient = require('./client/AjaxClient.js');

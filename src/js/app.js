/* global require, document */
require('./globals.js');


var AppStarter = require('./AppStarter.js'),
    routes = require('./routes/routes.js');

/**
 * App the begining of it all.
 *
 * @class App
 */
AppStarter
    .withRoutes(routes)
    .start();

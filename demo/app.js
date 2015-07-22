/* global require, document */

const
    AppStarter = require('reactator/AppStarter'),
    routes = require('./routes/routes');

/**
 * App the begining of it all.
 *
 * @class App
 */
AppStarter
    .withRoutes(routes)
    .start();

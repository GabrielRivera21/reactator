/* global require, document */
require('../../globals.js');

const
    AppStarter = require('../../AppStarter.js'),
    routes = require('./routes/routes.js');

/**
 * App the begining of it all.
 *
 * @class App
 */
AppStarter
    .withRoutes(routes)
    .start();

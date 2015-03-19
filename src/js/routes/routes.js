/* global require, module */

/**
 * Main routes that combines all different sub apps.
 *
 * @class Routes
 */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var mainRoutes = require("./main.js");
var profileRoutes = require("./profile.js");
var AppLayout = require("../components/AppLayout.js");

var routes = (
    <Route handler={AppLayout}>
        {mainRoutes}
        {profileRoutes}
    </Route>
);

module.exports = routes;

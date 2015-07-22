/* global require, module */

/**
 * Main routes that combines all different sub apps.
 *
 * @class Routes
 */
const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    mainRoutes = require("./main"),
    profileRoutes = require("./profile"),
    AppLayout = require("../components/AppLayout");

const routes = (
    <Route handler={AppLayout}>
        {mainRoutes}
        {profileRoutes}
    </Route>
);

module.exports = routes;

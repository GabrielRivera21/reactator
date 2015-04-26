/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    MainLayout = require("../components/main/MainLayout.js"),
    MainComponent = require("../components/main/MainComponent.js");

/**
 * React Router definition for main app
 *
 * @class RoutesMain
 */
const routes = (
    <Route name="main" path="/" handler={MainLayout}>
        <DefaultRoute handler={MainComponent} />
    </Route>
);

module.exports = routes;

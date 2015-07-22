/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    BasicLayout = require("reactator/components/BasicLayout"),
    MainComponent = require("../components/main/MainComponent");

/**
 * React Router definition for main app
 *
 * @class RoutesMain
 */
const routes = (
    <Route name="main" path="/" handler={BasicLayout}>
        <DefaultRoute handler={MainComponent} />
    </Route>
);

module.exports = routes;

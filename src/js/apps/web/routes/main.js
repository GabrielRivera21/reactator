/* global require, module */

const
    React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    BasicLayout = require("../../../components/common/BasicLayout.js"),
    MainComponent = require("../components/main/MainComponent.js");

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

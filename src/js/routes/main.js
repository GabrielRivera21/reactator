/* global require, module */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var MainLayout = require("../components/main/MainLayout.js");
var MainComponent = require("../components/main/MainComponent.js");

/**
 * React Router definition for main app
 *
 * @class RoutesMain
 */
var routes = (
    <Route name="main" path="/" handler={MainLayout}>
        <DefaultRoute handler={MainComponent} />
    </Route>
);

module.exports = routes;

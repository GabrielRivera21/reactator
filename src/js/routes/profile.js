/* global require, module */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var ProfileLayout = require("../components/profile/ProfileLayout.js");
var ProfileComponent = require("../components/profile/ProfileComponent.js");

/**
 * React Router definition for profile app
 *
 * @class RoutesProfile
 */
var routes = (
    <Route name="profile" handler={ProfileLayout}>
        <DefaultRoute handler={ProfileComponent} />
    </Route>
);

module.exports = routes;

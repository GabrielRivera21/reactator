/* global require, module */

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    ProfileLayout = require("../components/profile/ProfileLayout.js"),
    ProfileComponent = require("../components/profile/ProfileComponent.js");

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

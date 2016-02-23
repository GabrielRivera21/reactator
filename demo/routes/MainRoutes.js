import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Routes from 'reactator/routes/Routes';
import BasicLayout from 'reactator/components/BasicLayout';
import MainComponent from '../components/main/MainComponent.js';

/**
 * @class
 * @memberof module:Demo
 * @classdesc MainRoutes is an example of {@link Routes} for the demo app's main page.
 */
class MainRoutes extends Routes {
    /**
     * Provides the routes for the main component of the demo app.
     * @return {Route} the route representing the main component
     */
    getRoutes() {
        return (
            <Route key="main" name="main" path="/" component={BasicLayout}>
                <IndexRoute component={MainComponent} />
            </Route>
        );
    }
}

module.exports = MainRoutes;

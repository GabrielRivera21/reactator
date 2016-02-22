/* global require, module */

import React from 'react';
import {Route} from 'react-router';
import CompositeRoutes from 'reactator/routes/CompositeRoutes';
import MainRoutes from './MainRoutes.js';
import ProfileRoutes from './ProfileRoutes.js';
import AppLayout from '../components/AppLayout';

/**
 * @class
 * @memberof module:Demo
 * @classdesc DemoRoutes is an example of {@link CompositeRoutes} for the demo app.
 */
class DemoRoutes extends CompositeRoutes {
    constructor() {
        super([
            new MainRoutes(),
            new ProfileRoutes()
        ]);
    }

    /**
     * Provides the composite react-router routes for the demo.
     *
     * @return {Route} composite route
     */
    getRoutes() {
        return (
            <Route component={AppLayout}>
                {super.getRoutes()}
            </Route>
        );
    }
}

module.exports = DemoRoutes;

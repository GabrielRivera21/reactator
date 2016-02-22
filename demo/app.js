/** @module Demo */
/* global require, document */

import reactator from 'reactator/index';
import demo from './demo';
import AppStarter from 'reactator/AppStarter';
import DemoRoutes from './routes/DemoRoutes';

//
// Make the packages available
//
if (typeof window !== 'undefined') {
    window.reactator = reactator;
    window.demo = demo;
}

/**
 * DemoApp is a simple single page app built using reactator.
 * @class DemoApp
 */
AppStarter
    .withRoutes(new DemoRoutes())
    .start();

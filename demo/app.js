/** @module Demo */

import reactator from 'reactator/index';
import AppStarter from 'reactator/AppStarter';
import demo from './demo.js';
import DemoRoutes from './routes/DemoRoutes.js';

//
// Make the packages available
//
if (typeof window !== 'undefined') {
    window.reactator = reactator;
    window.demo = demo;
}

/**
 * @class
 * @classdesc DemoApp is a simple single page app built using reactator.
 */
AppStarter
    .withRoutes(new DemoRoutes())
    .start();

/* global require, document */

const
    reactator = require('reactator/reactator'),
    demo = require('./demo.js'),
    AppStarter = require('reactator/AppStarter'),
    DemoRoutes = require('./routes/DemoRoutes.js');

//
// Make the packages available
//
if (typeof window !== 'undefined') {
    window.reactator = reactator;
    window.demo = demo;
}

/**
 * App the begining of it all.
 *
 * @class App
 */
AppStarter
    .withRoutes(new DemoRoutes())
    .start();

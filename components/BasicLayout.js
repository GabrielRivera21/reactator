/* global require, module */

'use strict';

var React = require('react'),
    CreateReactClass = require('create-react-class');

/**
 * React component BasicLayout
 *
 * @class BasicLayout
 */
var BasicLayout = CreateReactClass({
    displayName: 'BasicLayout',

    render: function() {
        return React.createElement("div", null, this.props.children);
    }
});

module.exports = BasicLayout;
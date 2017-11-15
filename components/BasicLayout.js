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

    render: function render() {
        return React.createElement(this.props.children, null);
    }
});

module.exports = BasicLayout;
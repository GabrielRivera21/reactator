/* global require, module */

"use strict";

var React = require("react"),
    CreateReactClass = require('create-react-class');

/**
 * React component BootstrapModal
 *
 * @class BootstrapModal
 */
var BootstrapModal = CreateReactClass({
    displayName: "BootstrapModal",

    propTypes: {
        classes: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function getDefaultProps() {
        return {
            classes: []
        };
    },

    render: function render() {
        var classes = "modal fade";
        this.props.classes.forEach(function (className) {
            classes += " " + className;
        });

        return React.createElement(
            "div",
            { className: classes },
            React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    this.props.children
                )
            )
        );
    }

});

module.exports = BootstrapModal;

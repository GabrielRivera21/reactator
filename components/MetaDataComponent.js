/* global require, module, window */

'use strict';

var React = require('react'),
    CreateReactClass = require('create-react-class'),
    $ = require('../lib/jquery.js'),
    _ = require('lodash'),
    AppConstants = require('../constants/AppConstants.js'),
    AppAction = require('../actions/AppAction.js');

/**
 * React component MetaDataComponent that handles window resize and provides information on the
 * state of the responsive css to the {{#crossLink "AppStore"}}{{/crossLink}}.
 *
 * @class MetaDataComponent
 */
var MetaDataComponent = CreateReactClass({
    displayName: 'MetaDataComponent',

    handleWindowResize: function handleWindowResize() {
        var $responsive = $(this.getDOMNode()).find('.responsive');
        var isVisible = function isVisible(className) {
            return $responsive.find(className).is(':visible');
        };

        var visibility = AppConstants.XS;
        if (isVisible('.visible-lg-block')) {
            visibility = AppConstants.LG;
        } else if (isVisible('.visible-md-block')) {
            visibility = AppConstants.MD;
        } else if (isVisible('.visible-sm-block')) {
            visibility = AppConstants.SM;
        }

        AppAction.resize(window.innerWidth, window.innerHeight, visibility);
    },

    componentDidMount: function componentDidMount() {
        window.addEventListener('resize', _.debounce(this.handleWindowResize, 500));
        this.handleWindowResize();
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'responsive' },
                React.createElement('div', { className: 'visible-lg-block' }),
                React.createElement('div', { className: 'visible-md-block' }),
                React.createElement('div', { className: 'visible-sm-block' })
            )
        );
    }

});

module.exports = MetaDataComponent;
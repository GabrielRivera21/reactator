/* global require, module */

/**
 * Mixin for react components to have a modal object.
 *
 * @class BootstrapModalMixin
 */
'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    $ = require('../../lib/jquery.js'),
    PropTypes = require('prop-types');

var bootstrapModalEvents = {
    handleShow: 'show.bs.modal',
    handleShown: 'shown.bs.modal',
    handleHide: 'hide.bs.modal',
    handleHidden: 'hidden.bs.modal'
};

var handlerProps = [

/**
 * Optional callback for modal event 'handleShow'
 * @event handleShow
 */
'handleShow',

/**
 * Optional callback for modal event 'handleShown'
 * @event handleShown
 */
'handleShown',

/**
 * Optional callback for modal event 'handleHide'
 * @event handleHide
 */
'handleHide',

/**
 * Optional callback for modal event 'handleHidden'
 * @event handleHidden
 */
'handleHidden'];

var BootstrapModalMixin = {
    propTypes: {
        handleShow: PropTypes.func,
        handleShown: PropTypes.func,
        handleHide: PropTypes.func,
        handleHidden: PropTypes.func,

        /**
         * Bootstrap modal property 'backdrop'
         *
         * @property backdrop
         * @type {Boolean}
         */
        backdrop: PropTypes.bool,

        /**
         * Bootstrap modal property 'keyboard'
         *
         * @property keyboard
         * @type {Boolean}
         */
        keyboard: PropTypes.bool,

        /**
         * Bootstrap modal property 'show'
         *
         * @property show
         * @type {Boolean}
         */
        show: PropTypes.bool,

        /**
         * Bootstrap modal property 'remote'
         *
         * @property remote
         * @type {String}
         */
        remote: PropTypes.string
    },

    /**
     * Returns the default props for the mixin
     *
     * @method getDefaultProps
     * @return {Dictionary} { backdrop: true, keyboard: true, show: true, remote: '' }
     */
    getDefaultProps: function getDefaultProps() {
        return {
            backdrop: true,
            keyboard: false,
            show: false,
            remote: ''
        };
    },

    /**
     * Configures the modal.
     *
     * @method componentDidMount
     */
    componentDidMount: function componentDidMount() {
        var _this = this;

        var $modal = $(ReactDOM.findDOMNode(this)).modal({
            backdrop: this.props.backdrop,
            keyboard: this.props.keyboard,
            show: this.props.show,
            remote: this.props.remote
        });

        handlerProps.forEach(function (prop) {
            if (_this[prop]) {
                $modal.on(bootstrapModalEvents[prop], _this[prop]);
            }

            if (_this.props[prop]) {
                $modal.on(bootstrapModalEvents[prop], _this.props[prop]);
            }
        });
    },

    /**
     * Clears modal configurations.
     *
     * @method componentWillUnmount
     */
    componentWillUnmount: function componentWillUnmount() {
        var _this2 = this;

        var $modal = $(ReactDOM.findDOMNode(this));

        handlerProps.forEach(function (prop) {
            if (_this2[prop]) {
                $modal.off(bootstrapModalEvents[prop], _this2[prop]);
            }

            if (_this2.props[prop]) {
                $modal.off(bootstrapModalEvents[prop], _this2.props[prop]);
            }
        });
    },

    /**
     * Hides the modal.
     *
     * @method hide
     */
    hide: function hide() {
        $(ReactDOM.findDOMNode(this)).modal('hide');
    },

    /**
     * Shows the modal.
     *
     * @method show
     */
    show: function show() {
        $(ReactDOM.findDOMNode(this)).modal('show');
    },

    /**
     * Toggles the modal.
     *
     * @method toggle
     */
    toggle: function toggle() {
        $(ReactDOM.findDOMNode(this)).modal('toggle');
    },

    /**
     * Renders the close button
     *
     * @method renderCloseButton
     */
    renderCloseButton: function renderCloseButton() {
        return React.createElement('button', { type: 'button', className: 'close', onClick: this.hide, dangerouslySetInnerHTML: { __html: '&times' } });
    }
};

module.exports = BootstrapModalMixin;
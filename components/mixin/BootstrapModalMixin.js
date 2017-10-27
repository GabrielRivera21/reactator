/* global require, module */

/**
 * Mixin for react components to have a modal object.
 *
 * @class BootstrapModalMixin
 */
'use strict';

var React = require('react'),
    $ = require('../../lib/jquery.js');

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
        handleShow: React.PropTypes.func,
        handleShown: React.PropTypes.func,
        handleHide: React.PropTypes.func,
        handleHidden: React.PropTypes.func,

        /**
         * Bootstrap modal property 'backdrop'
         *
         * @property backdrop
         * @type {Boolean}
         */
        backdrop: React.PropTypes.bool,

        /**
         * Bootstrap modal property 'keyboard'
         *
         * @property keyboard
         * @type {Boolean}
         */
        keyboard: React.PropTypes.bool,

        /**
         * Bootstrap modal property 'show'
         *
         * @property show
         * @type {Boolean}
         */
        show: React.PropTypes.bool,

        /**
         * Bootstrap modal property 'remote'
         *
         * @property remote
         * @type {String}
         */
        remote: React.PropTypes.string
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

        var $modal = $(this.getDOMNode()).modal({
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

        var $modal = $(this.getDOMNode());

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
        $(this.getDOMNode()).modal('hide');
    },

    /**
     * Shows the modal.
     *
     * @method show
     */
    show: function show() {
        $(this.getDOMNode()).modal('show');
    },

    /**
     * Toggles the modal.
     *
     * @method toggle
     */
    toggle: function toggle() {
        $(this.getDOMNode()).modal('toggle');
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
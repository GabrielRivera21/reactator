import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../../lib/jquery.js';

const bootstrapModalEvents = {
    handleShow: 'show.bs.modal',
    handleShown: 'shown.bs.modal',
    handleHide: 'hide.bs.modal',
    handleHidden: 'hidden.bs.modal'
};

const handlerProps = [
    /**
     * Optional callback for modal event 'handleShow'
     */
    'handleShow',

    /**
     * Optional callback for modal event 'handleShown'
     */
    'handleShown',

    /**
     * Optional callback for modal event 'handleHide'
     */
    'handleHide',

    /**
     * Optional callback for modal event 'handleHidden'
     */
    'handleHidden'
];

/**
 * Mixin for react components to have a modal object.
 *
 * @class BootstrapModalMixin
 * @memberof module:Reactator
 */
const BootstrapModalMixin = {
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
     * @return {Dictionary} { backdrop: true, keyboard: true, show: true, remote: '' }
     */
    getDefaultProps: function() {
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
     * @return {undefined}
     */
    componentDidMount: function() {
        const $modal = $(ReactDOM.findDOMNode(this)).modal({
            backdrop: this.props.backdrop,
            keyboard: this.props.keyboard,
            show: this.props.show,
            remote: this.props.remote
        });

        handlerProps.forEach((prop) =>{
            if (this[prop]) {
                $modal.on(bootstrapModalEvents[prop], this[prop]);
            }

            if (this.props[prop]) {
                $modal.on(bootstrapModalEvents[prop], this.props[prop]);
            }
        });
    },

    /**
     * Clears modal configurations.
     *
     * @return {undefined}
     */
    componentWillUnmount: function() {
        const $modal = $(ReactDOM.findDOMNode(this));

        handlerProps.forEach((prop) => {
            if (this[prop]) {
                $modal.off(bootstrapModalEvents[prop], this[prop]);
            }

            if (this.props[prop]) {
                $modal.off(bootstrapModalEvents[prop], this.props[prop]);
            }
        });
    },

    /**
     * Hides the modal.
     *
     * @return {undefined}
     */
    hide: function() {
        $(ReactDOM.findDOMNode(this)).modal('hide');
    },

    /**
     * Shows the modal.
     *
     * @return {undefined}
     */
    show: function() {
        $(ReactDOM.findDOMNode(this)).modal('show');
    },

    /**
     * Toggles the modal.
     *
     * @return {undefined}
     */
    toggle: function() {
        $(ReactDOM.findDOMNode(this)).modal('toggle');
    },

    /**
     * Renders the close button
     *
     * @return {Object} the button
     */
    renderCloseButton: function() {
        return (
            <button type="button" className="close" onClick={this.hide} dangerouslySetInnerHTML={{__html: '&times'}} />
        );
    }
};

module.exports = BootstrapModalMixin;


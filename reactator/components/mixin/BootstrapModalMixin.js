/* global require, module */

/**
 * Mixin for react components to have a modal object.
 *
 * @class BootstrapModalMixin
 */
const
    React = require('react'),
    $ = require('../../lib/jquery.js');

const bootstrapModalEvents = {
    handleShow: 'show.bs.modal',
    handleShown: 'shown.bs.modal',
    handleHide: 'hide.bs.modal',
    handleHidden: 'hidden.bs.modal'
};

const handlerProps = [

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
    'handleHidden'
];

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
     * @method componentDidMount
     */
    componentDidMount: function() {
        const $modal = $(this.getDOMNode()).modal({
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
     * @method componentWillUnmount
     */
    componentWillUnmount: function() {
        const $modal = $(this.getDOMNode());

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
     * @method hide
     */
    hide: function() {
        $(this.getDOMNode()).modal('hide');
    },

    /**
     * Shows the modal.
     *
     * @method show
     */
    show: function() {
        $(this.getDOMNode()).modal('show');
    },

    /**
     * Toggles the modal.
     *
     * @method toggle
     */
    toggle: function() {
        $(this.getDOMNode()).modal('toggle');
    },

    /**
     * Renders the close button
     *
     * @method renderCloseButton
     */
    renderCloseButton: function() {
        return (
            <button type="button" className="close" onClick={this.hide} dangerouslySetInnerHTML={{__html:'&times'}} />
        );
    }
};

module.exports = BootstrapModalMixin;


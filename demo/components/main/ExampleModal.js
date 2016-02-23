import React from 'react';
import BootstrapModalMixin from 'reactator/components/mixin/BootstrapModalMixin';
import BootstrapModal from 'reactator/components/BootstrapModal';

/**
 * @class
 * @memberof module:Demo
 * @classdesc ExampleModal is a simple example of a modal in a page using {@link BootstrapModalMixin} and {@link BootstrapModal}.
 */
const ExampleModal = React.createClass({
    mixins: [BootstrapModalMixin],

    render: function() {
        return (
            <BootstrapModal>
                <div className="modal-header">
                    {this.renderCloseButton()}
                    <strong>Example Modal</strong>
                </div>
                <div className="modal-body">
                    Some Modal Body, eh?!
                </div>
                <div className="modal-footer">
                    <a className='btn btn-danger' onClick={this.hide}>Close</a>
                </div>
            </BootstrapModal>
        );
    }
});

module.exports = ExampleModal;

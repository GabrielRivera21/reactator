import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../lib/jquery.js';

/**
 * @class
 * @classdesc React component BootstrapModal
 * @memberOf module:Reactator
 *
 * @example
 * <BootstrapModal
 *     handleHideModal={::this.handleHideModal}
 *     header={headerElement}
 *     body={bodyElement}
 *     footer={footerElement} />
 *
 * <BootstrapModal handleHideModal={::this.handleHideModal}>
 *     {headerElement}
 *     {bodyElement}
 *     {footerElement}
 * </BootstrapModal>
 */
export default class BootstrapModal extends React.PureComponent {
    static propTypes = {
        handleHideModal: React.PropTypes.func.isRequired,
        header: React.PropTypes.element,
        body: React.PropTypes.element,
        footer: React.PropTypes.element
    }

    componentDidMount() {
        const domNode = $(ReactDOM.findDOMNode(this));

        domNode.modal('show');
        domNode.on('hidden.bs.modal', this.props.handleHideModal);
    }

    componentWillUnmount() {
        $(ReactDOM.findDOMNode(this)).modal('hide');
    }

    render() {
        let i = 0;

        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.props.header || this.props.children[i++]}
                        </div>
                        <div className="modal-body">
                            {this.props.body || this.props.children[i++]}
                        </div>
                        <div className="modal-footer">
                            {this.props.footer || this.props.children[i++]}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

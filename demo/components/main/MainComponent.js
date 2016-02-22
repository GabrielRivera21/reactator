/* global require, module */

import React from 'react';
import ResponsiveComponent from 'reactator/components/ResponsiveComponent';
import ExampleModal from './ExampleModal';

/**
 * @class
 * @memberof module:Demo
 * @classdesc MainComponent is a simple default page for the demo.
 *            Demonstrate use of context.router and {@link ResponsiveComponent}
 */
const MainComponent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    profilePage: function() {
        this.context.router.push({
            pathname: '/profile',
            query: {},
            state: {}
        });
    },

    showModal: function() {
        this.refs.exampleModal.show();
    },

    render: function() {
        return (
            <div>
                <ResponsiveComponent
                    SM={<div>You shall render gte SM!</div>}
                    XS={<div>You shall render XS!</div>} />
                <br />
                <a className='btn btn-primary' onClick={this.profilePage}>Profile Page</a>
                <a className='btn btn-primary' onClick={this.showModal}>Show Modal</a>
                <ExampleModal ref="exampleModal" />
            </div>
        );
    }
});

module.exports = MainComponent;

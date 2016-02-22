/* global require, module */

import React from 'react';

/**
 * @class
 * @memberof module:Demo
 * @classdesc AppLayout is a basic layout for the demo adding a div.app around its children.
 */
const AppLayout = React.createClass({
    render: function() {
        return (
            <div className='app'>
                {this.props.children}
            </div>
        );
    }
});

module.exports = AppLayout;

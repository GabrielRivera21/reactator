import React from 'react';

/**
 * @class
 * @classdesc React component BasicLayout
 * @memberof module:Reactator
 */
const BasicLayout = React.createClass({
    render: function() {
        return (
          <div>
            {this.props.children}
          </div>
        );
    }
});

module.exports = BasicLayout;

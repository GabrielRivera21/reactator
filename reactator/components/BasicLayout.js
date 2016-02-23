import React from 'react';

/**
 * React component BasicLayout
 *
 * @class BasicLayout
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

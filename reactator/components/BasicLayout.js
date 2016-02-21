/* global require, module */

const
    React = require('react');

/**
 * React component BasicLayout
 *
 * @class BasicLayout
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

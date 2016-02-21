/* global require, module */

const
    React = require('react'),
    Router = require('react-router');

/**
 * React component AppLayout
 *
 * @class AppLayout
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

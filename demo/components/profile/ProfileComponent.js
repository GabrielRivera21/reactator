/* global require, module */

const
    React = require('react');

/**
 * React component ProfileComponent
 *
 * @class ProfileComponent
 */
const ProfileComponent = React.createClass({


    contextTypes: {
        router: React.PropTypes.object
    },

    mainPage: function() {
        this.context.router.push({
            pathname: '/',
            query: {},
            state: {}
        });
    },

    backPage: function() {
        this.context.router.goBack();
    },

    render: function() {
        return (
            <div>
                <div>
                    <a className='btn btn-primary' onClick={this.mainPage}>Main Page</a>
                    <a className='btn btn-primary' onClick={this.backPage}>Back</a>
                </div>
            </div>
        );
    }
});

module.exports = ProfileComponent;

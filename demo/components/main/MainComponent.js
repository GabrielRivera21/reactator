/* global require, module */

const
    React = require('react'),
    AppStore = require('reactator/stores/AppStore'),
    AppAction = require('reactator/actions/AppAction'),
    ResponsiveComponent = require('reactator/components/ResponsiveComponent');

/**
 * React component MainComponent
 *
 * @class MainComponent
 */
var MainComponent = React.createClass({

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

    render: function() {
        return (
            <div>
                <ResponsiveComponent
                    SM={<div>You shall render gte SM!</div>}
                    XS={<div>You shall render XS!</div>} />
                <br />
                <a className='btn btn-primary' onClick={this.profilePage}>Profile Page</a>
            </div>
        );
    }
});

module.exports = MainComponent;

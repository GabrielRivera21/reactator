/* global require, module */

const
    React = require('react'),
    AppStore = require('../../../../stores/AppStore.js'),
    AppAction = require('../../../../actions/AppAction.js'),
    ResponsiveComponent = require('../../../../components/common/ResponsiveComponent.js');

/**
 * React component MainComponent
 *
 * @class MainComponent
 */
var MainComponent = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    profilePage : function() {
        this.context.router.transitionTo('/profile', {}, {});
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

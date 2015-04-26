/* global require, module */

var React = require('react'),
    AppStore = require('../../stores/AppStore.js'),
    AppAction = require('../../actions/AppAction.js');

/**
 * React component MainComponent
 *
 * @class MainComponent
 */
var MainComponent = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState : function() {
        return {
            count : 0
        };
    },

    componentDidMount : function() {
        AppStore.addChangeListener(this.onAppStoreChange);
    },

    componentWillUnmount : function() {
        AppStore.removeChangeListener(this.onAppStoreChange);
    },

    onAppStoreChange : function() {
        this.setState({count: this.state.count + 1});
    },

    samePage : function() {
        this.context.router.transitionTo('/', {}, {r:Math.random()});
    },

    profilePage : function() {
        this.context.router.transitionTo('profile', {}, {});
    },

    render: function() {
        return (
            <div>
                <h2>Main to be implemented: {this.state.count}.</h2>
                <div>
                    <a className='btn btn-primary' onClick={this.samePage}>Same Page</a>
                    <a className='btn btn-primary' onClick={this.profilePage}>Profile Page</a>
                </div>
            </div>
        );
    }
});

module.exports = MainComponent;

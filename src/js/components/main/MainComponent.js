/* global require, module */

var React = require('react');
var AppStore = require('../../stores/AppStore.js');
var AppAction = require('../../actions/AppAction.js');

/**
 * React component MainComponent
 *
 * @class MainComponent
 */
var MainComponent = React.createClass({

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

    render: function() {
        return (
            <h2>Main to be implemented: {this.state.count}. <a className='btn btn-primary' onClick={AppAction.noop}>No-Op</a></h2>
        );
    }
});

module.exports = MainComponent;

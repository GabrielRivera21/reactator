import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../lib/jquery.js';
import _ from '../lib/lodash.js';
import AppConstants from '../constants/AppConstants.js';
import AppAction from '../actions/AppAction.js';

/**
 * @class
 * @classdesc React component MetaDataComponent that handles window resize and provides information on the
 *            state of the responsive css to the {@link module:Reactator.AppStore}.
 * @memberof module:Reactator
 */
const MetaDataComponent = React.createClass({

    handleWindowResize: function() {
        const $responsive = $(ReactDOM.findDOMNode(this)).find('.responsive');
        var isVisible = className => $responsive.find(className).is(':visible');

        var visibility = AppConstants.XS;

        if (isVisible('.visible-lg-block')) {
            visibility = AppConstants.LG;
        } else if (isVisible('.visible-md-block')) {
            visibility = AppConstants.MD;
        } else if (isVisible('.visible-sm-block')) {
            visibility = AppConstants.SM;
        }

        AppAction.resize(window.innerWidth, window.innerHeight, visibility);
    },

    componentDidMount: function() {
        window.addEventListener('resize', _.debounce(this.handleWindowResize, 500));
        this.handleWindowResize();

        if (!_.isUndefined(this.props.onComponentDidMount)) {
            this.props.onComponentDidMount();
        }
    },

    render: function() {
        return (
            <div>
                <div className='responsive'>
                    <div className='visible-lg-block' />
                    <div className='visible-md-block' />
                    <div className='visible-sm-block' />
                </div>
            </div>
        );
    }

});

module.exports = MetaDataComponent;

/* global require, module, window */

var React = require('react');
var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var $ = require('../../lib/jquery.js');
var _ = require('underscore');

/**
 * React component MetaDataComponent that handles window resize and provides information on the
 * state of the responsive css to the {{#crossLink "AppStore"}}{{/crossLink}}.
 *
 * @class MetaDataComponent
 */
var MetaDataComponent = React.createClass({

    handleWindowResize : function() {
        var $responsive = $(this.getDOMNode()).find('.responsive');
        var isVisible = function(className) {
            return $responsive.find(className).is(':visible');
        };

        AppDispatcher.handleWindowResize({
            width: window.innerWidth,
            height: window.innerHeight,
            isVisibleXS: isVisible('.visible-xs-block'),
            isVisibleSM: isVisible('.visible-sm-block'),
            isVisibleMD: isVisible('.visible-md-block'),
            isVisibleLG: isVisible('.visible-lg-block'),
            isHiddenXS: !isVisible('.hidden-xs'),
            isHiddenSM: !isVisible('.hidden-sm'),
            isHiddenMD: !isVisible('.hidden-md'),
            isHiddenLG: !isVisible('.hidden-lg')
        });
    },

    componentDidMount: function() {
        window.addEventListener('resize', _.debounce(this.handleWindowResize, 500));
        this.handleWindowResize();
    },

    render: function() {
        return (
            <div>
                <div className='responsive'>
                    <div className='visible-xs-block' />
                    <div className='visible-sm-block' />
                    <div className='visible-md-block' />
                    <div className='visible-lg-block' />
                    <div className='hidden-xs' />
                    <div className='hidden-sm' />
                    <div className='hidden-md' />
                    <div className='hidden-lg' />
                </div>
            </div>
        );
    }

});

module.exports = MetaDataComponent;
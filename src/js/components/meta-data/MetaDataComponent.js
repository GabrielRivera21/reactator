/* global require, module, window */

var React = require('react'),
    AppConstants = require('../../constants/AppConstants.js'),
    AppAction = require('../../actions/AppAction.js'),
    $ = require('../../lib/jquery.js'),
    _ = require('underscore');

/**
 * React component MetaDataComponent that handles window resize and provides information on the
 * state of the responsive css to the {{#crossLink "AppStore"}}{{/crossLink}}.
 *
 * @class MetaDataComponent
 */
var MetaDataComponent = React.createClass({

    handleWindowResize : function() {
        var $responsive = $(this.getDOMNode()).find('.responsive');
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
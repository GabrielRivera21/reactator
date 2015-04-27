/* global require, module */

const React = require('react/addons');

/**
 * React component BootstrapModal
 *
 * @class BootstrapModal
 */
const BootstrapModal = React.createClass({
    propTypes: {
        classes : React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps : function() {
        return {
            classes : []
        };
    },

    render: function() {
        var classes = "modal fade";
        this.props.classes.forEach(function(className) {
            classes += " " + className;
        });

        return (
            <div className={classes}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = BootstrapModal;

import _ from '../../lib/lodash.js';
import React, {PropTypes} from 'react';
import ResponsiveConstants from '../../constants/ResponsiveConstants.js';
import ReduxComponent from '../ReduxComponent.js';

// TEST:

/**
 * @class ResponsiveComponent
 * @classdesc redux component rendering the appropriate element based on window size
 * @memberOf module:Reactator
 *
 * @param {ResponsiveConstants} props.visibility - PropTypes.string.isRequired
 * @param {ReactElement} props.XS - React.PropTypes.element
 * @param {ReactElement} props.SM - React.PropTypes.element
 * @param {ReactElement} props.MD - React.PropTypes.element
 * @param {ReactElement} props.LG - React.PropTypes.element
 * @param {ReactElement} props.XL - React.PropTypes.element
 */
export default ReduxComponent({
    visibility: PropTypes.string.isRequired,
    XS: React.PropTypes.element,
    SM: React.PropTypes.element,
    MD: React.PropTypes.element,
    LG: React.PropTypes.element,
    XL: React.PropTypes.element
}, (props) => {
    const visibilityValue = ResponsiveConstants.value(props.visibility);

    for (let value = visibilityValue; value >= ResponsiveConstants.MIN_VALUE; --value) {
        const name = ResponsiveConstants.name(value);

        if (!_.isNil(props[name])) {
            return props[name];
        }
    }

    return <div />;
});

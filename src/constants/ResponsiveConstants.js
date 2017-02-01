import _ from '../lib/lodash.js';
import keyMirror from 'keymirror';

// TEST:

/**
 * @class
 * @classdesc Constants related to the responsive state of the app
 * @memberOf module:Reactator
 */
const ResopnsiveConstants = keyMirror({
    XS: null,
    SM: null,
    MD: null,
    LG: null,
    XL: null
});

const VALUE_TO_NAME = [];
const NAME_TO_VALUE = _.reduce(
    ResopnsiveConstants,
    (m, k) => {
        m[k] = VALUE_TO_NAME.length;
        VALUE_TO_NAME.push(k);
        return m;
    }, {});

/**
 * @method module:Reactator.ResopnsiveConstants#name
 *
 * @param {Number} value - value to lookup
 *
 * @return {String} name represented by the value
 */
ResopnsiveConstants.name = (value) => {
    return VALUE_TO_NAME[value];
};

/**
 * @method module:Reactator.ResopnsiveConstants#value
 *
 * @param {String} name - name to get value for
 *
 * @return {Number} value representing the name
 */
ResopnsiveConstants.value = (name) => {
    return NAME_TO_VALUE[name];
};

/**
 * Min Value.
 * @type {Number}
 */
ResopnsiveConstants.MIN_VALUE = ResopnsiveConstants.value(ResopnsiveConstants.XS);

/**
 * Max Value.
 * @type {Number}
 */
ResopnsiveConstants.MAX_VALUE = ResopnsiveConstants.value(ResopnsiveConstants.XL);

/**
 * @method module:Reactator.ResopnsiveConstants#isValid
 *
 * @param {String} name - name to get value for
 *
 * @return {Number} value representing the name
 */
ResopnsiveConstants.isValid = (name) => {
    return !_.isNil(NAME_TO_VALUE[name]);
};

export default ResopnsiveConstants;

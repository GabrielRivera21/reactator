import _ from 'lodash';
import ClientError from '../client/ClientError.js';
import HttpStatus from 'http-status-codes';

function newError(message, defaultMessage, status, severity) {
    if (!_.isUndefined(status)) {
        const msg = !_.isUndefined(message) ? message : HttpStatus.getStatusText(status);
        let options;

        if (!_.isUndefined(severity)) {
            options = {
                severity: severity
            };
        }

        return new ClientError(status, msg,  undefined, undefined, options);
    } else {
        return new Error(message || defaultMessage);
    }
}

/**
 * @namespace lodash
 * @classdesc lodash
 * @memberOf module:Reactator
 */
_.map({

    /**
     * @method module:Reactator.lodash#checkDefined
     *
     * @param {Object} obj object to check
     * @param {String} message message
     * @param {Number} status status
     * @param {Number} severity severity
     *
     * @return {Object} the object
     */
    checkDefined(obj, message, status, severity) {
        if (_.isNil(obj)) {
            throw newError(message, 'Value is not defined!', status, severity);
        }

        return obj;
    },

    /**
     * @method module:Reactator.lodash#checkNotDefined
     *
     * @param {Object} obj object to check
     * @param {String} message message
     * @param {Number} status status
     * @param {Number} severity severity
     *
     * @return {Object} the object
     */
    checkNotDefined(obj, message, status, severity) {
        if (!_.isNil(obj)) {
            throw newError(message, 'Value is defined!', status, severity);
        }

        return obj;
    },

    /**
     * @method module:Reactator.lodash#check
     *
     * @param {Boolean} value value to check
     * @param {String} message message
     * @param {Number} status status
     * @param {Number} severity severity
     *
     * @return {Object} the object
     */
    check(value, message, status, severity) {
        if (value !== true) {
            throw newError(message, 'Value is not true!', status, severity);
        }
    },

    /**
     * @method module:Reactator.lodash#emptyToNull
     *
     * @param {String} value value to check
     *
     * @return {String} value or null if value is empty
     */
    emptyToNull(value) {
        var trimmed = _.trim(value);

        return _.isEmpty(trimmed) ? null : trimmed;
    },

    /**
     * @method module:Reactator.lodash#nullToEmpty
     *
     * @param {String} value value to check
     *
     * @return {String} value or empty if null
     */
    nullToEmpty(value) {
        return _.isNil(value) ? '' : value;
    },

    /**
     * @method module:Reactator.lodash#getOnlyElement
     *
     * @param {Array} collection collection to get the first element of
     *
     * @return {Object} first element of the array
     * @throws {Error} If collection is not an array and doesn't only have a single element
     */
    getOnlyElement(collection) {
        if (!_.isArray(collection)) {
            throw new Error('Collection has to be an array!');
        }

        const size = _.size(collection);

        if (size === 1) {
            return _.first(collection);
        } else if (size === 0) {
            throw new Error('Empty collection, while expecting one element!');
        } else {
            throw new Error('Expecting one element, got more!');
        }
    }
}, (value, key) => {
    _.mixin({
        [key]: value
    });
});

module.exports = _;

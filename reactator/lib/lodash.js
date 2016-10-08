import _ from 'lodash';
import ClientError from '../client/ClientError.js';
import HttpStatus from 'http-status-codes';

function newError(message, defaultMessage, status, severity) {
    if (!_.isUndefined(status)) {
        var msg = !_.isUndefined(message) ? message : HttpStatus.getStatusText(status);
        var options;

        if (!_.isUndefined(severity)) {
            options = {
                severity: severity
            };
        }

        return new ClientError(status, msg,  undefined, undefined, options);
    }

    return new Error(message || defaultMessage);
}

const mixins = {
    checkDefined: (obj, message, status, severity) => {
        if (_.isNil(obj)) {
            throw newError(message, 'Value is not defined!', status, severity);
        }

        return obj;
    },

    checkNotDefined: (obj, message, status, severity) => {
        if (!_.isNil(obj)) {
            throw newError(message, 'Value is defined!', status, severity);
        }

        return obj;
    },

    check: (value, message, status, severity) => {
        if (value !== true) {
            throw newError(message, 'Value is not true!', status, severity);
        }
    },

    emptyToNull: (value) => {
        var trimmed = _.trim(value);

        return _.isEmpty(trimmed) ? null : trimmed;
    },

    nullToEmpty: (value) => {
        return _.isNil(value) ? '' : value;
    },

    getOnlyElement: (collection) => {
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
};

_.map(mixins, (value, key) => {
    var mixin = {};

    mixin[key] = value;
    _.mixin(mixin);
});

module.exports = _;

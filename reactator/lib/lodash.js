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
    }
};

_.map(mixins, (value, key) => {
    var mixin = {};

    mixin[key] = value;
    _.mixin(mixin);
});

module.exports = _;

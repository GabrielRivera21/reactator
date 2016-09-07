import _ from 'lodash';
import ClientError from '../client/ClientError.js';
import HttpStatus from 'http-status-codes';

function newError(message, defaultMessage, status) {
    if (!_.isUndefined(status)) {
        if (!_.isUndefined(message)) {
            return new ClientError(status, message);
        } else {
            return new ClientError(status, HttpStatus.getStatusText(status));
        }
    }

    return new Error(message || defaultMessage);
}

const mixins = {
    checkDefined: (obj, message, status) => {
        if (_.isNil(obj)) {
            throw newError(message, 'Value is not defined!', status);
        }

        return obj;
    },

    checkNotDefined: (obj, message, status) => {
        if (!_.isNil(obj)) {
            throw newError(message, 'Value is defined!', status);
        }

        return obj;
    },

    check: (value, message, status) => {
        if (value !== true) {
            throw newError(message, 'Valid is not true!', status);
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

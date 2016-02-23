import keyMirror from 'keymirror';

/**
 * All the main App constants that the AppDispatcher or others may use.
 *
 * @class AppConstants
 * @memberof module:Reactator
 */
const AppConstants = keyMirror({
    ROUTE_UPDATE: null,
    ROUTE_ACTION: null,
    WINDOW_RESIZE_ACTION: null,

    XS: null,
    SM: null,
    MD: null,
    LG: null
});

AppConstants.VISIBILITY_ORDER = [
    AppConstants.LG,
    AppConstants.MD,
    AppConstants.SM,
    AppConstants.XS
];

module.exports = AppConstants;

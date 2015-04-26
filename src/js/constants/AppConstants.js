/* global require, module */

/**
 * All the main App constants that the AppDispatcher or others may use.
 *
 * @class AppConstants
 */
const keyMirror = require('keymirror');

const AppConstants = keyMirror({
  ROUTE_ACTION : null,
  WINDOW_RESIZE_ACTION : null,

  XS : null,
  SM : null,
  MD : null,
  LG : null
});

AppConstants.VISIBILITY_ORDER = [
    AppConstants.LG,
    AppConstants.MD,
    AppConstants.SM,
    AppConstants.XS
];

module.exports = AppConstants;

import ActionConstants from '../constants/ActionConstants.js';
import {createAction} from 'redux-actions';

/**
 * @namespace ResponsiveAction
 * @classdesc ResponsiveAction
 * @memberOf module:Reactator
 */

/**
 * @method module:Reactator.ResponsiveAction#setResponsiveViewAction
 *
 * @example
 * dispatch(setResponsiveViewAction({
 *     visibility: visibility,
 *     width: window.innerWidth,
 *     height: window.innerHeight
 * }));
 *
 * @return {Object} action representing ActionConstants.SET_RESPONSIVE_VIEW
 * @see module:Reactator.ActionConstants
 */
export const setResponsiveViewAction = createAction(ActionConstants.SET_RESPONSIVE_VIEW);

import ResponsiveConstants from '../constants/ResponsiveConstants.js';
import {Reducer, ReducerWrapper} from './Reducer.js';

// TEST:

/**
 * @class
 * @classdesc Reducer for the ResponsiveActions, wraps the Reducer with ReducerWrapper
 * @memberOf module:Reactator
 * @extends {module:Reactator.Reducer}
 * @example
 * // State will be extended with
 * state.responsive = {
 *     visibility: ResponsiveConstants.,
 *     width: ,
 *     height:
 * };
 *
 * @see module:Reactator.ResponsiveAction
 * @see module:Reactator.ReducerWrapper
 */
export default class ResponsiveReducer extends Reducer {
    constructor() {
        super('responsive');

        return new ReducerWrapper(this);
    }

    /**
     * @method module:Reactator.ResponsiveReducer#apply
     * @override
     * @description apply the state
     * @param {Object} state - current state
     *
     * @return {Object} state
     */
    apply(state = {visibility: ResponsiveConstants.MD, width: 960, height: 768}) {
        return state;
    }

    /**
     * @method module:Reactator.ResponsiveReducer#SET_RESPONSIVE_VIEW
     *
     * @param {Object} state - current state
     * @param {Object} action - action
     *
     * @return {Object} new state
     */
    SET_RESPONSIVE_VIEW(state, action) {
        if(ResponsiveConstants.isValid(action.payload.visibility)) {
            return action.payload;
        } else {
            return state;
        }
    }
}

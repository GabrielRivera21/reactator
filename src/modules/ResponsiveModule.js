import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from '../lib/jquery.js';
import _ from '../lib/lodash.js';
import {ReactatorModule} from './ReactatorModule.js';
import ResponsiveModuleComponent from '../components/responsive/ResponsiveModuleComponent.js';
import ReactLifeCycleCallback from '../components/ReactLifeCycleCallback.js';
import ResopnsiveConstants from '../constants/ResponsiveConstants.js';
import {setResponsiveViewAction} from '../actions/ResponsiveAction.js';

const RESPONSIVE_DELAY = moment.duration('PT0.1S').asMilliseconds();

// TEST:

/**
 * @class
 * @classdesc Responsive module exposing the Responsive state via redux store, with name of 'reactator-responsive'
 * @memberOf module:Reactator
 * @extends {module:Reactator.ReactatorModule}
 */
export default class ResponsiveModule extends ReactatorModule {
    constructor() {
        super('reactator-responsive');
        this.responsiveModuleComponent;
    }

    /**
     * @method module:Reactator.ResponsiveModule#getComponents
     * @override
     *
     * @return {Array} array of the components to be rendered
     */
    getComponents() {
        return [
            <ReactLifeCycleCallback key={this.name} onComponentDidMount={::this.bindResponsiveModuleComponent}>
                <ResponsiveModuleComponent />
            </ReactLifeCycleCallback>
        ];
    }

    /**
     * @method module:Reactator.ResponsiveModule#bindResponsiveModuleComponent
     * @protected
     *
     * @param {ResponsiveModuleComponent} component - component
     *
     * @return {undefined}
     */
    bindResponsiveModuleComponent(component) {
        this.responsiveModuleComponent = component;
    }

    /**
     * @method module:Reactator.ResponsiveModule#handleWindowResize
     * @protected
     *
     * @return {undefined}
     */
    handleWindowResize() {
        const $responsive = $(ReactDOM.findDOMNode(this.responsiveModuleComponent)).find('.responsive');
        const isVisible = className => $responsive.find(className).is(':visible');

        let visibility = ResopnsiveConstants.LG;

        _.each(ResponsiveModuleComponent.LEVELS, (level) => {
            if (!isVisible(level.key)) {
                visibility = level.value;
                return false;
            }
        });

        const action = setResponsiveViewAction({
            visibility: visibility,
            width: window.innerWidth,
            height: window.innerHeight
        });

        this.context.store.dispatch(action);
    }

    /**
     * @method module:Reactator.ResponsiveModule#didStart
     * @override
     *
     * @return {undefined}
     */
    didStart() {
        window.addEventListener('resize', _.debounce(::this.handleWindowResize, RESPONSIVE_DELAY / 10, {maxWait: RESPONSIVE_DELAY}));
        _.delay(::this.handleWindowResize, RESPONSIVE_DELAY / 10);

        return null;
    }
}

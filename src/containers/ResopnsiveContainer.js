import ReduxContainerBuilder from './ReduxContainerBuilder.js';
import ResponsiveComponent from '../components/responsive/ResponsiveComponent.js';

// TEST:

/**
 * @class ResponsiveContainer
 * @classdesc ResponsiveContainer mapping the 'responsive' state to module:Reactator.ResponsiveComponent
 * @example
 * <ResponsiveContainer
 *     XS={myAwesomeXSComponent}
 *     XL={myAwesomeXLComponent} />
 */
export default new ReduxContainerBuilder()
    .withMapStateToProps((state) => {
        return {
            visibility: state.responsive.visibility
        };
    })
    .withComponent(ResponsiveComponent)
    .build();

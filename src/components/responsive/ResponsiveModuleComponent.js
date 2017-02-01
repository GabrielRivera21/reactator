import React from 'react';
import ResopnsiveConstants from '../../constants/ResponsiveConstants.js';

// TEST:

/**
 * @class
 * @classdesc React component that handles window resize and provides information on the
 *            state of the responsive css to the {@link module:Reactator.AppStore}.
 *
 * @memberOf module:Reactator
 */
export default class ResponsiveModuleComponent extends React.PureComponent {
    static LEVELS = [
        {key: '.hidden-xl-up', value: ResopnsiveConstants.XL},
        {key: '.hidden-lg-up', value: ResopnsiveConstants.LG},
        {key: '.hidden-md-up', value: ResopnsiveConstants.MD},
        {key: '.hidden-sm-up', value: ResopnsiveConstants.SM},
        {key: '.hidden-xs-up', value: ResopnsiveConstants.XS}
    ];

    render() {
        return (
            <div>
                <div className='responsive'>
                    <div className='hidden-xs-up' />
                    <div className='hidden-sm-up' />
                    <div className='hidden-md-up' />
                    <div className='hidden-lg-up' />
                    <div className='hidden-xl-up' />
                </div>
            </div>
        );
    }
}

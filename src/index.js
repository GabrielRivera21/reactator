module.exports = {
    ReactatorAppConfiguration: require('./ReactatorAppConfiguration.js'),
    ReactatorBundle: require('./ReactatorBundle.js'),
    ReactatorClientApp: require('./ReactatorClientApp.js'),
    actions: {
        ActionFactory: require('./actions/ActionFactory.js'),
        ResponsiveAction: require('./actions/ResponsiveAction.js')
    },
    bundles: {
        ResponsiveBundle: require('./bundles/ResponsiveBundle.js')
    },
    client: {
        AjaxClient: require('./client/AjaxClient.js'),
        Client: require('./client/Client.js'),
        ClientError: require('./client/ClientError.js'),
        ClientResponse: require('./client/ClientResponse.js'),
        ClientWrapper: require('./client/ClientWrapper.js')
    },
    components: {
        BasicLayout: require('./components/BasicLayout.js'),
        BootstrapModal: require('./components/BootstrapModal.js'),
        ReactLifeCycleCallback: require('./components/ReactLifeCycleCallback.js'),
        ReduxComponent: require('./components/ReduxComponent.js'),
        responsive: {
            ResponsiveComponent: require('./components/responsive/ResponsiveComponent.js'),
            ResponsiveModuleComponent: require('./components/responsive/ResponsiveModuleComponent.js')
        }
    },
    constants: {
        ActionConstants: require('./constants/ActionConstants.js'),
        ResponsiveConstants: require('./constants/ResponsiveConstants.js')
    },
    containers: {
        ReduxContainerBuilder: require('./containers/ReduxContainerBuilder.js'),
        ResopnsiveContainer: require('./containers/ResopnsiveContainer.js')
    },
    lib: {
        jquery: require('./lib/jquery.js'),
        lodash: require('./lib/lodash.js')
    },
    modules: {
        ReactatorModule: require('./modules/ReactatorModule.js'),
        ResponsiveModule: require('./modules/ResponsiveModule.js')
    },
    reducers: {
        Reducer: require('./reducers/Reducer.js'),
        ResponsiveReducer: require('./reducers/ResponsiveReducer.js')
    },
    routes: {
        CompositeRoutes: require('./routes/CompositeRoutes.js'),
        Routes: require('./routes/Routes.js')
    }
};

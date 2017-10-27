/* global module, require */

'use strict';

module.exports = {
    AppStarter: require('./AppStarter.js'),
    actions: {
        AppAction: require('./actions/AppAction.js')
    },
    client: {
        Client: require('./client/Client.js'),
        ClientError: require('./client/ClientError.js'),
        ClientResponse: require('./client/ClientResponse.js'),
        ClientWrapper: require('./client/ClientWrapper.js'),
        AjaxClient: require('./client/AjaxClient.js')
    },
    components: {
        BasicLayout: require('./components/BasicLayout.js'),
        BootstrapModal: require('./components/BootstrapModal.js'),
        MetaDataComponent: require('./components/MetaDataComponent.js'),
        ResponsiveComponent: require('./components/ResponsiveComponent.js')
    },
    constants: {
        AppConstants: require('./constants/AppConstants.js')
    },
    dispatcher: {
        AppDispatcher: require('./dispatcher/AppDispatcher.js')
    },
    lib: {
        DispatcherFactory: require('./lib/DispatcherFactory.js'),
        jquery: require('./lib/jquery.js'),
        q: require('./lib/q.js'),
        Util: require('./lib/Util.js')
    },
    routes: {
        Routes: require('./routes/Routes.js')
    },
    stores: {
        Store: require('./stores/Store.js'),
        AppStore: require('./stores/AppStore.js')
    }
};
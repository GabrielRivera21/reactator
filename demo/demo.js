/* global module, require */

module.exports = {
    components: {
        AppLayout: require('./components/AppLayout.js'),
        main: {
            MainComponent: require('./components/main/MainComponent.js')
        },
        profile: {
            ProfileComponent: require('./components/profile/ProfileComponent.js')
        }
    },
    routes: {
        DemoRoutes: require('./routes/DemoRoutes.js'),
        MainRoutes: require('./routes/MainRoutes.js'),
        ProfileRoutes: require('./routes/ProfileRoutes.js')
    }
};

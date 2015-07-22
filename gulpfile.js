/* global require */

require('reactator/build/GulpTasks')
    .initialize(
        [
            'reactator/',
            'demo/',
        ],
        require('./gulp-build-config.json'),
        [
            './node_modules',
            '.'
        ]
    );

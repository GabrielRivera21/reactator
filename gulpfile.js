/* global require */

require('./reactator/build/GulpTasks.js')
    .initialize(
        [
            'reactator/',
            'demo/',
        ],
        require('./reactator.json'),
        [
            './node_modules',
            '.'
        ]
    );

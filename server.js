'use strict';
const Composer = require('./index');


Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if ( err ) {
            console.log('error', err);
            return;
        }
        console.log('Started the plot device on port ' + server.info.port);
    });
});

const bunyan = require('bunyan');
const log = bunyan.createLogger({
    name: 'log',
    streams: [{
        type: 'file',
        path: './log/test.log'
    }]
});
log.info('info');
log.warn('warn');


module.exports.log = log;
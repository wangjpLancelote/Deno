// const { fork } = require('child_process');
const chokidar = require('chokidar');
const cmd = require('node-cmd');
const { serialize } = require('v8');
const fork = require('child_process').fork;
const server = require('net').createServer();

var watcher = chokidar.watch('./index.js', {
    ignored: /[\/\\]/,
    persistent: true
})

watcher.on('ready', () => {
    // console.log('ready for change')
})

watcher.on('change', (path) => {
    // console.log('File:', path, 'has changed')
    createWorker();

})

/**创建子进程  */
const workers = {};
const createWorker = function () {
    let date = new Date();
    const worker = fork('./deamon.js');
    console.log('====================>>>重启进程<<<====================: ', date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    worker.on('exit', () => {
        console.log('进程退出');
        delete workers[worker.pid];
    })
    worker.send('server', server);
    workers[worker.pid] = worker;
}

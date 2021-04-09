const chokidar  = require('chokidar');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
///

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('========>>>message' + message);
    })

    chokidar.watch('.').on('change', (originPath) => {
        console.log(originPath)
        const filePath = path.resolve(__dirname, './', originPath);
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log(`文件${filePath}已改变`);
        if (originPath.endsWith('.html')) {
            ws.send(data);
        }
    })
})


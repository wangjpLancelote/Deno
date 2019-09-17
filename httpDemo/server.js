const http = require('http');

http.createServer((req, res) => {
    console.log('url', req.url);
    res.writeHead(200,
        {
        'content-type': 'text/plain;charset:utf-8'
        }
    )
    // res.send('tttt');
    // res.end("{data: 'end'}");
    res.end('this is http demo');
}).listen(3333);
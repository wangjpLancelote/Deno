const http = require('http');

http
	.createServer((req, res) => {
		console.log('url', req.url);
		// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
		// res.setHeader('Access-Control-Allow-Headers', 'content-type');
		// res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');

		res.writeHead(200, {
			'Content-type': 'text/plain;charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type'
		});

		if (req.method.toLowerCase() == 'options') {
			res.end('end');
		}

		if (req.url === '/test') {
			res.end('this is test');
		} else {
			res.end('this is http demo');
		}
	})
	.listen(3333);

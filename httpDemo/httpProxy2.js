const http = require('http');
const testData = { name: 'wangjianping', password: '123456' };

const server = http.createServer((request, response) => {
	if (request.url === '/') {
		response.end(JSON.stringify(testData));
	}
});

server.listen(4000, () => {
	console.log('the server is running at http://127.0.0.1:4000');
});

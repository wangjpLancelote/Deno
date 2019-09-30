/**
 * 代理服务器
 * 转发请求
 * 主要解决跨域
 * 接受以下条件：
 * 1.接受客户端请求
 * 2.将请求转发给服务器
 * 3.拿到服务器，响应数据
 * 4.将响应转发给客户端
 * 客户端 --->> localhost:3000 --->>>localhost:4000
 */

const http = require('http');

const server = http.createServer((request, response) => {
	response.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	const proxyHttp = http
		.request(
			{
				host: '127.0.0.1',
				port: 4000,
				url: '/',
				method: request.method,
				headers: request.headers
			},
			serverResponse => {
				let body = '';
				serverResponse.on('data', chunk => {
					body += chunk;
				});
				serverResponse.on('end', () => {
					console.log('body', body);
					response.end(body);
				});
			}
		)
		.end();
});

/**
 * 代理服务器 3000端口
 * 代理实体 4000端口
 */
server.listen(3000, () => {
	console.log('proxyHttp is running at http://localhost:3000');
});

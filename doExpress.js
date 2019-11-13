const http = require("http");
const url = require("url");

const methods = require("methods");
// let methods = ["get", "post", "put", "delete", "options", "update"];

function application() {
	/**返回一个方法 ，这个方法接受两个参数：req, res */
	let app = (req, res) => {
		let { pathname } = url.parse(req.url);

		let requestMethod = req.method.toLowerCase();
		if (pathname === "/favicon.ico") return;
		for (let i = 0; i < app.routes.length; ++i) {
			let { path, method, cb } = app.routes[i];
			console.log("iii", path, method, cb);

			if ((pathname === path || path === "*") && (requestMethod === method || requestMethod === "all")) {
				return cb(req, res);
			}
		}

		/**未匹配到任何路由 */
		res.end(`Cannot found ${pathname}/${requestMethod}`);
	};

	app.routes = [];
	[...methods, "all"].forEach(method => {
		app[method] = function(path, cb) {
			console.log("cb", cb());
			let layer = { path, method, cb };
			app.routes.push(layer);
		};
	});

	app.listen = function(...arguments) {
		console.log("appee", app);
		let server = http.createServer(app);
		console.log("app", app);
		server.listen(...arguments);
	};

	return app;
}

let ex = new application();
ex.get("/", (req, res) => {
	// res.send("this");
	if (res) {
		res.end("home");
	} else {
		console.log("this is cb");
	}
});
ex.listen(2222);
console.log("listening 2222");

class Axios {
	constructor(config = {}) {
		this.config = config;
		/**深拷贝配置 */
		this.copyConfig = {};

		this.interceptors = {
			request: new InterCeptor(),
			response: new InterCeptor()
		};
	}

	get(url, defaults = {}) {
		defaults.method = 'GET';
		defaults.url = url;
		return this.request(defaults);
		// return new Promise((resolve, reject) => {
		// 	let xhr = new XMLHttpRequest();
		// 	xhr.onload = function() {
		// 		resolve({
		// 			data: JSON.parse(xhr.responseText),
		// 			status: xhr.status,
		// 			statusText: xhr.statusText
		// 		});
		// 	};

		// 	// this.config.baseURL += url
		// 	let actualURL = this.config.baseURL + url;
		// 	xhr.open('get', actualURL, true);
		// 	for (let key in this.config.headers) {
		// 		xhr.setRequestHeader(key, this.config.headers[key]);
		// 	}
		// 	xhr.send();
		// });
	}

	post(url, data, defaults) {
		defaults.method = 'post';
		defaults.url = url;
		if (data) defaults.data = data;
		return this.request(defaults);
	}

	/**所有请求都通过这个入口进入 */
	request(defaults) {
		let baseConfigs = this.mergeConfig(this.config, defaults);
		let promise = Promise.resolve(baseConfigs);

		/**请求拦截器处理，实际上就是执行拦截器储存的方法 用promise包裹。是为了返回promise对象
		 * 这里可以看出，无论拦截器设置多少个，都会一一执行
		 */
		let requestHandlers = this.interceptors.request.handlers;
		/**遍历拦截器方法 */
		requestHandlers.forEach(handle => {
			promise = promise.then(handle.resolveHandler, handle.rejectHandler); //链式调用，最后就能返回promise
		});

		/**数据请求 数据请求都包裹早send函数里，同样用返回promsie*/
		promise = promise.then(this.send);

		/**响应拦截器 */
		let responseHandlers = this.interceptors.response.handlers;
		responseHandlers.forEach(handle => {
			promise = promise.then(handle.resolveHandler, handle.rejectHandler);
		});
		return promise;
	}

	/**数据请求 */
	send(config) {
		return new Promise(resolve => {
			let xhr = new XMLHttpRequest();
			// xhr.withCredentials = true;
			xhr.onload = function() {
				resolve({
					data: JSON.parse(xhr.responseText),
					status: xhr.status,
					statusText: xhr.statusText
				});
			};
			xhr.open(config.method, config.baseURL + config.url, true);

			for (let key in config.headers) {
				xhr.setRequestHeader(key, config.headers[key]);
			}
			console.log('qq', xhr.responseText);
			xhr.onreadystatechange = function() {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
					console.log('ssss', xhr.response);
				}
			};

			/**post 方法携带的data参数 */
			xhr.send(JSON.stringify(config.data));
		});
	}

	create(config) {
		return new Axios(this.deepCopy(config));
	}

	deepCopy(target) {
		for (let i in target) {
			if (Array.isArray(target[i])) {
				// this.deepCopy(target[i]);
				this.copyConfig[i] = target[i].slice();
			} else {
				this.copyConfig[i] = target[i];
			}
		}
		return this.copyConfig;
	}
	/**合并对象 */
	mergeConfig(target, req) {
		/**被合并 */
		let p = this.deepCopy(target);
		/**合并 */
		let q = this.deepCopy(req);

		let r = Object.keys(q).reduce((rt, key) => {
			if (['url', 'baseURL', 'method'].includes(key)) {
				rt[key] = q[key];
			}
			if (['headers'].includes(key)) {
				// rt[key] = { ...rt[key], ...q[key] };
				rt[key] = Object.assign({}, rt[key], q[key]);
			}
			return rt;
		}, p);
		return r;
	}
}

/**拦截器 */
class InterCeptor {
	constructor() {
		this.handlers = [];
	}

	use(resolveHandler, rejectHandler) {
		this.handlers.push({
			resolveHandler,
			rejectHandler
		});
	}
}

exports.Axios = new Axios();
// module.exports = { Axios };

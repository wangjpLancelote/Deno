// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../axiosFP.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Axios =
/*#__PURE__*/
function () {
  function Axios() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Axios);

    this.config = config;
    /**深拷贝配置 */

    this.copyConfig = {};
    this.interceptors = {
      request: new InterCeptor(),
      response: new InterCeptor()
    };
  }

  _createClass(Axios, [{
    key: "get",
    value: function get(url) {
      var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      defaults.method = 'GET';
      defaults.url = url;
      return this.request(defaults); // return new Promise((resolve, reject) => {
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
  }, {
    key: "post",
    value: function post(url, data, defaults) {
      defaults.method = 'post';
      defaults.url = url;
      if (data) defaults.data = data;
      return this.request(defaults);
    }
    /**所有请求都通过这个入口进入 */

  }, {
    key: "request",
    value: function request(defaults) {
      var baseConfigs = this.mergeConfig(this.config, defaults);
      var promise = Promise.resolve(baseConfigs);
      /**请求拦截器处理，实际上就是执行拦截器储存的方法 用promise包裹。是为了返回promise对象
       * 这里可以看出，无论拦截器设置多少个，都会一一执行
       */

      var requestHandlers = this.interceptors.request.handlers;
      /**遍历拦截器方法 */

      requestHandlers.forEach(function (handle) {
        promise = promise.then(handle.resolveHandler, handle.rejectHandler); //链式调用，最后就能返回promise
      });
      /**数据请求 数据请求都包裹早send函数里，同样用返回promsie*/

      promise = promise.then(this.send);
      /**响应拦截器 */

      var responseHandlers = this.interceptors.response.handlers;
      responseHandlers.forEach(function (handle) {
        promise = promise.then(handle.resolveHandler, handle.rejectHandler);
      });
      return promise;
    }
    /**数据请求 */

  }, {
    key: "send",
    value: function send(config) {
      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest(); // xhr.withCredentials = true;

        xhr.onload = function () {
          resolve({
            data: JSON.parse(xhr.responseText),
            status: xhr.status,
            statusText: xhr.statusText
          });
        };

        xhr.open(config.method, config.baseURL + config.url, true);

        for (var key in config.headers) {
          xhr.setRequestHeader(key, config.headers[key]);
        }

        console.log('qq', xhr.responseText);

        xhr.onreadystatechange = function () {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            console.log('ssss', xhr.response);
          }
        };
        /**post 方法携带的data参数 */


        xhr.send(JSON.stringify(config.data));
      });
    }
  }, {
    key: "create",
    value: function create(config) {
      return new Axios(this.deepCopy(config));
    }
  }, {
    key: "deepCopy",
    value: function deepCopy(target) {
      for (var i in target) {
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

  }, {
    key: "mergeConfig",
    value: function mergeConfig(target, req) {
      /**被合并 */
      var p = this.deepCopy(target);
      /**合并 */

      var q = this.deepCopy(req);
      var r = Object.keys(q).reduce(function (rt, key) {
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
  }]);

  return Axios;
}();
/**拦截器 */


var InterCeptor =
/*#__PURE__*/
function () {
  function InterCeptor() {
    _classCallCheck(this, InterCeptor);

    this.handlers = [];
  }

  _createClass(InterCeptor, [{
    key: "use",
    value: function use(resolveHandler, rejectHandler) {
      this.handlers.push({
        resolveHandler: resolveHandler,
        rejectHandler: rejectHandler
      });
    }
  }]);

  return InterCeptor;
}();

exports.Axios = new Axios(); // module.exports = { Axios };
},{}],"client.js":[function(require,module,exports) {
"use strict";

var _axiosFP = _interopRequireDefault(require("../axiosFP"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Axios = require('../axiosFP');
var axios = _axiosFP.default.Axios;
axios.config.baseURL = 'http://127.0.0.1:3333';
axios.interceptors.request.use(function (cn) {
  console.log('请求配置信息', cn);
  return cn;
});
axios.interceptors.request.use(function (cn) {
  cn.headers.token = 'x-token-654321';
  return cn;
});
axios.interceptors.response.use(function (res) {
  console.log('请求响应信息', res);
  return res;
});
axios.interceptors.response.use(function (res) {
  res.msg = 'request is ok';
  return res;
});
axios.get('/test', {
  headers: {
    token: 'x-token-123456'
  }
}).then(function (res) {
  console.log('res', res);
});
},{"../axiosFP":"../axiosFP.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56151" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","client.js"], null)
//# sourceMappingURL=/client.62456f60.js.map
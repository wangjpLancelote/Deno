/**
 * 拓展require 实现无感加载bytecode 文件.
 * 且要实现忽略文件后缀
 */

 const _module = require('module');
 const path = require('path');
 const makeRequire  = require('./make-require');
 const { loadBytecode } = require('./loader');
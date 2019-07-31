#!/usr/bin env node

let babel_node = require('babel-node-modules');
let files = process.argv.slice(-1)[0];
// babel_node --presets env
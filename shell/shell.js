#! /usr/bin/env node

let arguments = process.argv;
let caught = arguments.slice(-1);
let base = arguments.slice(0, -1);
console.log('arg :%j, caught :%d', arguments, caught);

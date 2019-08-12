
const { sayB } = require('./testB');

sayB();
function sayA () {
    console.log('sayA');
}

module.exports = {
    sayA
}
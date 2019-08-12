
const { sayA } = require('./testA');

sayA();
function sayB () {
    console.log('sayB');
}

module.exports = {
    sayB
}
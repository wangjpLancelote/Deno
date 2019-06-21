const index = require('./index');
const Schema = index.Schema;

/**
 * 
 * person 的 model Object
 */

const personSchema = new Schema({
    name: {type: String},
    male: {type: String},
    age: {type: Number}
});

module.exports = index.model('Person', personSchema);
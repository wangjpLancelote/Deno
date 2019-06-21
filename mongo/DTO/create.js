/**
 * 
 * DTO
 * create Object data
 * 在同一个collection中插入数据
 */
const Person = require('../person');
let obj = {
    name: 'wangjianping123',
    age: 21,
    male: 'male',
    extension: 'no'
}

Person.create(obj);
console.log('dd');
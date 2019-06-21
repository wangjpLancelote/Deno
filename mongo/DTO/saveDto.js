/**
 * 
 * DTO : 对数据对象的处理文件
 * save data
 */

 const Person = require('../person');

 const person = new Person({
     name: 'wangjianping',
     male: 'male',
     age: 18
 });
 person.save((err, res) => {
    if (err) throw new Error(err);
    console.log('save file successfuly', res);
 });
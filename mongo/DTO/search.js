/**
 * 
 * DTO 
 * search 根据条件查找
 */

 const Person = require('../person');

 const where = {'name': 'wangjianping'};
 const ID = '5d0c40f0736fd44eea8a72e7';

 Person.find(where, (err, res) => {
    if (err) return new Error(err);
    console.log('find result sucessfuly', res);
 });

 Person.findById(ID, (err, res) => {
    if (err) return new Error(err);
    console.log('findByID successfuly', res);
 });
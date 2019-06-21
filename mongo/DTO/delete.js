/**
 * 
 * DTO 
 * delete
 */

 const Person = require('../person');

 const where = {'name': 'wangjianping'};

 Person.remove(where, (err, res) => {
    if (err) return new Error(err);
    console.log('remove result', res);
 });
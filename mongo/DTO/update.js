/**
 * 
 * DTO 
 * update
 */

 const Person = require('../person');

 const where = {'name': 'wangjianping'}; //筛选条件
 const update = {'age': 20}; //更新数据

 Person.update(where, update, (err, res) => {
    if (err) throw new Error(err);
    console.log('update data successfuly', res);
 });
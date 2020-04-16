const bcrypt = require('bcryptjs');

/** 快速生成hash值 */
const hash = bcrypt.hashSync('bacon', 8);
console.log('hash', hash);

/** 生成hash 密码 */
const salt = bcrypt.genSaltSync(10);
let hash2 = bcrypt.hashSync("B4c0/\/", salt);
console.log('hash2', hash2);
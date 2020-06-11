/**
 * nodejieba
 * 开源的分词工具，功能强大性能优越的分词组件。
 */

const nodejieba = require('nodejieba');

// nodejieba.load({
//     userDict: './user.utf8'
// });

/**分词 */
let result = nodejieba.cut("帝国主义要把我们的地瓜分掉");
console.log('res', result);

result = nodejieba.cut("土地，俺老孙的金箍棒在哪里?");
console.log('res', result);

result = nodejieba.cut("大圣，您的金箍棒就棒在特别配您的发型!");
console.log('res', result);

/**提取关键词 */
const content = `HTTP、HTTP/2与性能优化
本文的目的是通过比较告诉大家，为什么应该从HTTP迁移到HTTPS，以及为什么应该添加到HTTP/2的支持。在比较HTTP和HTTP/2之前，先看看什么是HTTP。
什么是HTTP
HTTP是在万维网上通信的一组规则。HTTP属于应用层协议，跑在TCP/IP层之上。用户通过浏览器请求网页时，HTTP负责处理请求并在Web服务器与客户端之间建立连接。
有了HTTP/2，不使用雪碧图、压缩、拼接，也可以提升性能。然而，这不代表不应该使用这些技术。不过这已经清楚表明了我们从HTTP/1.1移动到HTTP/2的必要性。`

result = nodejieba.extract(content, 20);
console.log('res',result.length, result );
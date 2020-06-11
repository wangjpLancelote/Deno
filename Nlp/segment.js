const Segment = require('segment');
var segment = new Segment();

segment.useDefault();
console.log('返回词性',segment.doSegment("这是一个基于Node.js的中文分词模块。"));
/**
 * @returns
 * [
    { w: '这是', p: 0 },
    { w: '一个', p: 2097152 },
    { w: '基于', p: 262144 },
    { w: 'Node.js', p: 8 },
    { w: '的', p: 8192 },
    { w: '中文', p: 1048576 },
    { w: '分词', p: 4096 },
    { w: '模块', p: 1048576 }
    ]
    w: 表示词的内容
    p: 表示词性
 */

 console.log('不返回词性', segment.doSegment('这是一个基于Node.js的中文分词模块', {simple: true}))
 /**
  * @returns
  * [ '这是', '一个', '基于', 'Node.js', '的', '中文', '分词', '模块' ]
  */
 console.log('去掉标点符号', segment.doSegment('这是一个基于Node.js的中文分词模块', {stripPunctuation: true}))
 /**
  * @returns
  * [
    { w: '这是', p: 0 },
    { w: '一个', p: 2097152 },
    { w: '基于', p: 262144 },
    { w: 'Node.js', p: 8 },
    { w: '的', p: 8192 },
    { w: '中文', p: 1048576 },
    { w: '分词', p: 4096 },
    { w: '模块', p: 1048576 }
    ]
  */

  segment.loadSynonymDict('./synonym.txt');// 导入词典,将规则内的词进行同义转化
  console.log('同义词词典', segment.doSegment('什么时候我也开始夜夜无法入睡', {convertSynonym: true}))
  /**
   * @returns
   * [
        { w: '何时', p: 0 },
        { w: '我', p: 65536 },
        { w: '也', p: 134217728 },
        { w: '开始', p: 4096 },
        { w: '夜夜', p: 131072 },
        { w: '无法', p: 134217728 },
        { w: '入睡', p: 4096 }
        ]
   */

  segment.loadStopwordDict('./stopwords.txt');
  console.log('去除停止符', segment.doSegment('之所以要编写一个纯JS的分词器是因为当时没有一个简单易用的Node.js模块', {stripStopword: true}))
  /**
   * @returns
   * [
        { w: '编写', p: 4096 },
        { w: '纯', p: 1073741824 },
        { w: 'JS', p: [ 16 ] },
        { w: '分词', p: 4096 },
        { w: '器' },
        { w: '当时', p: 16384 },
        { w: '没有', p: 4096 },
        { w: '简单', p: 1073741824 },
        { w: '易用' },
        { w: 'Node.js', p: 8 },
        { w: '模块', p: 1048576 }
        ]
   */

  /**
   * 词典文件
   * 为纯文本文件，每行定一个词，格式为: 词|词性|词权值, 如：工信处|0x0020|100
   * 词权值越大，表示词出现的频率越高。
   */

   module.exports = exports = Segment;
   exports.Segment = Segment;
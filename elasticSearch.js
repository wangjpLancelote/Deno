const elasticsearch = require('elasticsearch');

const es = new elasticsearch.Client({
    host: 'localhost:9200',
    /**日志信息现实控制等级 默认是console 
     * trace 表示写入文件
    */
    log: 'trace',

    /**输出到日志表 path路径 */
    // log : {
    //     type: 'file',
    //     level: 'trace',
    //     path: `${__dirname}`
    // },
    // /**输出到不同的文件日志 */
    // log : [
    //     {
    //         type: 'console',
    //         level: 'error'
    //     },
    //     {
    //         type: 'file',
    //         level: 'trace',
    //         path: `${__dirname}`
    //     }
    // ]
});

/** 插入单条数据 */
es.index({
    index: 'esdb', //数据库
    type: 'estbl', //表
    id: JSON.stringify(new Date().getTime()), //id 唯一标识
    body: {  //数据内容，用body包裹
        title: 'test',
        tages: ['y', 'z'],
        published: true,
        published_at: '2013-01-01',
        counter: 1,
        name : '999'
    }
}, (err, res) => {
    if (err) return new Error(err);
    return console.log('res', res);
})

/**执行多条命令 */
async function bulk () {
    let resp = null;
     try {
        resp = await es.bulk({
            body: [
                /**插入数据 
                 * _index: 索引|用于文档分区 只能小写字母，不允许加下划线，不能有逗号
                 * _type: 子分区，相当于文档分组，用于更精确的定位查找元素 允许大小写，不能有逗号，不能有下划线,虚拟逻辑分组，用来过滤document
                 * _id： 用于和_index和_type组合成唯一确定的文档，自己提供或es自动生成
                 * index里的单条数据称为文档（document）一个index由许多的document组成| document使用JSON格式
                 * 同一个index下的document尽量保持一样的结构（schema）有利于提高搜索效率。
                */
                {index: {_index: '', _type: '', _id: 1}},
                /**文档 */
                {title: 'foo'},
                {update: {}},
                /**文档操作描述 */
                {doc: { title: 'foo' }},
                /**删除数据 */
                {delete: {}}
            ]
        })
     } catch (e) {

     }
}

/**
 * 删除数据
 */
es.delete({

}, (err, res) => {

})
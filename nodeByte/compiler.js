const vm = require('vm');
const fs = require('fs').promises;
const _module = require('module');
const v8 = require('v8');
v8.setFlagsFromString('--no-lazy');

/** 适合模块导出包裹函数 */

async function compileFile (filePath) {
    try {
        const code = await fs.readFileSync(filePath, 'utf-8');
        const script = new vm.Script(_module.wrap(code)); //执行代码块,被包裹函数修饰，被包裹后的代码加载后不会直接输出Hell bytecode ，因为会输出一个闭包函数，需要被调用这个函数才能输出内容.
        const byteCode = script.createCachedData(); //创建缓存数据
        await fs.writeFileSync(filePath.replace(/\.js$/, '.bytecode'), byteCode);
    } catch (e) {
        console.log('>>>>>>>>>>', e);
    }
}

compileFile(process.argv[2]);
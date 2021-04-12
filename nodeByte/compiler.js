const vm = require('vm');
const fs = require('fs');
const v8 = require('v8');
v8.setFlagsFromString('--no-lazy');

async function compileFile (filePath) {
    try {
        const code = await fs.readFileSync(filePath, 'utf-8');
        const script = new vm.Script(code); //执行代码块
        const byteCode = script.createCachedData(); //创建缓存数据
        await fs.writeFileSync(filePath.replace(/\.js$/, '.bytecode'), byteCode);
    } catch (e) {
        console.log('>>>>>>>>>>', e);
    }
}

compileFile(process.argv[2]);
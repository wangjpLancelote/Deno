const fs = require('fs');
const vm = require('vm');
const v8 = require('v8');

v8.setFlagsFromString('--no-flush-bytecode');
console.log('argv', process.argv);

const HeaderOffsetMap = {
    'magic': 0,
    'version_hash': 4,
    'source_hash': 8,
    'flag_hash': 12
}

let _flag_buf;

/** 获取flag hash 的header 信息 */
function getFlagBuf () {
    if (!_flag_buf) {
        const script = new vm.Script('');
        _flag_buf = getHeader(script.createCachedData(), 'flag_hash');
    }
    return _flag_buf;
}

/** 获取头部信息 */
function getHeader (buffer, type) {
    const offset = HeaderOffsetMap[type];
    return buffer.slice(offset, offset + 4);
}

function setHeader (buffer, type, vBuffer) {
    vBuffer.copy(buffer, HeaderOffsetMap[type]);
}

function buff2num (buf) {
    let ret = 0;
    ret |= buf[3] << 24;
    ret |= buf[2] << 16;
    ret |= buf[1] << 8;
    ret |= buf[0];
    return ret;
}

function loadBytecode (filePath) {
    const bytecode = fs.readFileSync(filePath, null);
    setHeader(bytecode, 'flag_hash', getFlagBuf());
    const sourceHash = buff2num(getHeader(bytecode, 'source_hash'));
    console.log('========>>>', sourceHash);
    const script = new vm.Script(' '.repeat(sourceHash), {
        filename: filePath,
        cachedData: bytecode,
        lineOffset: 0,
        displayErrors: true
    });

    if (script.cachedDataRejected) { // v8 对于传入的字节码存在校验机制，会导致cachedDataRejected.
        throw new Error('something is wrong');
    }

    return script;
}

if (process.mainModule.filename === __filename) {
    const script = loadBytecode(process.argv[2]);
    script.runInThisContext({
        filename: process.argv[2],
        displayErrors: true,
        lineOffset: 0,
        columnOffset: 0,
    });
}

module.exports.loadBytecode = loadBytecode;
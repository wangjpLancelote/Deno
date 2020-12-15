const { reject } = require("bluebird");

const readFile = (path, options, cb) => {
    cb = callback(cb || options);

    options = getOptions(options, { flag: 'r' });
}

const callback = cb => {
    if (typeof cb === 'function') {
        return cb;
    }
    throw new TypeError('Callback must be a function');
}

/**配置融合 */
const getOptions = (options, defaultOption = null) => {
    if (options === null || options === undefined ||  typeof options === 'function') {
        return defaultOption;
    }

    return Object.assign({}, defaultOption, options);
}
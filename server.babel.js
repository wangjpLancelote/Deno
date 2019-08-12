const babelConfig = require('./babel.config.js');

require('@babel/register')({
  ...babelConfig,
  ignore: [
    (path) => {
      return /node_modules/.test(path) && !(/node_modules\/ntt-node-/).test(path);
    }
  ]
});
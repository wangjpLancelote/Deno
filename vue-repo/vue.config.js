const PROD_STATEMENT = ["production", "prod"].includes(process.env.NODE_ENV);

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtension = ["js", "css"];
const resolve = dir => path.resolve(__dirname, dir);
const TerserPlugin = require("terser-webpack-plugin");

console.log("process.ENV", process.env);
let isWebComponent = false;
let isLib = false;
let isUglify = true;
if (process.env && process.env.TYPE === 'package') {
  isWebComponent = true;
}
if (process.env && process.env.TYPE === 'lib') {
  isLib = true;
}
if (process.env && process.env.uglify === 'no') { //不压缩
  isUglify = false;
}

module.exports = {
  publicPath: "./", //默认是'/' 部署应用包时文件读取的基本URL
  outputDir: isWebComponent || isLib ? "lib" : "dist", //打包输出的目录
  assetsDir: "", //相对于outputdir 的资源目录
  lintOnSave: false,
  runtimeCompiler: true, //是否使用包含运行时编译器的Vue构建版本
  productionSourceMap: false, //生产环境的sourceMap

  css: {
    /**组件内的css提取到一个单独的css文件 */
    // extract: true,
    extract: false,

    sourceMap: false,
    /**预处理的css loader传递自定义选项，例如使用`{sass: {...}}` */
    loaderOptions: {},
    //为所有的css及其预处理文件开启css modules
    // modules: false
    requireModuleExtension: true
  },
  /**生产环境下为 Babel和typeScript 使用thread-loader
   * 多核机器下默认开启
   */
  parallel: require("os").cpus().length > 1,
  pwa: {},
  // chainWebpack: config => {
  //   /**HMR */
  //   config.resolve.symlinks(true),
  //     /**lazy loading routes */
  //     config.plugin("html").tap(args => {
  //       if (args && args[0]) args[0].chunkSortMode = "none";
  //       return args;
  //     });

  //   config.resolve.alias
  //     .set("@", resolve("src"))
  //     .set("assets", resolve("src/assets"))
  //     .set("components", resolve("src/components"))
  //     .set("layout", resolve("src/layout"))
  //     .set("base", resolve("src/base"))
  //     .set("static", resolve("src/static"));
  // },

  configureWebpack: config => {
    config.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin()]
    };
    output = {
      libraryExport: "default"
    };
    if (PROD_STATEMENT) {
      const plugins = [];
      if (isUglify) {
        plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              /**压缩配置 */
              compress: {
                // warnings: true,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"] //移除console
              },
              mangle: false,
              output: {
                beautify: true //压缩注释
              }
            },
            sourceMap: false,
            parallel: true
          })
        );
      }
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtension,
          threshold: 10240,
          minRatio: 0.8
        })
      );

      config.plugins = [...config.plugins, ...plugins];
    }

    /**打包分析 */
    if (process.env.IS_ANALYZ) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
    }

    /**防止将某些import 的包打包到bundle中。而是在运行时(runtime)再去从外部获取这些扩展依赖 */
    // config.externals = {
    // 	vue: "vue",
    // 	"element-ui": "ELEMENT",
    // 	"vue-router": "VueRouter",
    // 	vuex: "vuex",
    // 	axios: "axios"
    // };
  },

  /**webpack 请求代理处理 */
  devServer: {
    open: PROD_STATEMENT,
    host: "0.0.0.0",
    port: "8081",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_API || "http://127.0.0.1:8081",
        /**接口跨域 换源 */
        changeOrigin: true,
        /**是否重写 路径
         * 例如原来是: http://127.0.0.1:8081/api/xxx
         * 重写后是 http://127.0.0.1:8081/xxx
         */
        pathRewrite: { "^/api": "" },
        /**接受运行在https上，且使用了无效证书的服务器 */
        secure: false,
        /**绕过代理的情况 例如返回一个文件的请求，则直接绕过代理*/
        bypass(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          }
        }
      }
    }
  }
};

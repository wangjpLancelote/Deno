/**electron 应用程序 打包 */
const electronBuilder = require('electron-builder');

const child_process = require('child_process');
const path = require('path');

child_process.execSync('rm -rf dist');
const version = child_process.execSync('git rev-list HEAD | wc -l').toString().trim(); //当前git提交版本


const baseVersion = require('./package.json').version;  //工程版本
const buildVersion = baseVersion + '.' + version; //构建版本号，正规的格式 *.*.*.*
const semverVersion = baseVersion + '-' + version; //构建版本号，语义化格式

electronBuilder.argv = 'x64';
const targetDist = path.resolve(__dirname, 'dist'); //代码打包之后会放在dist文件夹下
const baseOptions = {
    appId: 'benew.demo.demo',
    buildVersion: buildVersion,
    extraMetaData: {
        productVersion: buildVersion,
        author: {
            name: 'lancelote@wangjianping',
            email: 'wangjianping@163.com',
            url: 'www.baidu.com'
        },
        version: semverVersion
    },
    productName: 'MyProgram',
    copyright: 'Copyright (c) 2020. benew Electronics. All Rights Reserved',
    directories: {
        buildResources: path.resolve(__dirname, '.'),
        output: targetDist,
    },
    nsis: {
        oneClick: false,
        perMachine: true,
        allowElevation: false,
        allowToChangeInstallationDirectory: true,
        installerIcon: path.resolve(__dirname, './favicon.ico'), //icon图标
        uninstallerrIcon: path.resolve(__dirname, './favicon.ico'),
        installerHeaderIcon: path.resolve(__dirname, './favicon.ico'),
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: 'jiuguiyijia',
        artifactName: 'jiuguiyijia' + buildVersion + '.${ext}',
        uninstallDisplayName: 'jiuguiyijia',
        includes: path.resolve(__dirname, 'install.nsh'),
    },
    win: {
        icon: path.resolve(__dirname, './favicon.ico'),
        target: {
            target: 'nsis',
            arch: 'x64', //内核 64位
        },
        /**需要打包的文件列表 */
        file: ['!build.js'],
        extraResources: [path.resolve(__dirname, './favicon.ico')],
        publish: {
            provider: 'generic',
            channel: 'winLatest_' + buildVersion,
            url: 'www.baidu.com',
        },
        /**复制文件 */
        extraFiles: [
            {
                from: path.resolve(__dirname, './favicon.ico'),
                to: './favicon.ico'
            }
        ]
    }
};

electronBuilder.createTargets(['--win', '--darwin'], null, 'x64');
process.env.BUILD_NUMBER = version;
electronBuilder.build({
    config: baseOptions
})
/**
 * BrowserWindow和BrowserView的区别
 * BrowserView 被用来让BrowserWindow嵌入更多的web内容
 * BrowserView是webView的替代工具，能让BrowserWindow 在主进程中动态引入webview
 * ipcMain 主进程
 * ipcRenderer 渲染进程
 * shell 系统文件 | 命令的调用, 可对系统本地文件进行操作 但要借助fs模块
 */
const { app, BrowserWindow, BrowserView, ipcMain, ipcRenderer, shell } = require('electron');
const { create } = require('electron-log');

export function createWindow () {
    app.on('ready', () => {
        /**窗口规格 */
    let win = new BrowserWindow({
        width: 1000,
        height: 600
    });
    win.on('closed', () => {
        win = null
    })
    // if (!win.isDestroyed()) { //是否被销毁
    //     win.hide();
    // }
    win.loadURL('./index.html');

    win.show(); //显示并聚焦窗口
    // win.showInactive(); //显示不聚焦于窗口

    win.setParentWindow(parent);

    let iconPath = '/Users/wangjianping/Desktop/timg.jpeg';

    let appPath = app.getPath('appData');

    win.setAppDetails({
        appId: 'Benew.desktop.v1.0.0',
        appIconPath: iconPath,
        appIconIndex: 0,
        relaunchDisplayName: '本牛科技',
        relaunchCommand: '"'+appPath+'"', //窗口任务栏图标右键菜单中固定到任务栏功能启用后点击图标执行的地址
    })

    app.on('window-all-closed', () => { //Mac OSX 应用会一直激活到用户通过CMD+Q 显式的退出。
        if (process.platform !== 'darwin') {
            app.quit();
        }
    })

    app.on('activate', () => { //Mac OSX
        if (win === null) {
            createWindow();
        }
    })

    ipcMain.on('asychronous-message', (event, arg) => {
        console.log('mian1', arg);
        event.sender.send('asynchronous-reply', 'ipcMainData')
    })
    /**关闭窗口 */
    ipcMain.on('close-main-window', () => {
        app.quit();
    })

    /**chromium 命令
     * http://shaozhuqing.com/?p=5326 查看所有的命令详情
     * 触摸屏点击
     * 范围扩大的问题
     */
    app.commandLine.appendSwitch('disable-touch-adjustment', true);

    /**自动播放限制的问题 */
    app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

    /**禁用双指缩放的问题 */
    app.commandLine.appendSwitch('disable-pinch', true);

    /**关闭网络代理 */
    app.commandLine.appendSwitch('no-proxy-server', true);

    /**关闭浏览器的证书拦截 */
    app.commandLine.appendSwitch('ignore-certificate-errors', true);

    })
};
createWindow();






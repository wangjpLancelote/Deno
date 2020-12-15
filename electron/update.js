/** 推送更新 */
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const { app, ipcMain } = require('electron');
const {  } = require('./WindowController');

/**日志打印 */
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

/**自动下载更新 */
autoUpdater.autoDownload = false;
/**允许版本降级 */
autoUpdater.allowDowngrade = true;

/** 服务器最新版本的接口查询 */
autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'https://benewtech.cn/autoUpdate/',
    channel: 'myProgram'
});

let NEED_INSTALL = false;
/** 比对版本 是否需要拉起版本更新 */
const checkUpdate = () => {
    autoUpdater.checkForUpdatesAndNotify().then((updateCheckResult) => {
        log.info(updateCheckResult, autoUpdater.currentVersion.version);
        if (updateCheckResult && updateCheckResult.updateInfo.version !== autoUpdater.currentVersion.version) {
            /**调起更新窗口 */
        }
    })
}

/**触发下载 */
const startDownLoad = (callback, downloadSuccessCallback) => {
    autoUpdater.on('download-progress', (data) => {
        callback && callback instanceof Function && callback(null, data);
    });
    autoUpdater.on('error', (err) => {
        callback && callback instanceof Function && callback(err);
    });
    autoUpdater.on('update-downloaded', () => {
        NEED_INSTALL = true;
        downloadSuccessCallback && downloadSuccessCallback instanceof Function && downloadSuccessCallback();
    });
    autoUpdater.downloadUpdate();
}

//监听窗口发送的进程消息，开始下载更新
ipcMain.on('startDownload', (event) => {
    startDownLoad(
        (err, progressInfo) => {
            if (err) {
                event.sender.send('update-error');
            } else {
                event.sender.send('update-progress', progressInfo.percent); //下载进度
            }
        },
        /**回推下载完成消息 */
        () => {
            event.sender.send('update-downed');
        }
    )
});

/**监听用户点击更新窗口立即更新按钮进程消息 */
ipcMain('quitAndInstall', () => {
    NEED_INSTALL = false;
    autoUpdater.quitAndInstall(true, true);
});

/**用户点击稍后安装后程序退出时执行立即安装更新 */
app.on('will-quit', () => {
    if (NEED_INSTALL) {
        autoUpdater.quitAndInstall(true, true);
    }
})
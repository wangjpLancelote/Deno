class WindowController {
    constructor (config) {
        this.windowInstances = {};
        this.config = config;

    }

    init () {

    }

    createWindow (name) {
        let window = new BrowserWindow(this.config[name]); //窗口实例

        /**保存实例 */
        this.windowInstances[name] = window;

        window.on('closed', (_name) => {
            return () => {
                delete this.windowInstances[_name];
            }
        })(name);

        /**监听窗口崩溃 */
        window.webContents.on('crashed', (_name) => {
            return () => {
                this.windowInstances[_name].close();
                this.createWindow(_name);
            }
        })(name)
    }

    /**获取窗口实例 */
    getWindow(name) {
        return this.windowInstances[name];
    }
}
/**弹框 插件，
 * 1. 配置项传入 请求【URL】, 列表参数，表头参数
 */

class PluginDialog {
    constructor (config) {
        this.instance = null, //保存的实例，避免多次实例化该对象

        this.config = config;

        this.options = {
            //按钮组
			buttons: null,
			//皮肤
			skin: 1,
			//图标类型  "ok", "loding",  "bubble",  "warning"
			icon: null,
			//多少秒关闭
			delay: null,
			//描述标题
			title: null,
			//描述文字
			content: null,
			//消息提示
			msg: null,
			//自定义content样式
			style: null,
			//表单属性
			inputAttr: null,
			//尺寸
            width: '40%',
            height: '600px',
			//对话框遮罩层透明度
			maskOpacity: null,
			//点击遮罩关闭弹窗
			maskClose: false,
			//动画
			animate: null,
            delayCallback: null,

            /**请求URL */
            requestUrl: null,

            /**列表Title */
            title: '',

            /**列表label */
            label: '',
        };
        this.zIndex = 2001; //高度
        /**请求的数据list */
        this.list = [];
        /**数据量count */
        this.count = 0;
        /**遮罩层dom */
        this.mask = null; //遮罩层

        this.body = null;

        this.pickData = [1,2] //已选取的选项

        this.axios = axios;
    }
    /**初始化dialog */
    init () {
        /**存在实例，直接返回已创建的实例 */
        if (this.instance) {
            return this.instance;
        }
        this.body = document.body;
        if (this.config && this.config.width) {
            this.options.width = this.config.width;
        }

        /**生成遮罩层，弹窗DOM */
        this.mask = this.createElement('div', { 'class': 'index_maskContainer yk1-dialog-container' });
        this.win = this.createElement('div', { 'class': 'dialog-window index_winbox' });

        this.generateFooter();
        this.generateContent();

        this.closeDOM = this.createElement('i', { 'class': 'close el-dialog__close el-icon el-icon-close cursor_cha' });
        this.titleDOM = this.createTextNode('xxx列表');
        this.winHeader = this.createElement('div', { 'class': 'flex flex_space index_header' });

        this.winContent = this.createElement('div', { 'class': 'dialog-content' });

        /**设置z-index */
        this.mask.style['z-index'] = this.zIndex;

        this.closeDOM.addEventListener('click', (e) => {
            this.close();
        })

        this.instance = this;

        return this;
    }
    /**生成底部按钮 */
    generateFooter () {
        this.winFooter_cancel = this.createElement('button', { 'class' : 'el-button el-button--default el-button--mini' });
        this.winFooter_cancel.innerHTML = "取消"
        this.winFooter_ensure = this.createElement('button', { 'class': 'el-button el-button--primary el-button--mini', 'id': 'addBtn' });
        this.winFooter_ensure.innerHTML = "确定"
        this.winFooter_box = this.createElement('div', {'class': 'flex'});

        this.winFooter_box.appendChild(this.winFooter_cancel)
        this.winFooter_box.appendChild(this.winFooter_ensure);

        this.winFooter = this.createElement('div', {  'class': 'index_footer flex flex_end box_end' });
        this.winFooter.appendChild(this.winFooter_box);

        this.winFooter_cancel.addEventListener('click', (e) => {
            this.close();
        })
        // this.winFooter_ensure.addEventListener('click', (e) => {
        //     this.close((res) => {
        //         console.log('=====>>>data', res)
        //     });
        // })
    }
    /**生成内容区 */
    generateContent () {
        this.tableBoxDOM = this.createElement('div', { 'class': 'el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition' })
        this.tableBoxDOM.style.width = "100%";
        this.tableBoxDOM.style.maxHeight = '400px';

        this.tableWraper_box = this.createElement('div', { 'class': 'el-table__header-wrapper' })

        let tHeadTemplate = `
        <thead>
            <tr></tr>
            <th class = 'el-table_8_column_29 is-hidden is-leaf'>
                <div class='cell'>${this.options.label}</div>
            </th>
        </thead>`

        this.tableBoxDOM.innerHTML = tHeadTemplate;
    }

    animate () {
        let _this = this;
        _this.win.style['-webkit-transform'] = 'scale(0,0)';
        setTimeout(() => {
            _this.win.style['-webkit-transform'] = 'scale(1,1)';
        }, 100)
    }

    /**打开dialog */
    open (pick) {
        this,this.pickData = pick;
        /**弹层 */
        this.win.style.width = this.options.width;
        this.win.style.height = this.options.height;
        this.win.style.backgroundColor = '#FFF';

        this.winHeader.appendChild(this.closeDOM);
        this.winHeader.appendChild(this.titleDOM);

        this.win.appendChild(this.winHeader);
        this.win.appendChild(this.tableBoxDOM);
        this.win.appendChild(this.winFooter);

        this.mask.appendChild(this.win);
        this.body.appendChild(this.mask);
        this.animate();

    }
    /**关闭dialog */
    close (cb) {
        if (cb) {
            cb(this.pickData); //返回选取数据, 需点击确定按钮回调获得
        }
        this.list = [];
        this.pickData = [];
        this.count = 0;
        let mask = document.querySelector('div[class$="-dialog-container"]')
        if (!mask) return;

        document.body.removeChild(mask);
        this.instance = null; //实例重置
    }

    /**搜索关键字 */
    search () {

    }

    /**创建Element
     * @param {Element} el
     * @param { Object } attr
     * @param { Object } style
     * @param { String } text
     */
    createElement (el, attr, style, text) {
        let dom = document.createElement(el);
        /**dom结构属性 */
        if (attr) {
            for (let i in attr) {
                if (i === 'class') {
                    dom.className = attr[i];
                }
                if (i === 'id') {
                    dom.id = attr[i];
                } else {
                    dom.setAttribute(i, attr[i])
                }
            }
        }

        /**设置样式 */
        if (style) {
            for (let s in style) {
                dom.style = style[s];
            }
        }
        /**文字 */
        if (text) {
            dom.append(document.createTextNode(text));
        }
        return dom;
    }

    /**创建文本类型的HTML结构 */
    createTextNode (str) {
        let dom = document.createElement('div', { 'class': 'index_text' });
        dom.appendChild(document.createTextNode(str));
        return dom;
    }

    /**深拷贝 */
    extend (obj, opt = {}) {
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            if (typeof obj[key] === 'object') {
                this.extend(obj[key]);
            } else {
                opt[key] = obj[key]
            }
        }
        return opt;
    }
}
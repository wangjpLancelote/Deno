

/** 生成明水印基础方法 通过旋转，透明度，定位等对页面操作 */
function genarateWatermarkBase () {
    function classHelper (el, prototype) {
        for (let i in prototype) {
            el.style[i] = prototype[i];
        }
    }

    function createItem () {
        const item = document.createElement('div');
        item.innerHTML = '水印';
        classHelper(item, {
            position: 'absolute',
            top: `50px`,
            left: `50px`,
            fontSize: `16px`,
            color: '#000',
            lineHeight: 1.5,
            opacity: 0.3,
            transform: `rotate(-15deg)`,
            transformOrigin: '0 0',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        })
        return item;
    }

    const waterHeight = 100;
    const waterWidth = 180;
    const { clientWidth, clientHeight } = document.documentElement || document.body;
    const column = Math.ceil(clientWidth / waterWidth);
    const rows = Math.ceil(clientHeight / waterHeight);
    const waterWrapper = document.createElement('div');
    classHelper(waterWrapper, Object.assign({
        display: "flex", 
        position: "absolute", 
        left: 0, 
        top: 0, 
        height: `${clientHeight}px`, 
        flexWrap: "wrap", 
        overflow: "hidden" 
    }))
    for (let i = 0; i < column * rows; ++i) {
        const wrap = document.createElement('div');
        classHelper(wrap, Object.create({
            position: 'relative',
            width: `${waterWidth}px`,
            height: `${waterHeight}px`,
            flex: `0 0 ${waterWidth}px`,
            overflow: 'hidden',
        }));
        wrap.appendChild(createItem());
        waterWrapper.appendChild(wrap);
    }
    document.body.appendChild(waterWrapper);
}

// genarateWatermarkBase();

/** 利用canvas 生成明水印背景图
 *  先生成一整张截图，然后转化为dataUrl 替换成对应区域的背景图
 */
 function generateWatermarkByCanvas () {
    function createWatermarkByCanvas () {
        const angle = -20;
        const txt = 'CANVAS水印';
        const canvas = document.createElement('canvas');
        canvas.width = 180;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 180, 100);
        ctx.fillStyle = '#000';
        ctx.globalAlpha = 0.3;
        ctx.font = '16px serif';
        ctx.rotate(Math.PI / 180 * angle);
        ctx.fillText(txt, 0, 50);
        return canvas.toDataURL(); //返回dataUrl
    }
    const waterMark = document.createElement('div');
    waterMark.className = 'watermark';
    waterMark.style.backgroundImage = `url(${createWatermarkByCanvas()})`; //生成的DataUrl 地址
    document.body.appendChild(waterMark);
 }

generateWatermarkByCanvas();



/** 通过SVG 生成明水印 原理也是生成图片地址 替换图片背景 */
function generateWatermarkBySVG () {
    function createrWaterBySVG () {
        const svgStr = `
        <svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
            <text x="0px" y="30px" dy="16px"
            text-anchor="start"
            stroke="#000"
            stroke-opacity="0.3"
            fill="none"
            transform="rotate(-20)"
            font-weight="100"
            font-size="16"
            font-family="serif"
            >
                SVG水印
            </text>
        </svg>
        `
        return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`; //svg 格式的图片URL
    }
    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.style.backgroundImage = `url(${createrWaterBySVG()})`;
    document.body.appendChild(watermark);
}

/** 观察器的配置
 *  对水印破解的防守
 */
const config = { attribute: true, childList: true, subtree: true };

/** 观察变动的回调函数 */
const callback = function (mutationList, observer) {
    for (let mutation of mutationList) {
        mutation.removeNodes.forEach(item => {
            if (item === watermark) { // 若被移除，则加上
                document.body.appendChild(watermark);
            }
        })
    }
}
const targetNode = document.body;
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

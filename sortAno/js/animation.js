function SortAnimation() {
	this.timer = 0;
	this.arrDomBox = {};
	this.animationArr = [];
	this.speed = 500;
	this.sortMethod = {};
	this.currentMethod = '';
	// sortMethod 的数据结构为{method：数组排序并返回动画数组的方法名, animationMethod: dom排序方法名}
}

SortAnimation.prototype = {
	getData: function(arrDomBox, method) {
		this.arrDomBox = arrDomBox;
		this.currentMethod = method;
		this.animationArr = this.sortMethod[method].method(arrDomBox.children);
	},

	ownedMethod: function(methodObj) {
		this.sortMethod = methodObj;
	},

	startAnimation: function() {
		var that = this;
		// 为了保存下methodName,this，用了闭包，当然还有别的处理办法。
		return function() {
			if (that.animationArr.length === 0) {
				// 清除DOM样式
				for (let i = 0, len = that.arrDomBox.children.length; i < len; i++) {
					that.arrDomBox.children[i].classList.remove(
						'item--target',
						'item--current',
						'item--selected',
						'item--checked'
					);
				}
				// 动画结束
				clearTimeout(that.timer);
			} else if (that.animationArr[0].length > 0) {
				that.sortMethod[that.currentMethod].animationMethod(
					that.arrDomBox,
					that.animationArr[0][0]
				);
				that.animationArr[0].shift();
			} else {
				// 清除DOM样式
				for (let i = 0, len = that.arrDomBox.children.length; i < len; i++) {
					that.arrDomBox.children[i].classList.remove(
						'item--target',
						'item--current',
						'item--selected',
						'item--checked'
					);
				}
				// 进入下一趟排序的动画
				that.animationArr.shift();
			}
		};
	}
};

window.sa = new SortAnimation();

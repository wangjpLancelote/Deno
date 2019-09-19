/**
 * observable 类
 * 可观察对象
 */

class Observable {
	/**仅支持subscribe作为唯一参数，每个Observable实例都存储subscribe对象
	 * subscribe 订阅参数，本质上是一个函数，函数参数是observer[观察者]对象,
	 * 观察者一定含有一个next方法和complete方法,由[观察者]对象去调用这些方法
	 */
	constructor(subscribe) {
		this.subscribe = subscribe;
	}

	/**fromEvent方法
	 * 类似与RX.js的fromEvent
	 * 传入两个参数 element(dom节点) name(该节点标签名字)
	 * RX.js的此方法支持链式调用Observable的fangfa，意味着这个方法要返回一个Observable实例
	 * element 设置事件监听器,监听name标签的事件
	 */
	static fromEvent(element, name) {
		return new Observable(observer => {
			element.addEventListener(name, event => {}, false);
		});
	}
}

/**一个Observable实例 */
let t = new Observable(observer => {
	observer.next(1);
	observer.complete();
});

/**传入的subscribe是一个函数，所以要使用执行方法的方法调用 该函数参数是一个[观察者][observer]对象 且要带有两个函数key*/
t.subscribe({
	next: value => console.log('val: %d', value),
	complete: () => {}
});

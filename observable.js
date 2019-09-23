/**
 * observable 类
 * 可观察对象
 * 被观察者	Observable
 * 观察者 observer
 * 被观察者与观察者之间通过 [subscribe] 订阅函数进行关联
 */

class Observable {
	/**仅支持subscribe作为唯一参数，每个Observable实例都存储subscribe对象
	 * subscribe 订阅参数，本质上是一个函数，函数参数是observer[观察者]对象,
	 * 观察者一定含有一个next方法和complete方法,由[观察者]对象去调用这些方法
	 * subscribe 是对observer内一系列方法的调用
	 * 观察者[observer] 只是一个有三个回调函数的对象，没有回调函数对应一种Observable发送的通知类型 next | error | complete
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
			const callBack = event => observer.next(event);
			element.addEventListener(name, callBack, false);
			return () => element.removeEventListener(name, callBack, false);
		});
	}
}

/**
 * test
 * 一个Observable实例 */
let t = new Observable(observer => {
	observer.next(1);
	observer.complete();
});

/**传入的subscribe是一个函数，所以要使用执行方法的方式调用 该函数参数是一个[观察者][observer]对象 且要带有两个函数key*/
t.subscribe({
	next: value => console.log('val: %d', value),
	complete: () => {}
});

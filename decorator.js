class Math {
	constructor() {}
	@log
	add(a, b) {
		return a + b;
	}
}

function log(target, name, descriptor) {
	/** descriptor.value 其实就是被修饰的函数 add (a, b){return a + b}
	 * 这里先存储一个函数，用于后续调用
	 */
	const oldValue = descriptor.value;

	descriptor.value = function() {
		console.log(`calling ${name} with ${JSON.stringify(arguments)} ${Date.now()}`);
		return oldValue.apply(this, arguments);
	};

	return descriptor;
}

const math = new Math();
math.add(1, 2);

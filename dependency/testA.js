class Test {
	get() {
		console.log('88');
	}
	Date(n) {
		return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][n % 7 || 0];
	}
}

let t = new Test();
exports.t = t;

const base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const _ = require('lodash');
let charts = {
	0: '⬆️',
	1: '⬆️⬆️'
};

let test = _.shuffle(base);
console.log('test', test);

/**冒泡排序
 * 比较相邻的两个元素，若前一个元素比后一个元素大，则交换位置，每一轮结束后，最后一个元素都是当前轮最大的一个，因此每轮都可以跳过最后一个元素，
 * 最坏时间复杂度: O(n^2)
 * 最好时间复杂度: O(n)
 */
const bubbleSort = target => {
	let cnt = 0;
	for (let i = 0; i < target.length; ++i) {
		for (let j = 0; j < target.length - i; ++j) {
			// console.log(`================>>>第${i + 1}轮`);
			// console.log(`================>>第${j + 1}次比较, ${target[j]}, ${target[j + 1]}`);
			cnt += 1;
			if (j === target.length - 1) continue;
			if (target[j] > target[j + 1]) {
				[target[j], target[j + 1]] = [target[j + 1], target[j]];
			}
		}
	}
	// console.log('实际执行次数:', cnt);
	return target;
};

/**记录外层循环位置,可跳过无谓循环 */
const exchangeBubbleSort = target => {
	let l = target.length;
	let cnt = 0;
	while (l > 0) {
		let position = 0;
		for (let n = 0; n < l; ++n) {
			cnt += 1;
			if (n === target.length - 1) continue;
			if (target[n] > target[n + 1]) {
				[target[n], target[n + 1]] = [target[n + 1], target[n]];
				position = n;
			}
		}
		l = position;
	}
	// console.log('实际执行次数:', cnt);
	return target;
};

/**双边冒泡
 * 效率比普通高。比位置记录低
 */
const doubleSideBubbleSort = target => {
	let top = target.length - 1,
		bottom = 0,
		cnt = 0,
		j;
	while (bottom < top) {
		for (j = bottom; j < top; ++j) {
			cnt += 1;
			if (target[j] > target[j + 1]) {
				[target[j], target[j + 1]] = [target[j + 1], target[j]];
			}
		}
		top--;
		//倒序
		for (; j > bottom; --j) {
			cnt += 1;
			/**前一个比后一个大 */
			if (target[j] < target[j - 1]) {
				[target[j], target[j - 1]] = [target[j - 1], target[j]];
			}
		}
		bottom++;
	}
	// console.log('实际执行次数:', cnt);
	return target;
};

// let r1 = bubbleSort(test);
// let r2 = exchangeBubbleSort(test);
// let r3 = doubleSideBubbleSort(test);
// console.log('r1: %j, r2: %j, r3: %j', r1, r2, r3);

/**
 * 快速排序 --->>分治法的典型应用
 * 普通写法需要开辟新的内存空间,分区排序则不需要
 * 本质上都是递归实现
 * 定义左指针和右指针，左指针寻找比基准大的元素（放基准右边）右指针寻找比基准小的元素（放基准左边）
 * 移动左右指针，若左右指针相遇，将第一个元素和该指针元素交换，若左指针小于右指针，交换两个元素,第一轮找到之后，结束，递归进入下一轮
 * 最坏时间复杂度 O(n^2)
 * 最好时间复杂度 O(nlogn)
 */
const quickSort = target => {
	function swap(arr, a, b) {
		[arr[a], arr[b]] = [arr[b], arr[a]];
	}

	function partition(arr, left, right) {
		/**选择最右边的元素作为基准 */
		let pivot = arr[right];

		let storeIndex = left;
		for (let i = left; i < right; ++i) {
			if (arr[i] < pivot) {
				//小于基准的数,放到左边,并对之前已经放到左边排序的数交换,storeIndex加1，进入下一次循环,这里会跳过比基准更大的数
				swap(arr, storeIndex, i);
				storeIndex++;
			}
		}
		swap(arr, right, storeIndex);
		return storeIndex;
	}

	function sort(arr, left, right) {
		if (left > right) return;
		let storeIndex = partition(arr, left, right);
		sort(arr, left, storeIndex - 1);
		sort(arr, storeIndex + 1, right);
	}

	sort(target, 0, target.length - 1);
	return target;
};

// let r = quickSort(test);
// console.log('r', r);

/**选择排序
 * 确定第一个基准下标，从0开始，遍历数组，找到该轮最小的元素，将基准下标元素改成该最小元素，每次遍历时都会从基准下标 + 1开始
 * 时间复杂度恒定 O(n^2)
 * 稳定性很强
 */
const selectSort = target => {
	let len = target.length,
		miniIndex;
	for (let i = 0; i < len - 1; ++i) {
		miniIndex = i;
		for (let j = i + 1; j < len; ++j) {
			if (target[j] < target[miniIndex]) {
				miniIndex = j;
			}
		}
		[target[i], target[miniIndex]] = [target[miniIndex], target[i]];
	}
	return target;
};
// let r = selectSort(test);
// console.log('r', r);

/**插入排序 */
const insertionSort = target => {
	let len = target.length;
	let current, preIndex;
	for (let i = 0; i < len; ++i) {}
};
